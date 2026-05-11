import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations.js';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('schein-lang') || 'pl';
  });

  const switchLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('schein-lang', newLang);
  };

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setReloadKey(k => k + 1);
  }, [lang]);

  const t = (path, params = {}) => {
    const keys = path.split('.');
    let result = translations[lang];
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        return path;
      }
    }
    if (typeof result === 'string' && Object.keys(params).length > 0) {
      return Object.entries(params).reduce(
        (str, [k, v]) => str.replace(`{${k}}`, v),
        result
      );
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t, reloadKey }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
