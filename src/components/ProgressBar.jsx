export default function ProgressBar({ current, total, label }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-400 font-medium">{label}</span>
        <span className="text-sm font-semibold text-slate-300">
          {current}/{total}
        </span>
      </div>
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
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
