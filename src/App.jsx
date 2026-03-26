import { useState } from 'react';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRatings = (data) => {
    setRatings(data);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTop3 = (data) => {
    setTop3(data);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

        <footer className="text-center mt-12 text-xs text-slate-600">
          <p>{t('app.footer')}</p>
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
