import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { anchors, getAnchorForSentence } from '../data/anchors.js';
import { calculateAnchorScores } from '../lib/calculations.js';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { useLang } from '../lib/i18n.jsx';

function AnchorBar({ code, scoreData, rank, isPrimary }) {
  const { t } = useLang();
  const anchor = anchors[code];
  const percent = scoreData.percentage;
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
              {translatedName}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{code}</span>
              <span>·</span>
              <span>avg {scoreData.rawAverage}</span>
              {scoreData.top3Count > 0 && (
                <>
                  <span>·</span>
                  <span className="text-amber-400">+{scoreData.top3Count}★</span>
                </>
              )}
              <span>·</span>
              <span className="text-slate-300 font-medium">{scoreData.corrected}</span>
            </div>
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

function AnchorDetail({ code, scoreData, isPrimary }) {
  const { t, lang } = useLang();
  const anchor = anchors[code];
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
            {translatedName}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
            <span>{t('results.rawAvg')}: {scoreData.rawAverage}/6</span>
            {scoreData.top3Count > 0 && (
              <span className="text-amber-400">
                {t('results.top3Bonus')}: +{scoreData.top3Count}★
              </span>
            )}
            <span className="text-slate-300 font-semibold">
              {t('results.corrected')}: {scoreData.corrected}
            </span>
          </div>
        </div>
      </div>

      <p className="text-slate-300 leading-relaxed mb-5 text-sm sm:text-base">
        {translatedDesc}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-800/50 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            {t('results.coreDrive')}
          </h4>
          <p className="text-sm text-slate-200">
            {translatedDrive}
          </p>
        </div>
        <div className="rounded-xl bg-slate-800/50 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            {t('results.motivation')}
          </h4>
          <p className="text-sm text-slate-200">
            {translatedMotiv}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResultsStep({ demographics, ratings, top3, startTime, isPreviousResult, onRetake }) {
  const { t, lang } = useLang();
  const [saved, setSaved] = useState(false);
  const result = calculateAnchorScores(ratings, top3);
  const saveAttemptedRef = useRef(false);

  useEffect(() => {
    if (saveAttemptedRef.current) return;
    saveAttemptedRef.current = true;

    async function saveResult() {
      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured');
        return;
      }
      
      const alreadySubmitted = localStorage.getItem('already_submitted');
      if (alreadySubmitted) {
        console.log('Submission blocked: already submitted');
        return;
      }

      console.log('Saving result to Supabase...');
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
        tertiary_anchor: result.tertiary,
        completed_at: new Date().toISOString(),
        duration_seconds: Math.round((Date.now() - startTime) / 1000),
      };

      try {
        console.log('Payload:', payload);
        const { error } = await supabase.from('schein_responses').insert(payload);
        if (error) {
          console.error('Save error:', error);
        } else {
          console.log('Saved successfully!');
          setSaved(true);
          localStorage.setItem('already_submitted', 'true');
        }
      } catch (err) {
        console.error('Save error:', err);
      }
    }
    saveResult();
  }, []);

  const primaryAnchor = anchors[result.primary];
  const secondaryAnchor = anchors[result.secondary];
  const pairingVerb = t(`pairingVerbs.${result.primary}`);
  const secondaryDrive = t(`anchors.${result.secondary}.coreDrive`);

  // Check if Top3 changed the ranking
  const rankingChanged = result.rawSorted[0].code !== result.sorted[0].code;

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
          {isPreviousResult ? t('results.yourPreviousResult') : t('results.title')}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
          {isPreviousResult ? t('results.previousResultSubtitle') : t('results.subtitle')}
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
          scoreData={result.scores[result.primary]}
          isPrimary={true}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <span className="text-cyan-400">#2</span> {t('results.secondaryAnchor')}
        </h3>
        <AnchorDetail
          code={result.secondary}
          scoreData={result.scores[result.secondary]}
          isPrimary={false}
        />
        <AnchorDetail
            code={result.tertiary}
            scoreData={result.scores[result.tertiary]}
            isPrimary={false}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">{t('results.allAnchors')}</h3>
        {rankingChanged && (
          <div className="glass rounded-xl p-3 mb-4 flex items-center gap-2 text-xs text-amber-300">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('results.rankingChanged')}
          </div>
        )}
        <div className="space-y-3">
          {result.sorted.map((item, index) => (
            <AnchorBar
              key={item.code}
              code={item.code}
              scoreData={result.scores[item.code]}
              rank={index}
              isPrimary={index === 0}
            />
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">{t('results.yourTop3')}</h3>
        <div className="space-y-3">
          {top3.map((id, i) => {
            const code = getAnchorForSentence(id);
            const anchor = anchors[code];
            const translatedText = t(`sentences.${id}`);
            const translatedAnchorName = t(`anchors.${code}.name`);
            return (
              <div key={id} className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/50">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: anchor?.color || '#666' }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm text-slate-200">
                    {translatedText}
                  </p>
                  <span
                    className="text-xs font-medium mt-1 inline-block px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: (anchor?.color || '#666') + '20', color: anchor?.color || '#666' }}
                  >
                    {code} — {translatedAnchorName}
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
              <strong>{typeof secondaryDrive === 'string' ? secondaryDrive.toLowerCase() : ''}</strong>.
              {' '}{t('pairingEnding')}
            </>
          ) : (
            <>
              Your primary anchor{' '}
              <strong style={{ color: primaryAnchor.color }}>{t(`anchors.${result.primary}.name`)}</strong>{' '}
              combined with{' '}
              <strong style={{ color: secondaryAnchor.color }}>{t(`anchors.${result.secondary}.name`)}</strong>{' '}
              suggests that you thrive when you can{' '}
              {pairingVerb}{' '}
              <strong>{typeof secondaryDrive === 'string' ? secondaryDrive.toLowerCase() : ''}</strong>.
              {' '}{t('pairingEnding')}
            </>
          )}
        </p>
      </div>

      {isPreviousResult && (
        <button
          onClick={onRetake}
          className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 mb-4"
        >
          {t('results.takeAgain')}
        </button>
      )}

      {!isPreviousResult && (
        <button
          onClick={() => window.location.reload()}
          className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
        >
          {t('results.takeAgain')}
        </button>
      )}
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
        <p>
          <a
              href="/privacy"
              target="_self"
              className="text-slate-600 hover:text-indigo-400 transition-colors underline underline-offset-2"
          >
            {lang === 'pl' ? 'Polityka prywatności' : 'Privacy Policy'}
          </a>
          {' · '}
          <a
              href="/terms"
              target="_self"
              className="text-slate-600 hover:text-indigo-400 transition-colors underline underline-offset-2"
          >
            {lang === 'pl' ? 'Regulamin' : 'Terms of Service'}
          </a>
        </p>
      </footer>
    </motion.div>
  );
}
