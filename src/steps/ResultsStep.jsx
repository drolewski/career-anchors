import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { anchors, anchorOrder } from '../data/anchors.js';
import { sentences } from '../data/sentences.js';
import { calculateAnchorScores } from '../lib/calculations.js';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { useLang } from '../lib/i18n.jsx';

function AnchorBar({ code, score, maxScore, rank, isPrimary }) {
  const { t } = useLang();
  const anchor = anchors[code];
  const percent = Math.round((score / maxScore) * 100);
  const translatedName = t(`anchors.${code}.name`);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.08 }}
      className={`rounded-xl p-4 sm:p-5 transition-all duration-300 ${
        isPrimary ? 'ring-2 shadow-lg' : 'glass'
      }`}
      style={isPrimary ? {
        background: anchor.color + '10',
        borderColor: anchor.color + '40',
        boxShadow: `0 8px 30px ${anchor.color}20`,
      } : {}}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-bold px-2.5 py-1 rounded-lg"
            style={{ backgroundColor: anchor.color + '25', color: anchor.color }}
          >
            {isPrimary ? '★' : `#${rank + 1}`}
          </span>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm sm:text-base">
              {typeof translatedName === 'string' ? translatedName : anchor.name}
            </h3>
            <p className="text-xs text-slate-500">{code}</p>
          </div>
        </div>
        <span className="text-lg sm:text-xl font-bold" style={{ color: anchor.color }}>
          {percent}%
        </span>
      </div>
      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full anchor-bar"
          style={{ backgroundColor: anchor.color }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, delay: rank * 0.1, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </motion.div>
  );
}

function AnchorDetail({ code, score, maxScore, isPrimary }) {
  const { t } = useLang();
  const anchor = anchors[code];
  const percent = Math.round((score / maxScore) * 100);
  const translatedName = t(`anchors.${code}.name`);
  const translatedDesc = t(`anchors.${code}.description`);
  const translatedDrive = t(`anchors.${code}.coreDrive`);
  const translatedMotiv = t(`anchors.${code}.motivation`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 sm:p-8 ${isPrimary ? 'ring-2' : 'glass'}`}
      style={isPrimary ? {
        background: `linear-gradient(135deg, ${anchor.color}08 0%, ${anchor.color}15 100%)`,
        borderColor: anchor.color + '40',
        boxShadow: `0 20px 60px ${anchor.color}15`,
      } : {}}
    >
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0"
          style={{ background: `linear-gradient(135deg, ${anchor.color} 0%, ${anchor.color}CC 100%)` }}
        >
          {isPrimary ? '★' : code}
        </div>
        <div>
          {isPrimary && (
            <span className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: anchor.color }}>
              {t('results.primaryAnchor')}
            </span>
          )}
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
            {typeof translatedName === 'string' ? translatedName : anchor.name}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">{t('results.score')}: {percent}%</p>
        </div>
      </div>

      <p className="text-slate-300 leading-relaxed mb-5 text-sm sm:text-base">
        {typeof translatedDesc === 'string' ? translatedDesc : anchor.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-800/50 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            {t('results.coreDrive')}
          </h4>
          <p className="text-sm text-slate-200">
            {typeof translatedDrive === 'string' ? translatedDrive : anchor.coreDrive}
          </p>
        </div>
        <div className="rounded-xl bg-slate-800/50 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            {t('results.motivation')}
          </h4>
          <p className="text-sm text-slate-200">
            {typeof translatedMotiv === 'string' ? translatedMotiv : anchor.motivation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResultsStep({ demographics, ratings, top3, startTime }) {
  const { t } = useLang();
  const [saved, setSaved] = useState(false);
  const result = calculateAnchorScores(ratings, top3);
  const maxPossible = result.sorted[0].maxPossible;

  useEffect(() => {
    async function saveResult() {
      if (!isSupabaseConfigured() || saved) return;

      const payload = {
        birth_year: parseInt(demographics.birthYear),
        generation: demographics.generation,
        position: demographics.position,
        branch: demographics.branch,
        industry: demographics.industry,
        free_text: demographics.freeText || null,
        ratings: ratings,
        top_3: top3,
        anchor_scores: result.scores,
        primary_anchor: result.primary,
        secondary_anchor: result.secondary,
        completed_at: new Date().toISOString(),
        duration_seconds: Math.round((Date.now() - startTime) / 1000),
      };

      try {
        const { error } = await supabase.from('schein_responses').insert(payload);
        if (error) console.error('Save error:', error);
        else setSaved(true);
      } catch (err) {
        console.error('Save error:', err);
      }
    }
    saveResult();
  }, []);

  const primaryAnchor = anchors[result.primary];
  const secondaryAnchor = anchors[result.secondary];
  const top3Sentences = top3.map(id => sentences.find(s => s.id === id));
  const pairingVerb = t(`pairingVerbs.${result.primary}`);
  const secondaryDrive = t(`anchors.${result.secondary}.coreDrive`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center text-4xl"
          style={{ background: `linear-gradient(135deg, ${primaryAnchor.color} 0%, ${primaryAnchor.color}CC 100%)` }}
        >
          ★
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
          {t('results.title')}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
          {t('results.subtitle')}
        </p>
        {demographics.generation && (
          <p className="text-xs text-slate-500 mt-2">
            {demographics.generation} · {demographics.position} · {demographics.industry}
          </p>
        )}
      </div>

      <div className="mb-8">
        <AnchorDetail
          code={result.primary}
          score={result.scores[result.primary].raw}
          maxScore={maxPossible}
          isPrimary={true}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <span className="text-cyan-400">#2</span> {t('results.secondaryAnchor')}
        </h3>
        <AnchorDetail
          code={result.secondary}
          score={result.scores[result.secondary].raw}
          maxScore={maxPossible}
          isPrimary={false}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">{t('results.allAnchors')}</h3>
        <div className="space-y-3">
          {result.sorted.map((item, index) => (
            <AnchorBar
              key={item.code}
              code={item.code}
              score={item.raw}
              maxScore={maxPossible}
              rank={index}
              isPrimary={index === 0}
            />
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">{t('results.yourTop3')}</h3>
        <div className="space-y-3">
          {top3Sentences.map((sentence, i) => {
            const code = Object.entries(anchors).find(([_, a]) =>
              a.sentenceIds.includes(sentence.id)
            )?.[0];
            const anchor = anchors[code];
            const translatedText = t(`sentences.${sentence.id}`);
            const translatedAnchorName = t(`anchors.${code}.name`);
            return (
              <div key={sentence.id} className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/50">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: anchor?.color || '#666' }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm text-slate-200">
                    {typeof translatedText === 'string' ? translatedText : sentence.text}
                  </p>
                  <span
                    className="text-xs font-medium mt-1 inline-block px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: (anchor?.color || '#666') + '20', color: anchor?.color || '#666' }}
                  >
                    {code} — {typeof translatedAnchorName === 'string' ? translatedAnchorName : anchor?.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">{t('results.pairingInsight')}</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {t('results.subtitle').includes('kotwice') ? (
            <>
              Twoja główna kotwica{' '}
              <strong style={{ color: primaryAnchor.color }}>{t(`anchors.${result.primary}.name`)}</strong>{' '}
              w połączeniu z{' '}
              <strong style={{ color: secondaryAnchor.color }}>{t(`anchors.${result.secondary}.name`)}</strong>{' '}
              sugeruje, że najlepiej funkcjonujesz, gdy możesz{' '}
              {pairingVerb}{' '}
              <strong>{typeof secondaryDrive === 'string' ? secondaryDrive.toLowerCase() : secondaryAnchor.coreDrive.toLowerCase()}</strong>.
              {' '}{t('pairingEnding')}
            </>
          ) : (
            <>
              Your primary anchor{' '}
              <strong style={{ color: primaryAnchor.color }}>{primaryAnchor.name}</strong>{' '}
              combined with{' '}
              <strong style={{ color: secondaryAnchor.color }}>{secondaryAnchor.name}</strong>{' '}
              suggests that you thrive when you can{' '}
              {pairingVerb}{' '}
              <strong>{typeof secondaryDrive === 'string' ? secondaryDrive.toLowerCase() : secondaryAnchor.coreDrive.toLowerCase()}</strong>.
              {' '}{t('pairingEnding')}
            </>
          )}
        </p>
      </div>

      {isSupabaseConfigured() && (
        <div className={`rounded-2xl p-4 text-center mb-8 ${
          saved ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-slate-800/50'
        }`}>
          <p className="text-sm text-slate-400">
            {saved ? t('results.saved') : t('results.saving')}
          </p>
        </div>
      )}

      {!isSupabaseConfigured() && (
        <div className="rounded-2xl p-4 text-center mb-8 bg-amber-500/10 border border-amber-500/20">
          <p className="text-sm text-amber-300">
            {t('results.configSupabase')}
          </p>
        </div>
      )}

      <button
        onClick={() => window.location.reload()}
        className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
      >
        {t('results.takeAgain')}
      </button>
    </motion.div>
  );
}
