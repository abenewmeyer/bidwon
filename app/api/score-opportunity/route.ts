import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { opportunity, profile } = await req.json();

  const prompt = `You are an expert government contracting analyst for BidWon AI.

Company: ${opportunity.company_name}
Certifications: ${profile?.set_asides?.join(", ")}
NAICS Codes: ${profile?.naics_codes?.join(", ")}

Opportunity Title: ${opportunity.title}
Agency: ${opportunity.fullParentPathName}
Set-Aside: ${opportunity.typeOfSetAside}
NAICS: ${opportunity.naicsCode}
Deadline: ${opportunity.responseDeadLine}

Respond ONLY with valid JSON, no markdown or backticks:
{"score": <0-100>, "summary": "<2-3 sentence summary>", "checklist": "<eligibility bullet points>", "risks": "<risk flags or No major risks detected>"}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  const text = data.content?.[0]?.text || "{}";
  try { return Response.json(JSON.parse(text)); }
  catch { return Response.json({ score: 50, summary: text, checklist: "", risks: "" }); }
}
