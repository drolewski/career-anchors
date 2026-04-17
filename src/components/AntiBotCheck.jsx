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
    <div className="glass rounded-xl p-4 mb-4">
      <p className="text-sm text-slate-400 mb-2">{t('app.verification')}</p>
      <div className="flex items-center gap-2">
        <span className="text-slate-200 font-medium">{num1} + {num2} = </span>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          className={`w-20 bg-slate-800 border rounded-lg px-3 py-2 text-slate-200 text-center focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-indigo-500'
          }`}
          placeholder="?"
        />
        <button
          onClick={checkAnswer}
          className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-600 transition-colors"
        >
          {t('app.check')}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mt-2">{t('app.wrongAnswer')}</p>}
    </div>
  );
}