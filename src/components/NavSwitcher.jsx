import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function NavSwitcher({ isStats, isAbout }) {
  const { t, lang, switchLang } = useLang();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLangSwitch = (newLang) => {
    switchLang(newLang);
    window.location.href = window.location.pathname;
    setIsOpen(false);
  };

  const navItems = [
    { path: '/', label: t('nav.survey'), icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )},
    { path: '/stats', label: t('nav.stats'), icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
    { path: '/about', label: t('nav.about'), icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ];

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2" ref={dropdownRef}>
      {/* Web: horizontal buttons */}
      <div className="hidden sm:flex items-center gap-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            className={`glass rounded-xl px-4 py-2.5 text-sm transition-all duration-200 flex items-center gap-2 ${
              (item.path === '/' && !isStats && !isAbout) || (item.path === '/stats' && isStats) || (item.path === '/about' && isAbout)
                ? 'text-cyan-400 bg-slate-800/80'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80'
            }`}
            aria-label={item.label}
            aria-current={item.path === '/' && !isStats && !isAbout ? 'page' : undefined}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile: hamburger menu */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="glass rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80 transition-all duration-200 flex items-center gap-2"
          aria-label="Menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {isOpen && (
          <div
            id="mobile-menu"
            className="absolute top-full left-0 mt-2 glass rounded-xl py-2 min-w-[200px] shadow-xl"
            role="menu"
          >
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`w-full px-4 py-3 text-left text-sm transition-colors duration-150 flex items-center gap-3 ${
                  (item.path === '/' && !isStats && !isAbout) || (item.path === '/stats' && isStats) || (item.path === '/about' && isAbout)
                    ? 'text-cyan-400 bg-slate-800/50'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
                }`}
                role="menuitem"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            <div className="border-t border-slate-700 my-2" role="separator" />
            <div className="px-4 py-2">
              <p className="text-xs text-slate-500 mb-2">{lang === 'pl' ? 'Wybierz język' : 'Select language'}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLangSwitch('pl')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    lang === 'pl'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                  aria-label="Polski"
                  aria-pressed={lang === 'pl'}
                >
                  <PLFlag />
                  <span>PL</span>
                </button>
                <button
                  onClick={() => handleLangSwitch('en')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    lang === 'en'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                  aria-label="English"
                  aria-pressed={lang === 'en'}
                >
                  <GBFlag />
                  <span>EN</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}