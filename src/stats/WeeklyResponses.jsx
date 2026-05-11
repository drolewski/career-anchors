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

export default function WeeklyResponses({ data }) {
  const { lang } = useLang();
  const t = (key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) val = val?.[k];
    return val || key;
  };

  const chartData = data.map(item => ({
    ...item,
    label: item.label,
  }));

  const chartDescription = data.map(item => `${item.label}: ${item.count} ${t('stats.responses')}`).join('. ');
  const totalResponses = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="glass rounded-xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">
        {t('stats.weeklyResponses')}
      </h2>
      <figure>
        <span className="sr-only">{chartDescription}</span>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }} role="img" aria-label={`${t('stats.weeklyResponses')}: ${chartDescription}. Total: ${totalResponses}`}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="label"
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickLine={{ stroke: '#334155' }}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickLine={{ stroke: '#334155' }}
                axisLine={{ stroke: '#334155' }}
                allowDecimals={false}
                width={35}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#E2E8F0',
                  fontSize: '14px',
                }}
                labelStyle={{ color: '#94A3B8', fontSize: '13px' }}
                cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                formatter={(value) => [
                  <span key="value" style={{ color: '#06B6D4', fontWeight: 600 }}>{value}</span>,
                  <span key="label" style={{ color: '#E2E8F0' }}>{t('stats.responses')}</span>,
                ]}
                labelFormatter={(label) => label}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.count > 0 ? '#818CF8' : '#475569'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <figcaption className="sr-only">{t('stats.weeklyResponses')}: {chartDescription}. Total: {totalResponses} {t('stats.responses')}</figcaption>
      </figure>
    </div>
  );
}
