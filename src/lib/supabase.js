import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export function isSupabaseConfigured() {
  return supabase !== null;
}

/*
-- Supabase SQL Schema (run in SQL Editor):

CREATE TABLE schein_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Demographics
  birth_year INTEGER,
  generation TEXT,
  position TEXT,
  branch TEXT,
  industry TEXT,
  free_text TEXT,

  -- Ratings (1-6 per sentence, stored as JSONB)
  ratings JSONB,

  -- Top 3 selected sentence IDs
  top_3 INTEGER[],

  -- Calculated anchor scores
  anchor_scores JSONB,
  primary_anchor TEXT,
  secondary_anchor TEXT,

  -- Metadata
  completed_at TIMESTAMPTZ,
  duration_seconds INTEGER
);

-- Enable RLS
ALTER TABLE schein_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public survey)
CREATE POLICY "Allow anonymous inserts" ON schein_responses
  FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous reads (for aggregate analysis)
CREATE POLICY "Allow anonymous reads" ON schein_responses
  FOR SELECT TO anon USING (true);
*/
