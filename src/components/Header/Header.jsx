import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from '../../i18n/useTranslation';
import styles from './Header.module.css';

const navItems = [
  {
    to: '/#sobre-mi',
    labelKey: 'navigation.story',
  },
  {
    to: '/#conferencias',
    labelKey: 'navigation.conferences',
  },
  {
    to: '/#libros',
    labelKey: 'navigation.books',
  },
  {
    to: '/#consumer-truth',
    labelKey: 'navigation.consumerTruth',
  },
  {
    to: '/#laboratorio',
    labelKey: 'navigation.lab',
  },
  {
    to: '/#contacto',
    labelKey: 'navigation.contact',
  },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { language, t } = useTranslation();

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuLabel = isMenuOpen
    ? language === 'es'
      ? 'Cerrar menú principal'
      : 'Close main menu'
    : language === 'es'
      ? 'Abrir menú principal'
      : 'Open main menu';

  return (
    <header ref={headerRef} className={styles.header} data-site-header>
      <Link to="/" className={styles.logo} aria-label="Cristina Q" onClick={closeMenu}>
        Cristina<span>Q</span>
      </Link>

      <div className={styles.headerActions}>
        <nav
          id="primary-navigation"
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
          aria-label={language === 'es' ? 'Navegación principal' : 'Main navigation'}
        >
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={closeMenu}>
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className={styles.tools}>
          <Link to="/#contacto" className={styles.cta} onClick={closeMenu}>
            {t('navigation.hire')}
          </Link>
          <LanguageSwitcher />
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            aria-label={menuLabel}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
