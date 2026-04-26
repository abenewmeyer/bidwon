import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: Request) {
  try {
    const { queries } = await req.json();
    
    // Filter out empty boxes
    const activeQueries = queries.filter((q: string) => q.trim() !== "");

    if (activeQueries.length === 0) {
      return NextResponse.json({ error: "At least one NAICS code or keyword is required." }, { status: 400 });
    }

    // Build dynamic OR string for Supabase based on populated boxes
    let orStringArray = [];
    for (const q of activeQueries) {
      orStringArray.push(`title.ilike.%${q}%,naics_code.ilike.%${q}%`);
    }
    const orQuery = orStringArray.join(",");

    const { data: matches, error } = await supabase
      .from("sam_opportunities")
      .select("opportunity_id, title, agency, naics_code")
      .or(orQuery)
      .limit(5);

    if (error) throw error;

    return NextResponse.json({ matches: matches || [] });

  } catch (error: any) {
    console.error("Database Query Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
