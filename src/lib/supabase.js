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
  duration_seconds INTEGER,

  -- IP address for rate limiting
  ip INET
);

-- 2. Włącz RLS
ALTER TABLE schein_responses ENABLE ROW LEVEL SECURITY;

-- 3. Utwórz funkcję do automatycznego zapisywania IP
CREATE OR REPLACE FUNCTION set_ip_on_insert()
RETURNS TRIGGER AS $$
BEGIN
  NEW.ip = inet_client_addr();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Utwórz trigger który uruchomi funkcję przed każdym INSERT
DROP TRIGGER IF EXISTS set_ip_trigger ON schein_responses;
CREATE TRIGGER set_ip_trigger
BEFORE INSERT ON schein_responses
FOR EACH ROW
EXECUTE FUNCTION set_ip_on_insert();

-- 5. Utwórz politykę RLS z limitem: 1 wpis na IP co 24 godziny
DROP POLICY IF EXISTS "Rate limited inserts - 1 per 24h per IP" ON schein_responses;
CREATE POLICY "Rate limited inserts - 1 per 24h per IP" ON schein_responses
FOR INSERT TO anon 
WITH CHECK (
  NOT EXISTS (
    SELECT 1 FROM schein_responses
    WHERE ip = inet_client_addr()
    AND created_at > NOW() - INTERVAL '24 hours'
  )
);

-- 6. Pozwól odczyt (anonimowo - dla agregacji)
DROP POLICY IF EXISTS "Allow anonymous reads" ON schein_responses;
CREATE POLICY "Allow anonymous reads" ON schein_responses
FOR SELECT TO anon USING (true);

-- 7. Utwórz indeks dla lepszej wydajności
CREATE INDEX IF NOT EXISTS idx_schein_responses_ip_created 
ON schein_responses (ip, created_at DESC);

-- ============================================
-- CO DZIAŁA:
-- ============================================
-- - Trigger automatycznie zapisuje IP przy każdym INSERT
-- - Polityka RLS blokuje więcej niż 1 wpis/IP/24h
-- - Wszystkie zapytania INSERT są chronione
-- ============================================
*/