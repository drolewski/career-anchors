import { useState, useEffect } from 'react';
import { LanguageProvider } from './lib/i18n.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import StepIndicator from './components/StepIndicator.jsx';
import DemographicsStep from './steps/DemographicsStep.jsx';
import RatingStep from './steps/RatingStep.jsx';
import Top3Step from './steps/Top3Step.jsx';
import ResultsStep from './steps/ResultsStep.jsx';
import { useLang } from './lib/i18n.jsx';

function AppContent() {
  const [step, setStep] = useState(1);
  const [demographics, setDemographics] = useState({});
  const [ratings, setRatings] = useState({});
  const [top3, setTop3] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const { t } = useLang();

  const handleDemographics = (data) => {
    setDemographics(data);
    setStartTime(Date.now());
    setStep(2);
  };

  const handleRatings = (data) => {
    setRatings(data);
    setStep(3);
  };

  const handleTop3 = (data) => {
    setTop3(data);
    setStep(4);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <LanguageSwitcher />
      <div className="max-w-3xl mx-auto">
        <StepIndicator current={step} />

        {step === 1 && (
          <DemographicsStep data={demographics} onNext={handleDemographics} />
        )}

        {step === 2 && (
          <RatingStep ratings={ratings} onNext={handleRatings} />
        )}

        {step === 3 && (
          <Top3Step ratings={ratings} onNext={handleTop3} />
        )}

        {step === 4 && (
          <ResultsStep
            demographics={demographics}
            ratings={ratings}
            top3={top3}
            startTime={startTime}
          />
        )}

        <footer className="text-center mt-12 mb-6 text-xs text-slate-600 space-y-1">
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
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
