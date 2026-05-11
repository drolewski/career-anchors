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

export default function GenerationStats({ data }) {
  const { lang } = useLang();
  const t = (key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) val = val?.[k];
    return val || key;
  };

  const generationOrder = ['genZ', 'genY', 'genX', 'boomers', 'genAlpha', 'silent'];

  const chartData = generationOrder
    .filter(gen => data[gen])
    .map(gen => {
      const item = data[gen];
      const rawPercentages = {};
      let rawSum = 0;
      anchorOrder.forEach(code => {
        rawPercentages[code] = item.total > 0 ? (item[code] / item.total) * 100 : 0;
        rawSum += rawPercentages[code];
      });

      const roundedPercentages = {};
      anchorOrder.forEach(code => {
        roundedPercentages[code] = Math.round(rawPercentages[code]);
      });

      const roundedSum = anchorOrder.reduce((sum, code) => sum + roundedPercentages[code], 0);
      if (roundedSum !== 100 && rawSum > 0) {
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
        name: t(`generations.${gen}`),
        fullName: t(`generations.${gen}`),
        total: item.total,
        ...roundedPercentages,
      };
      return row;
    });

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">
          {t('stats.anchorsByGeneration')}
        </h2>
        <div className="h-64 flex items-center justify-center text-slate-500">
          {t('stats.noData')}
        </div>
      </div>
    );
  }

  const totalResponses = chartData.reduce((sum, gen) => sum + gen.total, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const genData = chartData.find(g => g.fullName === payload[0].payload.name);
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl z-50">
          <p className="font-semibold text-slate-100 mb-2">
            {payload[0].payload.name}
            <span className="text-slate-400 font-normal ml-1">({genData?.total})</span>
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {t(`anchors.${entry.name}.name`)}: <span className="font-semibold">{entry.value}%</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const chartDescription = chartData.map(gen => 
    `${gen.name}: ${totalResponses > 0 ? Object.entries(gen)
      .filter(([k]) => anchorOrder.includes(k))
      .map(([k, v]) => `${t(`anchors.${k}.name`)} ${v}%`)
      .join(', ') : 'No data'}`).join('. ');

  return (
    <div className="glass rounded-xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">
        {t('stats.anchorsByGeneration')}
        <span className="text-slate-400 text-base ml-2">({totalResponses})</span>
      </h2>
      <figure>
        <span className="sr-only">{chartDescription}</span>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }} role="img" aria-label={t('stats.anchorsByGeneration') + ': ' + chartDescription}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickLine={{ stroke: '#334155' }}
                axisLine={{ stroke: '#334155' }}
                interval={0}
              />
              <YAxis
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickLine={{ stroke: '#334155' }}
                axisLine={{ stroke: '#334155' }}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '10px', lineHeight: '16px', paddingTop: '10px' }}
                formatter={(value) => <span style={{ color: '#94A3B8' }}>{t(`anchors.${value}.name`)}</span>}
              />
              {anchorOrder.map(code => (
                <Bar key={code} dataKey={code} fill={anchorColors[code]} stackId="stack" />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <figcaption className="mt-4 text-xs text-slate-500 text-center">
          {t('stats.generationHint')}
        </figcaption>
      </figure>
    </div>
  );
}
