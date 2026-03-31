import { useState } from 'react';
import { motion } from 'framer-motion';
import { getGeneration } from '../lib/calculations.js';
import { useLang } from '../lib/i18n.jsx';
import { translations } from '../data/translations.js';

export default function DemographicsStep({ data, onNext }) {
  const { t, lang } = useLang();
  const [form, setForm] = useState({
    birthYear: data.birthYear || '',
    position: data.position || '',
    branch: data.branch || '',
    industry: data.industry || '',
    freeText: data.freeText || '',
  });

  const generation = form.birthYear ? getGeneration(parseInt(form.birthYear), lang) : null;
  const isValid = form.birthYear && form.position && form.branch && form.industry;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onNext({ ...form, generation });
    }
  };

  const allT = translations[lang] || translations.en;
  const positions = allT.positions || [];
  const branches = allT.branches || [];
  const industries = allT.industries || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          <span className="gradient-text">{t('app.title')}</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto">
          {t('app.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">
              1
            </span>
            {t('demographics.personalInfo')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                {t('demographics.yearOfBirth')}
              </label>
              <select
                value={form.birthYear}
                onChange={(e) => setForm({ ...form, birthYear: e.target.value })}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
              >
                <option value="">{t('demographics.yearPlaceholder')}</option>
                {Array.from({ length: 2012 - 1946 + 1 }, (_, i) => 2012 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {generation && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-cyan-400 mt-1.5 flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('demographics.generation')}: {generation}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                {t('demographics.currentPosition')}
              </label>
              <select
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
              >
                <option value="">{t('demographics.selectPosition')}</option>
                {(Array.isArray(positions) ? positions : []).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                {t('demographics.branchDept')}
              </label>
              <select
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
              >
                <option value="">{t('demographics.selectBranch')}</option>
                {(Array.isArray(branches) ? branches : []).map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                {t('demographics.industry')}
              </label>
              <select
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
              >
                <option value="">{t('demographics.selectIndustry')}</option>
                {(Array.isArray(industries) ? industries : []).map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm">
              2
            </span>
            {t('demographics.additionalThoughts')}
            <span className="text-xs text-slate-500 font-normal">{t('demographics.optional')}</span>
          </h2>
          <textarea
            value={form.freeText}
            onChange={(e) => {
              if (e.target.value.length <= 300) {
                setForm({ ...form, freeText: e.target.value });
              }
            }}
            placeholder={t('demographics.freeTextPlaceholder')}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none h-28"
          />
          <p className="text-xs text-slate-500 mt-1.5 text-right">
            {form.freeText.length}/300
          </p>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 active:translate-y-0"
        >
          {t('demographics.startTest')}
          <svg className="inline-block w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </form>
    </motion.div>
  );
}
