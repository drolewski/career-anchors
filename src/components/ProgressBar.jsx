import { useLang } from '../lib/i18n.jsx';

export default function ProgressBar({ current, total, label }) {
  const { t } = useLang();
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-6" role="region" aria-label={label}>
      <div className="flex justify-between items-center mb-2">
        <span id="progress-label" className="text-sm text-slate-400 font-medium">{label}</span>
        <span className="text-sm font-semibold text-slate-300" aria-live="polite">
          {current}/{total}
        </span>
      </div>
      <div
        className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"
        role="progressbar"
        aria-labelledby="progress-label"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuetext={`${t('rating.progressAria')}: ${percent}%`}
      >
        <div
          className="h-full rounded-full progress-fill"
          style={{
            width: `${percent}%`,
            background: 'linear-gradient(90deg, #4F46E5 0%, #06B6D4 100%)',
          }}
        />
      </div>
    </div>
  );
}
