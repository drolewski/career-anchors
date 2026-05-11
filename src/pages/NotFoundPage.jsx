import { useLang } from '../lib/i18n.jsx';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  const { t, lang } = useLang();
  const isPl = lang === 'pl';

  const content = isPl ? {
    title: '404',
    subtitle: 'Strona nie została znaleziona',
    description: 'Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.',
    goHome: 'Wróć do strony głównej',
    goStats: 'Zobacz statystyki',
  } : {
    title: '404',
    subtitle: 'Page not found',
    description: 'Sorry, but the page you are looking for does not exist or has been moved.',
    goHome: 'Go to homepage',
    goStats: 'View statistics',
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <svg 
            className="w-32 h-32 mx-auto text-slate-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        <h1 className="text-8xl sm:text-9xl font-bold gradient-text mb-4">
          {content.title}
        </h1>
        
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-200 mb-4">
          {content.subtitle}
        </h2>
        
        <p className="text-slate-400 mb-8">
          {content.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-indigo-500/25"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {content.goHome}
          </Link>
          
          <Link
            to="/stats"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-slate-600 text-slate-300 hover:border-indigo-500 hover:text-indigo-400"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {content.goStats}
          </Link>
        </div>
        
        <p className="text-sm text-slate-500">
          {content.helpText}
        </p>


        <footer className="text-center mt-12 mb-6 text-xs text-slate-600 space-y-2">
          <p>{t('app.footer')}</p>
          <p>
            {t('app.created')}
            <a
                href="https://www.linkedin.com/in/dominik-rolewski-01bba9155/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-indigo-400 transition-colors underline underline-offset-2"
            >
              Dominik Rolewski
            </a>
          </p>
          <p>
            <a
                href="/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-indigo-400 transition-colors underline underline-offset-2"
            >
              {lang === 'pl' ? 'Dowiedz się więcej o Kotwicach Kariery' : 'Learn more about Career Anchors'}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}