import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0]) {
    const item = payload[0].payload;
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl z-50">
        <p style={{ color: anchorColors[item.code] }} className="text-sm font-medium">
          {item.name}
        </p>
        <p className="text-sm">
          <span style={{ color: '#06B6D4', fontWeight: 600 }}>{item.count}</span>
          <span style={{ color: '#94A3B8' }}> ({item.percentage.toFixed(1)}%)</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function Top3Anchors({ data, total }) {
  const { lang } = useLang();
  const t = (key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) val = val?.[k];
    return val || key;
  };

  const chartData = anchorOrder.map(code => ({
    name: t(`anchors.${code}.name`),
    code,
    count: data[code] || 0,
    percentage: total > 0 ? ((data[code] || 0) / total) * 100 : 0,
  }));

  const sortedByCount = [...chartData].sort((a, b) => b.count - a.count);
  const mostFrequent = sortedByCount[0];
  const leastFrequent = sortedByCount[sortedByCount.length - 1];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hasData = Object.values(data).some(v => v > 0);

  if (!hasData) {
    return (
      <div className="glass rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">
          {t('stats.top3Anchors')}
        </h2>
        <div className="h-48 flex items-center justify-center text-slate-500">
          {t('stats.noData')}
        </div>
      </div>
    );
  }



  const chartContent = (
    <BarChart data={chartData} margin={{ top: 5, right: 5, left: isMobile ? 50 : 10, bottom: 5 }} layout={isMobile ? 'vertical' : 'horizontal'}>
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
      {isMobile ? (
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: '#94A3B8', fontSize: 8 }}
          tickLine={{ stroke: '#334155' }}
          axisLine={{ stroke: '#334155' }}
          width={45}
        />
      ) : (
        <XAxis
          dataKey="name"
          tick={{ fill: '#94A3B8', fontSize: 10 }}
          tickLine={{ stroke: '#334155' }}
          axisLine={{ stroke: '#334155' }}
          interval={0}
          tickFormatter={(val) => val.length > 14 ? val.substring(0, 14) + '…' : val}
        />
      )}
      {isMobile ? (
        <XAxis
          type="number"
          tick={{ fill: '#94A3B8', fontSize: 10 }}
          tickLine={{ stroke: '#334155' }}
          axisLine={{ stroke: '#334155' }}
          allowDecimals={false}
        />
      ) : (
        <YAxis
          tick={{ fill: '#94A3B8', fontSize: 11 }}
          tickLine={{ stroke: '#334155' }}
          axisLine={{ stroke: '#334155' }}
          allowDecimals={false}
          width={35}
        />
      )}
      <Tooltip content={<CustomTooltip  />} />
      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={anchorColors[entry.code]} />
        ))}
      </Bar>
    </BarChart>
  );

  return (
    <div className="glass rounded-xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">
        {t('stats.top3Anchors')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6" role="group" aria-label={t('stats.top3Anchors')}>
        <div className="bg-slate-800/50 rounded-lg p-4 border border-emerald-500/30">
          <p className="text-xs text-slate-400 mb-1" id="most-frequent-label">{t('stats.mostFrequent')}</p>
          <div className="flex items-center gap-2" role="status" aria-labelledby="most-frequent-label">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: anchorColors[mostFrequent.code] }}
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-emerald-400 truncate">{mostFrequent.name}</p>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {mostFrequent.count} ({mostFrequent.percentage.toFixed(1)}%)
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
          <p className="text-xs text-slate-400 mb-1">{t('stats.totalTop3')}</p>
          <p className="text-2xl font-bold text-slate-100" role="status" aria-live="polite">{total}</p>
          <p className="text-xs text-slate-500">{t('stats.top3Hint')}</p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-red-500/30">
          <p className="text-xs text-slate-400 mb-1" id="least-frequent-label">{t('stats.leastFrequent')}</p>
          <div className="flex items-center gap-2" role="status" aria-labelledby="least-frequent-label">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: anchorColors[leastFrequent.code] }}
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-red-400 truncate">{leastFrequent.name}</p>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {leastFrequent.count} ({leastFrequent.percentage.toFixed(1)}%)
          </p>
        </div>
      </div>

      <figure>
        <span className="sr-only">{chartData.map(item => `${item.name}: ${item.count} (${item.percentage.toFixed(1)}%)`).join(', ')}</span>
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            {chartContent}
          </ResponsiveContainer>
        </div>
        <figcaption className="sr-only">{t('stats.top3Anchors')}: {chartData.map(item => `${item.name}: ${item.count}`).join(', ')}</figcaption>
      </figure>
    </div>
  );
}
