export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const samExtractUrl = 'https://sam.gov/api/prod/fileextractservices/v1/api/download/Active%20Opportunities';
  
  try {
    // Added User-Agent to mimic a browser
    const response = await fetch(samExtractUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) throw new Error(`Failed to fetch from SAM: ${response.statusText}`);

    const rawText = await response.text();
    
    // Check if we actually got content
    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: "SAM returned an empty body. Possible bot block.",
        status: response.status
      });
    }

    const records = parseCSV(rawText);

    if (records.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: "0 records parsed.", 
        raw_preview: rawText.substring(0, 500) 
      });
    }

    let upsertedCount = 0;
    const batchSize = 100;

    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize).map((row) => ({
        notice_id: row['NoticeId'],
        title: row['Title'],
        department: row['Department/Ind.Agency'],
        naics_code: row['NaicsCode'],
        posted_date: row['PostedDate'] ? new Date(row['PostedDate']).toISOString() : null,
        close_date: row['ResponseDeadLine'] ? new Date(row['ResponseDeadLine']).toISOString() : null,
        description: row['Description'],
        url: row['LinkToUi']
      }));

      const { error } = await supabase
        .from('sam_opportunities')
        .upsert(batch, { onConflict: 'notice_id', ignoreDuplicates: false });

      if (!error) upsertedCount += batch.length;
    }

    return NextResponse.json({ 
      success: true, 
      message: `SAM bulk data sync complete. Upserted ${upsertedCount} records.` 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Sync failed', details: String(error) }, { status: 500 });
  }
}