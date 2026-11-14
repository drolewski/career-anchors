import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './lib/i18n.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import Header from './components/Header.jsx';
import StepIndicator from './components/StepIndicator.jsx';
import DemographicsStep from './steps/DemographicsStep.jsx';
import RatingStep from './steps/RatingStep.jsx';
import Top3Step from './steps/Top3Step.jsx';
import ResultsStep from './steps/ResultsStep.jsx';
import StatsPage from './stats/StatsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LanguageRedirect from './pages/LanguageRedirect.jsx';
import { useLang } from './lib/i18n.jsx';
import { useLocalStorage, SESSION_KEYS } from './lib/useSessionStorage.js';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function AppContent() {
  const [demographics, setDemographics, removeDemographics] = useLocalStorage(SESSION_KEYS.DEMOGRAPHICS, {});
  const [ratings, setRatings, removeRatings] = useLocalStorage(SESSION_KEYS.RATINGS, {});
  const [top3, setTop3, removeTop3] = useLocalStorage(SESSION_KEYS.TOP3, []);
  const [savedStep, setSavedStep] = useLocalStorage(SESSION_KEYS.STEP, null);
  const [previousResult] = useLocalStorage(SESSION_KEYS.PREVIOUS_RESULT, null);
  const [wantsRetake, setWantsRetake] = useState(false);
  const [step, setStep] = useState(() => savedStep > 1 && savedStep < 4 ? savedStep : 1);
  const [top3Ratings, setTop3Ratings] = useState({});
  const [startTime, setStartTime] = useState(null);
  
  const { t, lang } = useLang();

  const clearAllSession = () => {
    removeDemographics();
    removeRatings();
    removeTop3();
    setSavedStep(null);
    localStorage.removeItem(SESSION_KEYS.PREVIOUS_RESULT);
    localStorage.removeItem('already_submitted');
    setStep(1);
    setWantsRetake(false);
  };

  const skipToMain = () => {
    const main = document.getElementById('main-content');
    if (main) {
      main.focus();
      main.scrollIntoView();
    }
  };

  const handleDemographics = (data) => {
    setDemographics(data);
    setStartTime(Date.now());
    setSavedStep(2);
    setStep(2);
  };

  const handleRatings = (data) => {
    setRatings(data);
    setSavedStep(3);
    setStep(3);
  };

  const handleTop3 = (data, allRatings) => {
    setTop3(data);
    setTop3Ratings(allRatings);
    setSavedStep(4);
    setStep(4);
  };

  const handleResultsComplete = (result) => {
    localStorage.setItem(SESSION_KEYS.PREVIOUS_RESULT, JSON.stringify(result));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const hasCompletedSurvey = previousResult && !wantsRetake;
  const hasSavedProgress = savedStep === 4 && !wantsRetake && demographics && ratings && top3 && top3.length > 0;

  if (hasCompletedSurvey || hasSavedProgress) {
    const resultData = previousResult || { demographics, ratings, top3, startTime };
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
          onClick={skipToMain}
        >
          {t('accessibility.skipToMain')}
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="max-w-3xl mx-auto focus:outline-none">
          <ResultsStep
            demographics={resultData.demographics}
            ratings={resultData.ratings}
            top3={resultData.top3}
            startTime={resultData.startTime}
            isPreviousResult={true}
            onRetake={clearAllSession}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
        onClick={skipToMain}
      >
        {t('accessibility.skipToMain')}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="max-w-3xl mx-auto focus:outline-none">
        <StepIndicator current={step} />

        {step === 1 && (
          <DemographicsStep data={demographics} onNext={handleDemographics} />
        )}

        {step === 2 && (
          <RatingStep ratings={ratings} onNext={handleRatings} />
        )}

        {step === 3 && (
          <Top3Step ratings={ratings} onNext={(sel) => handleTop3(sel, ratings)} />
        )}

        {step === 4 && (
          <ResultsStep
            demographics={demographics}
            ratings={top3Ratings}
            top3={top3}
            startTime={startTime}
            isPreviousResult={false}
            onComplete={handleResultsComplete}
          />
        )}

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
          <p>
            <a
              href="/docs/analiza-zetki.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-400 transition-colors underline underline-offset-2"
            >
              {t('research.footerLink')}
            </a>
          </p>
          <p>
            <a
              href="/privacy"
              target="_self"
              className="text-slate-600 hover:text-indigo-400 transition-colors underline underline-offset-2"
            >
              {lang === 'pl' ? 'Polityka prywatności' : 'Privacy Policy'}
            </a>
            {' · '}
            <a
              href="/terms"
              target="_self"
              className="text-slate-600 hover:text-indigo-400 transition-colors underline underline-offset-2"
            >
              {lang === 'pl' ? 'Regulamin' : 'Terms of Service'}
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            <Route path="/en/*" element={<LanguageRedirect />} />
            <Route path="/pl/*" element={<LanguageRedirect />} />
            <Route path="/" element={<AppContent />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Analytics/>
          <SpeedInsights/>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;