import { useState } from 'react';
import { motion } from 'framer-motion';
import { getAnchorForSentence, anchors } from '../data/anchors.js';
import { useLang } from '../lib/i18n.jsx';

export default function Top3Step({ ratings, onNext }) {
  const { t } = useLang();
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  const sortedSentences = Array.from({ length: 40 }, (_, i) => i + 1).sort((a, b) => {
    const ra = ratings[a] || 0;
    const rb = ratings[b] || 0;
    return rb - ra;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
          {t('top3.title')}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          {t('top3.subtitle').split('<highlight>').map((part, i) => {
            if (i === 0) return part;
            const [highlight, rest] = part.split('</highlight>');
            return (
              <span key={i}>
                <strong className="text-amber-400">{highlight}</strong>
                {rest}
              </span>
            );
          })}
        </p>
      </div>

      <div className="glass rounded-2xl p-4 mb-6 flex items-center justify-between">
        <span className="text-sm text-slate-400" id="top3-selection-count">
          {t('top3.selected')}: <span className="font-bold text-slate-200">{selected.length}/3</span>
        </span>
        {selected.length > 0 && (
          <button
            onClick={() => setSelected([])}
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
            aria-label={t('top3.clearAll')}
          >
            {t('top3.clearAll')}
          </button>
        )}
      </div>

      <div className="space-y-3 mb-8">
        {sortedSentences.map((id, index) => {
          const isSelected = selected.includes(id);
          const anchorCode = getAnchorForSentence(id);
          const anchor = anchors[anchorCode];
          const rating = ratings[id];
          const translatedText = t(`sentences.${id}`);

          const anchorColors = {
            TF: 'border-l-indigo-400 bg-indigo-500/5',
            GM: 'border-l-amber-400 bg-amber-500/5',
            AU: 'border-l-emerald-400 bg-emerald-500/5',
            SE: 'border-l-violet-400 bg-violet-500/5',
            EC: 'border-l-red-400 bg-red-500/5',
            SV: 'border-l-pink-400 bg-pink-500/5',
            CH: 'border-l-orange-400 bg-orange-500/5',
            LS: 'border-l-teal-400 bg-teal-500/5',
          };

          return (
            <motion.button
              key={id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.015 }}
              onClick={() => toggleSelect(id)}
              disabled={!isSelected && selected.length >= 3}
              className={`w-full text-left rounded-2xl p-5 border-l-4 transition-all duration-300 ${
                isSelected
                  ? `${anchorColors[anchorCode]} ring-2 ring-amber-500/50 shadow-lg shadow-amber-500/10`
                  : `${anchorColors[anchorCode]} glass-hover opacity-${selected.length >= 3 && !isSelected ? '40' : '100'}`
              }`}
              aria-pressed={isSelected}
              aria-label={`${translatedText}, ${t('top3.rated')}: ${rating}/6${isSelected ? ', ' + t('top3.selected') : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`} aria-hidden="true">
                  {isSelected ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    id
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {typeof translatedText === 'string' ? translatedText : ''}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: (anchor?.color || '#666') + '20', color: anchor?.color || '#666' }}
                    >
                      {anchorCode}
                    </span>
                    <span className="text-xs text-slate-500">
                      {t('top3.rated')}: {rating}/6
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="sticky bottom-6 z-10">
        <div className="glass rounded-2xl p-4 mx-auto max-w-md">
          <button
            onClick={() => onNext(selected)}
            disabled={selected.length !== 3}
            className="w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/25"
          >
            {selected.length === 3 ? (
              <>
                {t('top3.seeResults')}
                <svg className="inline-block w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            ) : (
              t('top3.selectMore', { count: 3 - selected.length })
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
