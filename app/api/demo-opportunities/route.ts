import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    if (!query) {
      return NextResponse.json({ error: "NAICS code or keyword required" }, { status: 400 });
    }

    const { data: matches, error } = await supabase
      .from('sam_opportunities')
      .select('opportunity_id, title, agency, naics_code')
      .or('title.ilike.%' + query + '%,naics_code.ilike.%' + query + '%')
      .limit(5);

    if (error) throw error;

    return NextResponse.json({ matches: matches || [] });

  } catch (error: any) {
    console.error('Database Query Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}