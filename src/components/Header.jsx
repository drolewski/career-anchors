import { useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import NavSwitcher from './NavSwitcher.jsx';

export default function Header() {
  const location = useLocation();
  const isStats = location.pathname === '/stats';
  const isAbout = location.pathname === '/about';

  return (
    <>
      <NavSwitcher isStats={isStats} isAbout={isAbout} />
      <div className="fixed top-4 right-4 z-50 hidden sm:block">
        <LanguageSwitcher />
      </div>
    </>
  );
}