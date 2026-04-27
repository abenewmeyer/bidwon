import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

async function getAuthenticatedUser(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  return user ?? null;
}

function scoreOpportunity(opp: any, profile: any): number {
  let score = 0;

  // NAICS match
  const oppNaics = opp.naics_code ?? "";
  if (profile.naics_codes.includes(oppNaics)) {
    score += 40;
  } else if (profile.naics_codes.some((n: string) => oppNaics.startsWith(n.slice(0, 4)))) {
    score += 20;
  }

  // Set-aside (Not in sam_opportunities schema, applying default unrestricted 10pts)
  score += 10;

  // Keyword match in title & description
  if (profile.keywords?.length) {
    const textLower = `${opp.title ?? ""} ${opp.description ?? ""}`.toLowerCase();
    const hits = profile.keywords.filter((kw: string) => textLower.includes(kw.toLowerCase())).length;
    score += Math.min(20, hits * 7);
  }

  // Deadline proximity
  const deadline = opp.close_date ? new Date(opp.close_date) : null;
  if (deadline) {
    const daysUntil = (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    if (daysUntil < 0) return 0;
    if (daysUntil < 7) score -= 10;
    else if (daysUntil < 14) score -= 5;
  }

  return Math.max(0, Math.min(100, score));
}

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { data: profile } = await supabaseAdmin
    .from("company_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!profile || !profile.naics_codes || profile.naics_codes.length === 0) {
    return NextResponse.json({ error: "Profile missing or lacks NAICS" }, { status: 400 });
  }

  // Fetch from LOCAL table instead of SAM.gov API
  const { data: rawOpps, error: fetchError } = await supabaseAdmin
    .from("sam_opportunities")
    .select("*")
    .in("naics_code", profile.naics_codes);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!rawOpps || rawOpps.length === 0) {
    return NextResponse.json({ success: true, fetched: 0, upserted: 0, message: "No matching NAICS in local sam_opportunities." });
  }

  let totalUpserted = 0;
  const errors: string[] = [];

  for (const opp of rawOpps) {
    const score = scoreOpportunity(opp, profile);
    if (score === 0) continue;

    const { error: upsertError } = await supabaseAdmin
      .from("opportunities")
      .upsert({
        notice_id: opp.notice_id,
        title: opp.title,
        agency: opp.department,
        posted_date: opp.posted_date,
        response_deadline: opp.close_date,
        naics_code: opp.naics_code,
        match_score: score,
        raw_json: opp,
        user_id: user.id,
        status: "new",
      }, { onConflict: "notice_id" });

    if (upsertError) errors.push(`${opp.notice_id}: ${upsertError.message}`);
    else totalUpserted++;
  }

  return NextResponse.json({
    success: true,
    fetched: rawOpps.length,
    upserted: totalUpserted,
    errors: errors.length > 0 ? errors : undefined,
    message: `Sync complete — ${totalUpserted} opportunities upserted.`
  });
}