import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

const SAM_BASE = "https://api.sam.gov/opportunities/v2/search";

export async function GET(req: NextRequest) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { data: profile } = await supabase
    .from("company_profiles").select("*").eq("user_id", user.id).single();
  if (!profile) return new Response("No profile", { status: 400 });

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const from = yesterday.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
  const to = new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });

  const params = new URLSearchParams({
    api_key: process.env.SAM_API_KEY || "",
    postedFrom: from,
    postedTo: to,
    ptype: "o,k",
    typeOfSetAside: profile.set_asides[0] || "SDVOSBC",
    ncode: profile.naics_codes[0] || "624230",
    limit: "100",
    offset: "0",
  });

  if (profile.keywords?.length) params.append("title", profile.keywords.join(" OR "));

  const res = await fetch(`${SAM_BASE}?${params}`);
  const data = await res.json();

  for (const opp of data.opportunitiesData || []) {
    await supabase.from("opportunities").upsert({
      notice_id: opp.noticeId,
      title: opp.title,
      agency: opp.fullParentPathName,
      posted_date: opp.postedDate,
      response_deadline: opp.responseDeadLine,
      type_of_set_aside: opp.typeOfSetAside,
      naics_code: opp.naicsCode,
      match_score: 50,
      raw_json: opp,
      user_id: user.id,
    });
  }

  return Response.json({ fetched: data.totalRecords || 0, message: "BidWon scan complete" });
}
