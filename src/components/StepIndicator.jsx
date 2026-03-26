import { useLang } from '../lib/i18n.jsx';

export default function StepIndicator({ current }) {
  const { t } = useLang();

  const steps = [
    { num: 1, label: t('steps.aboutYou') },
    { num: 2, label: t('steps.rateSentences') },
    { num: 3, label: t('steps.top3') },
    { num: 4, label: t('steps.results') },
  ];

  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step.num === current
                  ? 'step-active text-white'
                  : step.num < current
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
              }`}
            >
              {step.num < current ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.num
              )}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${
              step.num === current ? 'text-slate-200' : 'text-slate-500'
            }`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 sm:w-16 h-0.5 rounded-full mt-[-16px] sm:mt-0 ${
              step.num < current ? 'bg-cyan-500/40' : 'bg-slate-800'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
