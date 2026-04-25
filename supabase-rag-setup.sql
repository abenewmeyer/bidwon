CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS sam_opportunities (
    notice_id text PRIMARY KEY,
    title text,
    department text,
    naics_code text,
    posted_date date,
    close_date date,
    description text,
    url text
);

CREATE TABLE IF NOT EXISTS award_vectors (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    notice_id text,
    naics_code text,
    content text,
    embedding vector(768) 
);

CREATE OR REPLACE FUNCTION match_award_vectors (
  query_embedding vector(768),
  match_threshold float,
  match_count int,
  p_naics_code text
)
RETURNS TABLE (
  id uuid,
  content text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    av.id,
    av.content,
    1 - (av.embedding <=> query_embedding) AS similarity
  FROM award_vectors av
  WHERE av.naics_code = p_naics_code
  AND 1 - (av.embedding <=> query_embedding) > match_threshold
  ORDER BY av.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
