import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useLang } from '../lib/i18n.jsx';
import { translations } from '../data/translations.js';
import { anchorOrder } from '../data/anchors.js';

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

export default function IndustryStats({ data }) {
  const { lang } = useLang();

  const getIndustryTranslation = (industryName) => {
    const industryTranslations = translations[lang]?.stats?.industryTranslations || {};
    const entries = Object.entries(industryTranslations);
    
    for (const [pl, en] of entries) {
      const normalizedPl = pl.toLowerCase().trim();
      const normalizedEn = en.toLowerCase().trim();
      const normalizedIndustry = industryName.toLowerCase().trim();
      
      if (normalizedIndustry === normalizedPl || 
          normalizedIndustry === normalizedEn ||
          normalizedPl.includes(normalizedIndustry) ||
          normalizedIndustry.includes(normalizedPl)) {
        return lang === 'en' ? en : pl;
      }
      
      const plBase = normalizedPl.split('/')[0].trim();
      const enBase = normalizedEn.split('/')[0].trim();
      if (normalizedIndustry === plBase || normalizedIndustry === enBase ||
          plBase === normalizedIndustry || enBase === normalizedIndustry) {
        return lang === 'en' ? en : pl;
      }
    }
    
    return industryName;
  };

  const industries = Object.keys(data).filter(ind => data[ind]?.total >= 3);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chartData = industries.map(industry => {
    const item = data[industry];
    const translatedIndustry = getIndustryTranslation(industry);

    const rawPercentages = {};
    anchorOrder.forEach(code => {
      rawPercentages[code] = item.total > 0 ? (item[code] / item.total) * 100 : 0;
    });

    const roundedPercentages = {};
    anchorOrder.forEach(code => {
      roundedPercentages[code] = Math.round(rawPercentages[code]);
    });

    const roundedSum = anchorOrder.reduce((sum, code) => sum + roundedPercentages[code], 0);
    if (roundedSum !== 100 && roundedSum > 0) {
      const diff = 100 - roundedSum;
      let maxCode = anchorOrder[0];
      let maxVal = -Infinity;
      anchorOrder.forEach(code => {
        if (rawPercentages[code] > maxVal) {
          maxVal = rawPercentages[code];
          maxCode = code;
        }
      });
      roundedPercentages[maxCode] += diff;
    }

    const row = {
      name: translatedIndustry,
      fullName: translatedIndustry,
      total: item.total,
      ...roundedPercentages,
    };
    return row;
  });

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">
          {lang === 'pl' ? 'Kotwice wg branży' : 'Anchors by Industry'}
        </h2>
        <div className="h-64 flex items-center justify-center text-slate-500">
          {lang === 'pl' ? 'Brak danych' : 'No data'}
        </div>
      </div>
    );
  }

  const totalResponses = chartData.reduce((sum, ind) => sum + ind.total, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const industryData = chartData.find(g => g.fullName === payload[0].payload.fullName);
      const anchorTranslations = translations[lang]?.anchors || {};
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl z-50 max-w-xs">
          <p className="font-semibold text-slate-100 mb-2">
            {payload[0].payload.fullName}
            <span className="text-slate-400 font-normal ml-1">({industryData?.total})</span>
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {anchorTranslations[entry.name]?.name || entry.name}: <span className="font-semibold">{entry.value}%</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass rounded-xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">
        {lang === 'pl' ? 'Kotwice wg branży' : 'Anchors by Industry'}
        <span className="text-slate-400 text-base ml-2">({totalResponses})</span>
      </h2>
      <figure>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              margin={{ top: 5, right: 5, left: isMobile ? 50 : 10, bottom: 5 }} 
              layout={isMobile ? 'vertical' : 'horizontal'}
              role="img" 
              aria-label={lang === 'pl' ? `Kotwice wg branży: ${chartData.map(i => i.fullName).join(', ')}` : `Anchors by industry: ${chartData.map(i => i.fullName).join(', ')}`}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              {isMobile ? (
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: '#94A3B8', fontSize: 8 }}
                  tickLine={{ stroke: '#334155' }}
                  axisLine={{ stroke: '#334155' }}
                  width={45}
                  tickFormatter={(val) => val.length > 7 ? val.substring(0, 7) + '…' : val}
                />
              ) : (
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#94A3B8', fontSize: 10 }}
                  tickLine={{ stroke: '#334155' }}
                  axisLine={{ stroke: '#334155' }}
                  interval={0}
                  tickFormatter={(val) => val.length > 12 ? val.substring(0, 12) + '…' : val}
                />
              )}
              {isMobile ? (
                <XAxis
                  type="number"
                  tick={{ fill: '#94A3B8', fontSize: 10 }}
                  tickLine={{ stroke: '#334155' }}
                  axisLine={{ stroke: '#334155' }}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
              ) : (
                <YAxis
                  tick={{ fill: '#94A3B8', fontSize: 11 }}
                  tickLine={{ stroke: '#334155' }}
                  axisLine={{ stroke: '#334155' }}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                  width={40}
                />
              )}
              <Tooltip content={<CustomTooltip />} />
              {isMobile ? null : (
                <Legend
                  wrapperStyle={{ fontSize: '10px', lineHeight: '16px', paddingTop: '10px' }}
                  formatter={(value) => <span style={{ color: '#94A3B8' }}>{translations[lang]?.anchors?.[value]?.name || value}</span>}
                />
              )}
              {anchorOrder.map(code => (
                <Bar key={code} dataKey={code} fill={anchorColors[code]} stackId="stack" />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <figcaption className="mt-4 text-xs text-slate-500 text-center">
          {lang === 'pl' ? 'Pokazuje branże z min. 3 odpowiedziami' : 'Showing industries with at least 3 responses'}
        </figcaption>
      </figure>
    </div>
  );
}