import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Native CSV parser to avoid requiring external npm packages
function parseCSV(text: string) {
  const results: string[][] = [];
  let currentField = '';
  let currentRow: string[] = [];
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++; // Skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++; // Handle \r\n
      currentRow.push(currentField);
      if (currentRow.some(field => field !== '')) results.push(currentRow);
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }
  
  if (currentRow.length > 0 || currentField !== '') {
    currentRow.push(currentField);
    results.push(currentRow);
  }
  
  if (results.length < 2) return [];
  
  const headers = results[0].map(h => h.trim());
  return results.slice(1).map(row => {
    const obj: Record<string, string> = {};
    headers.forEach((h, index) => {
      obj[h] = row[index] ? row[index].trim() : '';
    });
    return obj;
  });
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const samExtractUrl = 'https://sam.gov/api/prod/fileextractservices/v1/api/download/Active%20Opportunities';
  
  try {
    const response = await fetch(samExtractUrl);
    if (!response.ok) throw new Error(`Failed to fetch from SAM: ${response.statusText}`);

    const csvText = await response.text();
    const records = parseCSV(csvText);

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

      if (error) {
        console.error('Batch error:', error);
      } else {
        upsertedCount += batch.length;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `SAM bulk data sync complete. Upserted ${upsertedCount} records.` 
    });

  } catch (error) {
    console.error('Sync failed:', error);
    return NextResponse.json({ error: 'Sync failed', details: String(error) }, { status: 500 });
  }
}