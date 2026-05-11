import { useState } from 'react';
import {useLang} from "../lib/i18n.jsx";

export default function AntiBotCheck({ onVerified }) {
  const [num1] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [num2] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const { t } = useLang();

  const checkAnswer = () => {
    if (parseInt(answer) === num1 + num2) {
      onVerified();
    } else {
      setError(true);
      setAnswer('');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="glass rounded-xl p-4 mb-4" role="region" aria-label={t('app.verification')}>
      <p className="text-sm text-slate-400 mb-2" id="antobot-label">{t('app.verification')}</p>
      <div className="flex items-center gap-2">
        <span className="text-slate-200 font-medium" aria-hidden="true">{num1} + {num2} = </span>
        <label htmlFor="antobot-answer" className="sr-only">{t('app.verification')}</label>
        <input
          id="antobot-answer"
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          className={`w-20 bg-slate-800 border rounded-lg px-3 py-2 text-slate-200 text-center focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-indigo-500'
          }`}
          placeholder="?"
          aria-describedby="antobot-error"
          aria-invalid={error}
        />
        <button
          onClick={checkAnswer}
          className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-600 transition-colors"
          aria-describedby="antobot-error"
        >
          {t('app.check')}
        </button>
      </div>
      {error && (
        <p id="antobot-error" className="text-red-400 text-xs mt-2" role="alert" aria-live="assertive">
          {t('app.wrongAnswer')}
        </p>
      )}
    </div>
  );
}