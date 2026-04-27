// app/api/sam-fetch/route.ts
// Fetches opportunities from SAM.gov for ALL of a user's NAICS codes,
// scores each one, and upserts into the `opportunities` table.
//
// MANUAL TRIGGER (one-time seed):
//   From your browser while logged in to the dashboard, call:
//   GET /api/sam-fetch
//   with the Authorization: Bearer <your-supabase-session-token> header.
//
//   Or trigger from the dashboard page with a "Sync Now" button that passes
//   the session token from supabase.auth.getSession().

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SAM_BASE = "https://api.sam.gov/opportunities/v2/search";

// Service role bypasses RLS for server-side upserts
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

// ─── Auth ─────────────────────────────────────────────────────────────────────
async function getAuthenticatedUser(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  return user ?? null;
}

// ─── Scoring ──────────────────────────────────────────────────────────────────
function scoreOpportunity(
  opp: Record<string, any>,
  profile: {
    naics_codes: string[];
    set_asides: string[];
    keywords: string[];
    psc_codes: string[];
  }
): number {
  let score = 0;

  // NAICS match (0–40 pts)
  const oppNaics = opp.naicsCode ?? "";
  if (profile.naics_codes.includes(oppNaics)) {
    score += 40;
  } else if (profile.naics_codes.some((n) => oppNaics.startsWith(n.slice(0, 4)))) {
    score += 20;
  }

  // Set-aside match (0–30 pts)
  const oppSetAside = (opp.typeOfSetAside ?? "").toUpperCase();
  if (profile.set_asides.some((s) => s.toUpperCase() === oppSetAside)) {
    score += 30;
  } else if (oppSetAside === "" || oppSetAside === "NONE") {
    score += 10; // unrestricted — still eligible
  }

  // Keyword match in title (0–20 pts)
  if (profile.keywords?.length) {
    const titleLower = (opp.title ?? "").toLowerCase();
    const hits = profile.keywords.filter((kw) =>
      titleLower.includes(kw.toLowerCase())
    ).length;
    score += Math.min(20, hits * 7);
  }

  // PSC code match (0–10 pts)
  if (profile.psc_codes?.length) {
    const oppPsc = opp.productOrServiceCode ?? "";
    if (profile.psc_codes.includes(oppPsc)) score += 10;
  }

  // Deadline proximity — penalise very tight windows
  const deadline = opp.responseDeadLine ? new Date(opp.responseDeadLine) : null;
  if (deadline) {
    const daysUntil = (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    if (daysUntil < 0) return 0; // already closed — skip
    if (daysUntil < 7) score -= 10;
    else if (daysUntil < 14) score -= 5;
  }

  return Math.max(0, Math.min(100, score));
}

// ─── SAM.gov fetch ────────────────────────────────────────────────────────────
async function fetchSamOpportunities(
  naicsCode: string,
  setAside: string | null,
  keywords: string[]
): Promise<any[]> {
  // Fetch last 30 days so the initial seed gets enough data
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 30);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

  const params = new URLSearchParams({
    api_key: process.env.SAM_API_KEY!,
    postedFrom: formatDate(fromDate),
    postedTo: formatDate(new Date()),
    ptype: "o,k",
    ncode: naicsCode,
    limit: "100",
    offset: "0",
  });

  if (setAside) params.append("typeOfSetAside", setAside);
  if (keywords?.length) params.append("title", keywords.slice(0, 3).join(" OR "));

  const res = await fetch(`${SAM_BASE}?${params}`);
  if (!res.ok) {
    console.error(`SAM.gov fetch failed for NAICS ${naicsCode}:`, res.status, await res.text());
    return [];
  }

  const data = await res.json();
  return data.opportunitiesData ?? [];
}

// ─── Route ────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  if (!user) return new Response("Unauthorized — pass Bearer token in Authorization header", { status: 401 });

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("company_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (profileError || !profile) {
  return NextResponse.json({ error: "No company profile found. Please complete onboarding first." }, { status: 400 });
}

  const naicsCodes: string[] = profile.naics_codes ?? [];
  const setAsides: string[] = profile.set_asides ?? [];
  const keywords: string[] = profile.keywords ?? [];
  const pscCodes: string[] = profile.psc_codes ?? [];

  if (naicsCodes.length === 0) {
    return NextResponse.json({ error: "No NAICS codes on profile — add them in your dashboard first" }, { status: 400 });
  }

  let totalFetched = 0;
  let totalUpserted = 0;
  const errors: string[] = [];

  for (const naicsCode of naicsCodes) {
    // Always fetch unrestricted + each set-aside variant
    const setAsideVariants: (string | null)[] = [null, ...setAsides];

    for (const setAside of setAsideVariants) {
      try {
        const opps = await fetchSamOpportunities(naicsCode, setAside, keywords);
        totalFetched += opps.length;

        for (const opp of opps) {
          const score = scoreOpportunity(opp, {
            naics_codes: naicsCodes,
            set_asides: setAsides,
            keywords,
            psc_codes: pscCodes,
          });

          if (score === 0) continue; // closed or no match — skip

          const { error: upsertError } = await supabaseAdmin
            .from("opportunities")
            .upsert(
              {
                notice_id: opp.noticeId,
                title: opp.title,
                agency: opp.fullParentPathName ?? opp.organizationName ?? "Federal Agency",
                posted_date: opp.postedDate,
                response_deadline: opp.responseDeadLine,
                type_of_set_aside: opp.typeOfSetAside,
                naics_code: opp.naicsCode,
                match_score: score,
                raw_json: opp,
                user_id: user.id,
                status: "new",
              },
              { onConflict: "notice_id" }
            );

          if (upsertError) {
            errors.push(`${opp.noticeId}: ${upsertError.message}`);
          } else {
            totalUpserted++;
          }
        }
      } catch (err) {
        errors.push(`NAICS ${naicsCode} / set-aside ${setAside}: ${String(err)}`);
      }
    }
  }

  return NextResponse.json({
    success: true,
    fetched: totalFetched,
    upserted: totalUpserted,
    naics_scanned: naicsCodes,
    errors: errors.length > 0 ? errors : undefined,
    message: `Sync complete — ${totalUpserted} opportunities across ${naicsCodes.length} NAICS codes`,
  });
}