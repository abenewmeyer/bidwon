import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { opportunity } = await req.json();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { data: profile } = await supabase
    .from("company_profiles").select("*").eq("user_id", user.id).single();

  const prompt = `You are an expert government contracting proposal writer for BidWon AI.

Company: ${profile?.company_name || "Company"}
Certifications: ${profile?.set_asides?.join(", ") || "SDVOSBC"}
NAICS: ${profile?.naics_codes?.join(", ") || "624230"}
Capability Statement: ${profile?.capability_statement || "Construction management, safety management, disaster recovery, staffing services."}

Solicitation Title: ${opportunity.title}
Agency: ${opportunity.agency}
Deadline: ${opportunity.response_deadline}
Set-Aside: ${opportunity.type_of_set_aside}

Generate a complete bid package with these clearly labeled sections:

1. COVER LETTER
2. COMPANY OVERVIEW
3. TECHNICAL APPROACH
4. PAST PERFORMANCE SUMMARY (owner to fill in 3 references)
5. COMPLIANCE CHECKLIST
6. NEXT STEPS FOR SUBMISSION ON SAM.GOV

DISCLAIMER AT END: This is an AI-generated draft. Owner must review all content, verify accuracy, add specific past performance data, and manually submit on SAM.gov. BidWon does not submit bids on your behalf.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  const bid_package = data.content?.[0]?.text || "Error generating bid package.";
  return Response.json({ bid_package });
}
