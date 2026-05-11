import { useLang } from '../lib/i18n.jsx';

function GBFlag() {
  return (
    <svg viewBox="0 0 60 40" className="w-6 h-4 rounded-sm overflow-hidden shadow-sm" role="img" aria-label="United Kingdom flag">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function PLFlag() {
  return (
    <svg viewBox="0 0 60 40" className="w-6 h-4 rounded-sm overflow-hidden shadow-sm" role="img" aria-label="Poland flag">
      <rect width="60" height="20" fill="#fff" />
      <rect y="20" width="60" height="20" fill="#DC143C" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const { lang, switchLang } = useLang();

  const handleSwitch = (newLang) => {
    switchLang(newLang);
    window.location.href = window.location.pathname;
  };

  return (
    <div className="glass rounded-xl p-1 flex gap-1" role="group" aria-label={lang === 'pl' ? 'Wybierz język' : 'Select language'}>
      <button
        onClick={() => handleSwitch('pl')}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
          lang === 'pl'
            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
        }`}
        aria-label="Polski"
        aria-pressed={lang === 'pl'}
      >
        <PLFlag />
        <span className="hidden sm:inline">PL</span>
      </button>
      <button
        onClick={() => handleSwitch('en')}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
          lang === 'en'
            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
        }`}
        aria-label="English"
        aria-pressed={lang === 'en'}
      >
        <GBFlag />
        <span className="hidden sm:inline">EN</span>
      </button>
    </div>
  );
}
