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

  const url = 'https://sam.gov/api/prod/fileextractservices/v1/api/download/Active%20Opportunities';

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': '*/*'
      }
    });

    if (!response.ok) {
      throw new Error(`Download failed: ${response.status}`);
    }

    // CRITICAL FIX: handle as binary, not text
    const buffer = await response.arrayBuffer();

    if (!buffer || buffer.byteLength === 0) {
      return NextResponse.json({
        success: false,
        message: 'Empty file returned (SAM blocking or no data)'
      });
    }

    // Convert buffer → string safely
    const text = new TextDecoder('utf-8').decode(buffer);

    // quick sanity check
    if (!text.includes(',')) {
      return NextResponse.json({
        success: false,
        message: 'Downloaded file is not CSV',
        preview: text.substring(0, 300)
      });
    }

    const rows = text.split('\n');
    const headers = rows[0].split(',');

    let count = 0;

    const data = rows.slice(1).map((line) => {
      const cols = line.split(',');

      return {
        notice_id: cols[headers.indexOf('NoticeId')],
        title: cols[headers.indexOf('Title')],
        department: cols[headers.indexOf('Department/Ind.Agency')],
        naics_code: cols[headers.indexOf('NaicsCode')],
        posted_date: cols[headers.indexOf('PostedDate')],
        close_date: cols[headers.indexOf('ResponseDeadLine')],
        description: cols[headers.indexOf('Description')],
        url: cols[headers.indexOf('LinkToUi')]
      };
    }).filter(r => r.notice_id);

    if (data.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'CSV parsed but no usable rows',
        preview: text.substring(0, 300)
      });
    }

    const { error } = await supabase
      .from('sam_opportunities')
      .upsert(data, { onConflict: 'notice_id' });

    if (error) throw error;

    count = data.length;

    return NextResponse.json({
      success: true,
      message: `Upserted ${count} records`
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Sync failed',
      details: String(error)
    }, { status: 500 });
  }
}