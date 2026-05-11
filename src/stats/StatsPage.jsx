import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import { useLang } from '../lib/i18n.jsx';
import Header from '../components/Header.jsx';
import WeeklyResponses from './WeeklyResponses.jsx';
import AnchorDistribution from './AnchorDistribution.jsx';
import GenerationStats from './GenerationStats.jsx';
import AnchorPairs from './AnchorPairs.jsx';
import IndustryStats from './IndustryStats.jsx';
import StatsFilters from './StatsFilters.jsx';
import Top3Anchors from './Top3Anchors.jsx';
import { anchorOrder, getAnchorForSentence } from '../data/anchors.js';
import { translations } from '../data/translations.js';
import { normalizeResponse, normalizeFilters } from './normalizer.js';

export default function StatsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    generations: [],
    industries: [],
    positions: [],
    dateFrom: null,
    dateTo: null,
  });
  const { lang } = useLang();
  const t = (key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) val = val?.[k];
    return val || key;
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    if (!supabase) {
      setError('Supabase not configured');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      let query = supabase
        .from('schein_responses')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: responses, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      let normalizedResponses = (responses || []).map(normalizeResponse);

      if (filters.generations.length > 0) {
        normalizedResponses = normalizedResponses.filter(r => filters.generations.includes(r.generation));
      }
      if (filters.industries.length > 0) {
        normalizedResponses = normalizedResponses.filter(r => filters.industries.includes(r.industry));
      }
      if (filters.positions.length > 0) {
        normalizedResponses = normalizedResponses.filter(r => filters.positions.includes(r.position));
      }
      if (filters.dateFrom) {
        normalizedResponses = normalizedResponses.filter(r => r.created_at >= filters.dateFrom);
      }
      if (filters.dateTo) {
        normalizedResponses = normalizedResponses.filter(r => r.created_at <= filters.dateTo);
      }

      const stats = calculateStats(normalizedResponses);
      setData(stats);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (responses) => {
    const total = responses.length;

    const weeklyData = getWeeklyData(responses);

    const anchorCounts = { primary: {}, secondary: {}, tertiary: {} };
    const anchorPairs = {};
    const generationAnchors = {};
    const industryAnchors = {};
    const top3Anchors = {};
    anchorOrder.forEach(code => {
      anchorCounts.primary[code] = 0;
      anchorCounts.secondary[code] = 0;
      anchorCounts.tertiary[code] = 0;
      top3Anchors[code] = 0;
    });

    let top3Total = 0;

    responses.forEach(r => {
      if (r.primary_anchor) {
        anchorCounts.primary[r.primary_anchor] = (anchorCounts.primary[r.primary_anchor] || 0) + 1;
      }
      if (r.secondary_anchor) {
        anchorCounts.secondary[r.secondary_anchor] = (anchorCounts.secondary[r.secondary_anchor] || 0) + 1;
      }
      if (r.tertiary_anchor) {
        anchorCounts.tertiary[r.tertiary_anchor] = (anchorCounts.tertiary[r.tertiary_anchor] || 0) + 1;
      }

      if (r.top_3 && Array.isArray(r.top_3)) {
        r.top_3.forEach(sentenceId => {
          const anchor = getAnchorForSentence(sentenceId);
          if (anchor) {
            top3Anchors[anchor] = (top3Anchors[anchor] || 0) + 1;
          }
        });
      }

      if (r.primary_anchor && r.secondary_anchor) {
        const pair = [r.primary_anchor, r.secondary_anchor].sort().join('+');
        anchorPairs[pair] = (anchorPairs[pair] || 0) + 1;
      }

      if (r.generation && r.primary_anchor) {
        if (!generationAnchors[r.generation]) {
          generationAnchors[r.generation] = { total: 0 };
          anchorOrder.forEach(code => {
            generationAnchors[r.generation][code] = 0;
          });
        }
        generationAnchors[r.generation].total++;
        generationAnchors[r.generation][r.primary_anchor]++;
      }

      if (r.industry && r.primary_anchor) {
        if (!industryAnchors[r.industry]) {
          industryAnchors[r.industry] = { total: 0 };
          anchorOrder.forEach(code => {
            industryAnchors[r.industry][code] = 0;
          });
        }
        industryAnchors[r.industry].total++;
        industryAnchors[r.industry][r.primary_anchor]++;
      }
    });

    top3Total = Object.values(top3Anchors).reduce((sum, v) => sum + v, 0);

    return {
      total,
      weeklyData,
      anchorCounts,
      anchorPairs,
      generationAnchors,
      industryAnchors,
      top3Anchors,
      top3Total,
    };
  };

  const getWeeklyData = (responses) => {
    const weeks = {};
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (i * 7));
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const weekKey = weekStart.toISOString().split('T')[0];
      const label = weekStart.toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-US', {
        month: 'short',
        day: 'numeric'
      });

      weeks[weekKey] = { label, count: 0 };
    }

    responses.forEach(r => {
      if (!r.created_at) return;
      const created = new Date(r.created_at);
      for (const [weekKey, weekData] of Object.entries(weeks)) {
        const weekStart = new Date(weekKey);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        if (created >= weekStart && created < weekEnd) {
          weeks[weekKey].count++;
          break;
        }
      }
    });

    return Object.values(weeks);
  };

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6">
        <Header />
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-red-400">{t('stats.error')}: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <Header />
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('stats.title')}</span>
          </h1>
          <p className="text-slate-400">
            {loading ? t('stats.loading') : `${t('stats.total')}: ${data?.total || 0}`}
          </p>
          <p className="text-xs text-slate-500 mt-3">
            <a
              href="/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
            >
              {lang === 'pl' ? 'Dowiedz się więcej o Kotwicach Kariery' : 'Learn more about Career Anchors'}
            </a>
          </p>
        </div>

        <StatsFilters filters={filters} onChange={setFilters} />

        {loading ? (
          <div className="glass rounded-xl p-12 text-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-400">{t('stats.loading')}</p>
            </div>
          </div>
        ) : data?.total === 0 ? (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-slate-400">{t('stats.noData')}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnchorDistribution
                title={t('stats.primaryAnchor')}
                data={data?.anchorCounts?.primary || {}}
                total={data?.total || 0}
                colors={getAnchorColors()}
              />
              <AnchorDistribution
                title={t('stats.secondaryAnchor')}
                data={data?.anchorCounts?.secondary || {}}
                total={data?.total || 0}
                colors={getAnchorColors()}
              />
              <AnchorDistribution
                title={t('stats.tertiaryAnchor')}
                data={data?.anchorCounts?.tertiary || {}}
                total={data?.total || 0}
                colors={getAnchorColors()}
              />
            </div>

            <AnchorPairs data={data?.anchorPairs || {}} total={data?.total || 0} />

            <GenerationStats data={data?.generationAnchors || {}} />

            <Top3Anchors data={data?.top3Anchors || {}} total={data?.top3Total || 0} />

            <IndustryStats data={data?.industryAnchors || {}} />

            <WeeklyResponses data={data?.weeklyData || []} />
          </>
        )}
      </div>

      <footer className="text-center mt-12 mb-6 text-xs text-slate-600 space-y-2">
          <p>{t('app.footer')}</p>
          <p>
            {t('app.created')}
            <a
              href="https://www.linkedin.com/in/dominik-rolewski-01bba9155/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-400 transition-colors underline underline-offset-2"
            >
              Dominik Rolewski
            </a>
          </p>
          <p>
            <a
              href="/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-400 transition-colors underline underline-offset-2"
            >
              {lang === 'pl' ? 'Dowiedz się więcej o Kotwicach Kariery' : 'Learn more about Career Anchors'}
            </a>
          </p>
        </footer>
    </div>
  );
}

function getAnchorColors() {
  return {
    TF: '#818CF8',
    GM: '#F59E0B',
    AU: '#10B981',
    SE: '#6366F1',
    EC: '#EF4444',
    SV: '#EC4899',
    CH: '#F97316',
    LS: '#14B8A6',
  };
}
