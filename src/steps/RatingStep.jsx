import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import SentenceCard from '../components/SentenceCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { useLang } from '../lib/i18n.jsx';

export default function RatingStep({ ratings, onNext }) {
  const { t } = useLang();
  const [currentRatings, setCurrentRatings] = useState(ratings || {});
  const ratedCount = Object.keys(currentRatings).length;
  const cardRefs = useRef([]);

  const scrollToNext = useCallback((currentId) => {
    for (let nextId = currentId + 1; nextId <= 40; nextId++) {
      if (!currentRatings[nextId]) {
        const el = cardRefs.current[nextId - 1];
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 150);
        }
        return;
      }
    }
  }, [currentRatings]);

  const handleRate = (sentenceId, value) => {
    const wasRated = !!currentRatings[sentenceId];
    const updated = { ...currentRatings, [sentenceId]: value };
    setCurrentRatings(updated);

    if (!wasRated) {
      scrollToNext(sentenceId);
    }
  };

  const allRated = Object.keys(currentRatings).length === 40;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
          {t('rating.title')}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          {t('rating.subtitle').split('<bold>').map((part, i) => {
            if (i === 0) return part;
            const [bold, rest] = part.split('</bold>');
            return (
              <span key={i}>
                <strong className="text-slate-300">{bold}</strong>
                {rest}
              </span>
            );
          })}
        </p>
      </div>

      <ProgressBar current={Object.keys(currentRatings).length} total={40} label={t('rating.progressLabel')} />

      <div className="space-y-4 mb-8">
        {Array.from({ length: 40 }, (_, i) => i + 1).map((id, index) => (
          <SentenceCard
            key={id}
            ref={(el) => { cardRefs.current[index] = el; }}
            sentenceId={id}
            rating={currentRatings[id]}
            onRate={(value) => handleRate(id, value)}
            index={index}
          />
        ))}
      </div>

      <div className="sticky bottom-6 z-10">
        <div className="glass rounded-2xl p-4 mx-auto max-w-md">
          <button
            onClick={() => onNext(currentRatings)}
            disabled={!allRated}
            className="w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-indigo-500/25"
          >
            {allRated ? (
              <>
                {t('rating.continueToTop3')}
                <svg className="inline-block w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            ) : (
              t('rating.ratedOf40', { count: Object.keys(currentRatings).length })
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
