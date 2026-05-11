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
import { TwoLineTick } from './CustomTicks.jsx';

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
  const t = (key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) val = val?.[k];
    return val || key;
  };

  const industries = Object.keys(data).filter(ind => data[ind]?.total >= 3);

  const chartData = industries.map(industry => {
    const item = data[industry];

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
      name: industry,
      fullName: industry,
      total: item.total,
      ...roundedPercentages,
    };
    return row;
  });

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">
          {t('stats.anchorsByIndustry')}
        </h2>
        <div className="h-64 flex items-center justify-center text-slate-500">
          {t('stats.industryHint')}
        </div>
      </div>
    );
  }

  const totalResponses = chartData.reduce((sum, ind) => sum + ind.total, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const industryData = chartData.find(g => g.fullName === payload[0].payload.fullName);
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl z-50 max-w-xs">
          <p className="font-semibold text-slate-100 mb-2">
            {payload[0].payload.fullName}
            <span className="text-slate-400 font-normal ml-1">({industryData?.total})</span>
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

  return (
    <div className="glass rounded-xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">
        {t('stats.anchorsByIndustry')}
        <span className="text-slate-400 text-base ml-2">({totalResponses})</span>
      </h2>
      <div className="h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="name"
              tick={<TwoLineTick fontSize={10} />}
              tickLine={{ stroke: '#334155' }}
              axisLine={{ stroke: '#334155' }}
              interval={0}
            />
            <YAxis
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              tickLine={{ stroke: '#334155' }}
              axisLine={{ stroke: '#334155' }}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '13px', paddingTop: '12px', lineHeight: '20px' }}
              formatter={(value) => <span style={{ color: '#94A3B8' }}>{t(`anchors.${value}.name`)}</span>}
            />
            {anchorOrder.map(code => (
              <Bar key={code} dataKey={code} fill={anchorColors[code]} stackId="stack" />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
