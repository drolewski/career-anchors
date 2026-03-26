import { useLang } from '../lib/i18n.jsx';

export default function RatingButton({ value, selected, onClick }) {
  const { t } = useLang();
  const labels = t('rating.labels');

  return (
    <button
      onClick={() => onClick(value)}
      className={`rating-btn w-12 h-12 sm:w-14 sm:h-14 rounded-xl font-bold text-lg flex flex-col items-center justify-center border transition-all duration-200 ${
        selected
          ? 'selected border-transparent'
          : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-indigo-500/50 hover:text-slate-200'
      }`}
      title={labels?.[value] || value}
    >
      <span>{value}</span>
      <span className="text-[9px] font-normal leading-tight opacity-70 hidden sm:block">
        {labels?.[value] || value}
      </span>
    </button>
  );
}
