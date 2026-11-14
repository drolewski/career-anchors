import { forwardRef } from 'react';
import { motion as Motion } from 'framer-motion';
import RatingButton from './RatingButton.jsx';
import { getAnchorForSentence } from '../data/anchors.js';
import { useLang } from '../lib/i18n.jsx';

const SentenceCard = forwardRef(function SentenceCard({ sentenceId, rating, onRate, index, isTop3 }, ref) {
  const { t } = useLang();
  const anchorCode = getAnchorForSentence(sentenceId);

  const anchorColors = {
    TF: 'border-l-indigo-400',
    GM: 'border-l-amber-400',
    AU: 'border-l-emerald-400',
    SE: 'border-l-violet-400',
    EC: 'border-l-red-400',
    SV: 'border-l-pink-400',
    CH: 'border-l-orange-400',
    LS: 'border-l-teal-400',
  };

  const translatedText = t(`sentences.${sentenceId}`);

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.02 }}
      className={`glass rounded-2xl p-5 sm:p-6 border-l-4 ${anchorColors[anchorCode] || 'border-l-slate-600'} glass-hover transition-all duration-300`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400">
          {sentenceId}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
            {translatedText}
          </p>
          <div className="grid grid-cols-6 gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5, 6].map(val => (
              <RatingButton
                key={val}
                value={val}
                selected={rating === val}
                onClick={onRate}
              />
            ))}
          </div>
          <div className="flex gap-1 mt-3 text-xs text-slate-600">
            <span>{t('rating.notAtAll')}</span>
            <span className="flex-1" />
            <span>{t('rating.completely')}</span>
          </div>
        </div>
      </div>
      {isTop3 && (
        <div className="absolute top-3 right-3">
          <span className="top3-badge text-white text-xs font-bold px-2 py-1 rounded-full">
            TOP 3
          </span>
        </div>
      )}
    </Motion.div>
  );
});

export default SentenceCard;
