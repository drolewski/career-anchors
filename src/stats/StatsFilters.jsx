import { useState } from 'react';
import { useLang } from '../lib/i18n.jsx';
import { translations } from '../data/translations.js';

const generationOptions = ['genZ', 'genY', 'genX', 'boomers', 'genAlpha', 'silent'];
const industryOptions = [
  'Technologia / Oprogramowanie',
  'Finanse / Bankowość',
  'Ochrona zdrowia / Farmacja',
  'Produkcja',
  'Handel / E-commerce',
  'Konsulting',
  'Media / Rozrywka',
  'Edukacja',
  'Administracja publiczna',
  'Sektor pozarządowy',
  'Energia',
  'Budowlana',
  'Emeryt/ka / Renkcist/ka',
  'Inne',
];
const positionOptions = [
  'Młodszy/a specjalista/ka',
  'Specjalista/ka',
  'Starszy/a specjalista/ka',
  'Lider/ka zespołu',
  'Menedżer/ka',
  'Starszy/a menedżer/ka',
  'Dyrektor/ka',
  'VP / C-Level',
  'Konsultant/ka',
  'Freelancer/ka',
  'Student/ka',
  'Emeryt/ka / Renkcist/ka',
  'Inne',
];

export default function StatsFilters({ filters, onChange }) {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const allT = translations[lang] || translations.en;
  
  const t = (key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) val = val?.[k];
    return val || key;
  };

  const translatePosition = (pos) => {
    return allT.positionTranslations?.[pos] || pos;
  };

  const translateIndustry = (ind) => {
    return allT.industryTranslations?.[ind] || ind;
  };

  const toggleFilter = (type, value) => {
    const current = filters[type] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onChange({ ...filters, [type]: updated });
  };

  const clearAll = () => {
    onChange({
      generations: [],
      industries: [],
      positions: [],
      dateFrom: null,
      dateTo: null,
    });
  };

  const hasFilters =
    filters.generations.length > 0 ||
    filters.industries.length > 0 ||
    filters.positions.length > 0 ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="glass rounded-xl">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 sm:p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-100">
            {t('stats.filters')}
          </h2>
          {hasFilters && (
            <span className="px-2 py-0.5 bg-indigo-500/30 text-indigo-300 text-xs rounded-full">
              {(filters.generations.length || 0) + (filters.industries.length || 0) + (filters.positions.length || 0)}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform sm:hidden ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`${isOpen ? 'block' : 'hidden sm:block'} p-3 sm:p-4 border-t border-slate-700/50`}>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="mb-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {t('stats.clearFilters')}
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-400 mb-2 block">
              {t('stats.generation')}
            </label>
            <div className="flex flex-wrap gap-1">
              {generationOptions.map(gen => (
                <button
                  key={gen}
                  onClick={() => toggleFilter('generations', gen)}
                  className={`px-2 py-1 rounded text-xs transition-all ${
                    filters.generations.includes(gen)
                      ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500'
                      : 'bg-slate-700/50 text-slate-400 border border-slate-600 hover:border-slate-500'
                  }`}
                >
                  {t(`generations.${gen}`)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-2 block">
              {t('stats.industry')}
            </label>
            <div className="flex flex-wrap gap-1">
              {industryOptions.map(ind => (
                <button
                  key={ind}
                  onClick={() => toggleFilter('industries', ind)}
                  className={`px-2 py-1 rounded text-xs transition-all ${
                    filters.industries.includes(ind)
                      ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500'
                      : 'bg-slate-700/50 text-slate-400 border border-slate-600 hover:border-slate-500'
                  }`}
                >
                  {translateIndustry(ind)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-2 block">
              {t('stats.position')}
            </label>
            <div className="flex flex-wrap gap-1">
              {positionOptions.map(pos => (
                <button
                  key={pos}
                  onClick={() => toggleFilter('positions', pos)}
                  className={`px-2 py-1 rounded text-xs transition-all ${
                    filters.positions.includes(pos)
                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500'
                      : 'bg-slate-700/50 text-slate-400 border border-slate-600 hover:border-slate-500'
                  }`}
                >
                  {translatePosition(pos)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
