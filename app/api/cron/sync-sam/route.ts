import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Use the public frontend data service (No API Key Required)
  const samPublicUrl = "https://sam.gov/api/prod/samsse/v1/api/search?index=opportunities&page=0&size=100&sort=-modifiedDate&mode=search&is_active=true";

  try {
    const response = await fetch(samPublicUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) throw new Error(`Public Data Service failed: ${response.statusText}`);

    const data = await response.json();
    // The structure for this endpoint is in data._embedded.results
    const records = data._embedded?.results || [];

    if (records.length === 0) {
      return NextResponse.json({ success: true, message: "No records found on public frontend service." });
    }

    const formattedRecords = records.map((opp: any) => ({
      notice_id: opp.noticeId || opp._id,
      title: opp.title,
      department: opp.organizationLocation?.rawName || opp.agencyName,
      naics_code: opp.naicsCode,
      posted_date: opp.publishDate,
      close_date: opp.responseDate,
      description: opp.description,
      url: `https://sam.gov/opp/${opp.noticeId || opp._id}/view`
    }));

    const { error } = await supabase
      .from('sam_opportunities')
      .upsert(formattedRecords, { onConflict: 'notice_id' });

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      message: `Sync complete. Upserted ${formattedRecords.length} records from public frontend.` 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Sync failed', details: String(error) }, { status: 500 });
  }
}