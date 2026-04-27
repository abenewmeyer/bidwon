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

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  
  // Public search endpoint - NO API KEY required
  const samPublicUrl = `https://api.sam.gov/opportunities/v2/search?limit=100&postedFrom=${formatDate(yesterday)}&postedTo=${formatDate(today)}&ptype=o,k`;

  try {
    const response = await fetch(samPublicUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) throw new Error(`SAM Public API failed: ${response.statusText}`);

    const data = await response.json();
    const records = data.opportunitiesData || [];

    if (records.length === 0) {
      return NextResponse.json({ success: true, message: "No new opportunities found in last 24h via public API." });
    }

    const formattedRecords = records.map((opp: any) => ({
      notice_id: opp.noticeId,
      title: opp.title,
      department: opp.fullParentPathName || opp.organizationName,
      naics_code: opp.naicsCode,
      posted_date: opp.postedDate,
      close_date: opp.responseDeadLine,
      description: opp.description,
      url: opp.uiLink
    }));

    const { error } = await supabase
      .from('sam_opportunities')
      .upsert(formattedRecords, { onConflict: 'notice_id' });

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      message: `Sync complete. Upserted ${formattedRecords.length} records from public API.` 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Sync failed', details: String(error) }, { status: 500 });
  }
}