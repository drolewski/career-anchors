import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLang } from '../lib/i18n.jsx';

export default function LanguageRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { switchLang } = useLang();

  useEffect(() => {
    const path = location.pathname;
    const isEn = path.startsWith('/en');
    const isPl = path.startsWith('/pl');

    if (isEn) {
      switchLang('en');
      const newPath = path.replace(/^\/en/, '') || '/';
      navigate(newPath, { replace: true });
    } else if (isPl) {
      switchLang('pl');
      const newPath = path.replace(/^\/pl/, '') || '/';
      navigate(newPath, { replace: true });
    }
  }, [location.pathname, switchLang, navigate]);

  return null;
}