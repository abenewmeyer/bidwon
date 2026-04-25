import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { opportunityId, naicsCode, requirements, queryEmbedding } = await request.json();

    const { data: documents, error: matchError } = await supabase.rpc('match_award_vectors', {
      query_embedding: queryEmbedding, 
      match_threshold: 0.7,
      match_count: 3,
      p_naics_code: naicsCode
    });

    if (matchError) throw matchError;

    const historicalContext = documents ? documents.map((doc: any) => doc.content).join('\n\n') : '';

    const systemPrompt = `
    You are an elite government contract writer utilizing a Straight Line methodology for clarity and compliance.
    Using the compliance standards, formatting, and tone of these proven historical submissions:
    ${historicalContext}
    
    Draft a highly competitive response for this new solicitation:
    ${requirements}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }]
      })
    });

    const result = await response.json();
    const bidText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Generation failed";

    return NextResponse.json({ bid: bidText });

  } catch (error) {
    console.error('Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate bid' }, { status: 500 });
  }
}