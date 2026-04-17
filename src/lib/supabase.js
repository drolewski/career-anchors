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
-- ============================================
-- SUPABASE SQL SCHEMA - RUN IN SQL EDITOR
-- ============================================

-- 1. Utwórz tabelę (jeśli nie istnieje)
CREATE TABLE IF NOT EXISTS schein_responses (
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
  tertiary_anchor TEXT,

  -- Metadata
  completed_at TIMESTAMPTZ,
  duration_seconds INTEGER
);

-- 2. Włącz RLS
ALTER TABLE schein_responses ENABLE ROW LEVEL SECURITY;

-- 3. Pozwól odczyt (anonimowo - dla agregacji)
DROP POLICY IF EXISTS "Allow anonymous reads" ON schein_responses;
CREATE POLICY "Allow anonymous reads" ON schein_responses
FOR SELECT TO anon USING (true);

-- 4. Utwórz indeks dla created_at
CREATE INDEX IF NOT EXISTS idx_schein_responses_created 
ON schein_responses (created_at DESC);

-- 5. Pozwól wstawianie (anonimowo)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON schein_responses;
CREATE POLICY "Allow anonymous inserts" ON schein_responses
FOR INSERT TO anon WITH CHECK (true);

-- ============================================
-- CO DZIAŁA:
-- ============================================
-- - Tabela przechowuje odpowiedzi użytkowników
-- - Odczyt: każdy może czytać (dla agregacji)
-- - Wstawianie: każdy może dodawać odpowiedzi
-- ============================================
*/