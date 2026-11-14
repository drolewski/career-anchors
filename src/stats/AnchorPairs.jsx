import { useLang } from '../lib/i18n.jsx';
import { translations } from '../data/translations.js';
import { useState } from 'react';

const anchorColors = {
  TF: '#818CF8',
  GM: '#F59E0B',
  AU: '#10B981',
  SE: '#6366F1',
  EC: '#EF4444',
  SV: '#EC4899',
  CH: '#F97316',
  LS: '#14B8A6',
};

const SortIcon = ({ column, sortConfig }) => {
  if (sortConfig.key !== column) {
    return <span className="ml-1 text-slate-600">↕</span>;
  }
  return <span className="ml-1 text-cyan-400">{sortConfig.direction === 'desc' ? '↓' : '↑'}</span>;
};

export default function AnchorPairs({ data, total }) {
  const { lang } = useLang();
  const t = (key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) val = val?.[k];
    return val || key;
  };
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'count', direction: 'desc' });

  const sortedPairs = Object.entries(data).sort((a, b) => {
    const [a1, a2] = a[0].split('+');
    const [b1, b2] = b[0].split('+');
    const aPercentage = ((a[1] / total) * 100).toFixed(1);
    const bPercentage = ((b[1] / total) * 100).toFixed(1);

    if (sortConfig.key === 'count') {
      return sortConfig.direction === 'desc' ? b[1] - a[1] : a[1] - b[1];
    }
    if (sortConfig.key === 'percentage') {
      return sortConfig.direction === 'desc' ? bPercentage - aPercentage : aPercentage - bPercentage;
    }
    if (sortConfig.key === 'pair') {
      const aName = `${t(`anchors.${a1}.name`)}+${t(`anchors.${a2}.name`)}`;
      const bName = `${t(`anchors.${b1}.name`)}+${t(`anchors.${b2}.name`)}`;
      return sortConfig.direction === 'desc' ? bName.localeCompare(aName) : aName.localeCompare(bName);
    }
    return 0;
  }).slice(0, showAll ? 20 : 10);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };



  if (Object.keys(data).length === 0) {
    return (
      <div className="glass rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">
          {t('stats.anchorPairs')}
        </h2>
        <div className="h-32 flex items-center justify-center text-slate-500">
          {t('stats.noData')}
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">
        {t('stats.anchorPairs')}
      </h2>
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full" aria-label={t('stats.anchorPairs')}>
          <thead>
            <tr className="border-b border-slate-700">
              <th scope="col" className="text-left py-3 px-2 text-xs sm:text-sm font-medium text-slate-400">#</th>
              <th
                scope="col"
                className="text-left py-3 px-2 text-xs sm:text-sm font-medium text-slate-400 cursor-pointer hover:text-slate-200"
                onClick={() => handleSort('pair')}
                aria-sort={sortConfig.key === 'pair' ? (sortConfig.direction === 'desc' ? 'descending' : 'ascending') : 'none'}
              >
                {t('stats.pair')} <SortIcon sortConfig={sortConfig} column="pair" />
              </th>
              <th
                scope="col"
                className="text-right py-3 px-2 text-xs sm:text-sm font-medium text-slate-400 cursor-pointer hover:text-slate-200"
                onClick={() => handleSort('count')}
                aria-sort={sortConfig.key === 'count' ? (sortConfig.direction === 'desc' ? 'descending' : 'ascending') : 'none'}
              >
                {t('stats.count')} <SortIcon sortConfig={sortConfig} column="count" />
              </th>
              <th
                scope="col"
                className="text-right py-3 pl-2 pr-4 text-xs sm:text-sm font-medium text-slate-400 cursor-pointer hover:text-slate-200"
                onClick={() => handleSort('percentage')}
                aria-sort={sortConfig.key === 'percentage' ? (sortConfig.direction === 'desc' ? 'descending' : 'ascending') : 'none'}
              >
                % <SortIcon sortConfig={sortConfig} column="percentage" />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPairs.map(([pair, count], index) => {
              const [a1, a2] = pair.split('+');
              const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
              return (
                <tr key={pair} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-2 px-2 text-xs sm:text-sm text-slate-500">{index + 1}</td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="flex items-center gap-1">
                        <span
                          className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: anchorColors[a1] }}
                          aria-hidden="true"
                        />
                        <span className="text-xs sm:text-sm text-slate-200 whitespace-nowrap">{t(`anchors.${a1}.name`)}</span>
                      </div>
                      <span className="text-slate-600 text-xs" aria-hidden="true">+</span>
                      <div className="flex items-center gap-1">
                        <span
                          className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: anchorColors[a2] }}
                          aria-hidden="true"
                        />
                        <span className="text-xs sm:text-sm text-slate-200 whitespace-nowrap">{t(`anchors.${a2}.name`)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-2 text-right text-xs sm:text-sm font-medium text-cyan-400 whitespace-nowrap">{count}</td>
                  <td className="py-2 pl-2 pr-4 text-right text-xs sm:text-sm text-slate-400 whitespace-nowrap">{percentage}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {Object.keys(data).length > 10 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          aria-expanded={showAll}
        >
          {showAll ? t('stats.showLess') : t('stats.showAll')}
        </button>
      )}
    </div>
  );
}
