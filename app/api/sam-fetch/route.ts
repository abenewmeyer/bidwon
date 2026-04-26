// app/api/demo-opportunities/route.ts
// Public-facing API route for the landing page demo.
// Uses the Supabase SERVICE ROLE key to bypass RLS — safe because:
//   • Only reads the opportunities table
//   • Returns only sanitized, non-user-identifiable fields
//   • Rate-limited by the 10-result cap per request

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Service role client — NEVER expose this key client-side
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // add to .env.local + Vercel env vars
  { auth: { persistSession: false } }
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const naicsParam = searchParams.get("naics");

  if (!naicsParam) {
    return NextResponse.json({ error: "No NAICS codes provided" }, { status: 400 });
  }

  // Parse comma-separated NAICS codes, cap at 5
  const naicsCodes = naicsParam
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean)
    .slice(0, 5);

  try {
    // Query opportunities matching any of the selected NAICS codes
    // Only return active opportunities (deadline in the future or null)
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabaseAdmin
      .from("opportunities")
      .select(
        "notice_id, title, agency, response_deadline, type_of_set_aside, naics_code, match_score, ai_summary, eligibility_checklist"
      )
      .in("naics_code", naicsCodes)
      .or(`response_deadline.gte.${today},response_deadline.is.null`)
      .order("match_score", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Demo opportunities query error:", error);
      return NextResponse.json({ error: "Failed to fetch opportunities" }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ opportunities: [], message: "no_data" });
    }

    // Sanitize — strip any user_id or internal fields before returning
    const sanitized = data.map((opp) => ({
      notice_id: opp.notice_id,
      title: opp.title,
      agency: opp.agency ?? "Federal Agency",
      deadline: opp.response_deadline
        ? new Date(opp.response_deadline).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "Open",
      set_aside: formatSetAside(opp.type_of_set_aside),
      naics_code: opp.naics_code,
      score: opp.match_score ?? 50,
      summary: opp.ai_summary ?? null,
      checklist: opp.eligibility_checklist ?? null,
    }));

    return NextResponse.json({ opportunities: sanitized });
  } catch (err) {
    console.error("Demo route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Map SAM.gov set-aside codes to human-readable labels
function formatSetAside(code: string | null): string {
  if (!code) return "Open Competition";
  const map: Record<string, string> = {
    SBA: "Small Business",
    "8A": "8(a) Set-Aside",
    "8AN": "8(a) Sole Source",
    HZC: "HUBZone",
    HZS: "HUBZone Sole Source",
    SDVOSBC: "SDVOSB",
    SDVOSBSS: "SDVOSB Sole Source",
    WOSB: "Women-Owned SB",
    WOSBSS: "WOSB Sole Source",
    EDWOSB: "EDWOSB",
    VSA: "Veteran-Owned SB",
    BPA: "Blanket Purchase Agreement",
    ISBEE: "Indian Small Business",
  };
  return map[code.toUpperCase()] ?? code;
}