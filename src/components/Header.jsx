import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { useLang } from '../lib/i18n.jsx';

export default function Header() {
  const location = useLocation();
  const { t, lang } = useLang();
  const isStats = location.pathname === '/stats';
  const isSurvey = location.pathname === '/';

  return (
    <header className="flex items-center justify-between mb-8" role="banner">
      <nav aria-label={t('nav.mainNav')}>
        <div className="flex items-center gap-4">
          {isSurvey && (
            <Link
              to="/stats"
              className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
              aria-label={t('stats.nav')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>{t('stats.nav')}</span>
            </Link>
          )}
          {isStats && (
            <Link
              to="/"
              className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
              aria-label={t('stats.survey')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{t('stats.survey')}</span>
            </Link>
          )}
        </div>
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
