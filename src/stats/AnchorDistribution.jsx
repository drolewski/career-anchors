import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { useLang } from '../lib/i18n.jsx';
import { translations } from '../data/translations.js';
import { anchorOrder } from '../data/anchors.js';

export default function AnchorDistribution({ title, data, total, colors }) {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState(null);

  const t = (key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) val = val?.[k];
    return val || key;
  };

  const chartData = anchorOrder
    .filter(code => data[code] > 0)
    .map(code => ({
      name: t(`anchors.${code}.name`),
      value: data[code] || 0,
      color: colors[code],
    }));

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">{title}</h2>
        <div className="h-48 sm:h-64 flex items-center justify-center text-slate-500">
          {t('stats.noData')}
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length && payload[0]) {
      const percentage = total > 0 ? Math.round((payload[0].value / total) * 100) : 0;
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl z-50">
          <p style={{ color: payload[0].payload.color }} className="text-sm font-medium">
            {payload[0].name}
          </p>
          <p className="text-sm">
            <span style={{ color: '#06B6D4', fontWeight: 600 }}>{payload[0].value}</span>
            <span style={{ color: '#94A3B8' }}> ({percentage}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass rounded-xl p-4 sm:p-6 h-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">{title}</h2>
      <div className="relative h-64 sm:h-72 z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{ opacity: activeIndex === null || activeIndex === index ? 1 : 0.5 }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '10px', lineHeight: '16px' }}
              formatter={(value) => <span style={{ color: '#94A3B8' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
