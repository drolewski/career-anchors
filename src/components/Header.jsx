import { useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import NavSwitcher from './NavSwitcher.jsx';

export default function Header() {
  const location = useLocation();
  const isStats = location.pathname === '/stats';

  return (
    <>
      <NavSwitcher isStats={isStats} />
      {!isStats && <LanguageSwitcher />}
      {isStats && <LanguageSwitcher />}
    </>
  );
}
