import { useEffect, useRef, useState } from 'react';
import { LANGUAGE_CODES } from '../../i18n/translations';
import { useTranslation } from '../../i18n/useTranslation';
import styles from './LanguageSwitcher.module.css';

const flagClassByLanguage = {
  es: styles.flagEs,
  en: styles.flagEn,
};

function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef(null);
  const { language, setLanguage, t } = useTranslation();
  const activeLabel = t(`language.options.${language}`);
  const inactiveLanguages = LANGUAGE_CODES.filter((languageCode) => languageCode !== language);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!switcherRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div ref={switcherRef} className={styles.switcher}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-label={t('language.selectorLabel')}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title={activeLabel}
      >
        <span
          className={`${styles.flag} ${flagClassByLanguage[language]}`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}
        role="menu"
        aria-label={t('language.selectorLabel')}
        aria-hidden={!isOpen}
      >
        {inactiveLanguages.map((languageCode) => {
          const label = t(`language.options.${languageCode}`);

          return (
            <button
              key={languageCode}
              type="button"
              className={styles.option}
              onClick={() => handleLanguageChange(languageCode)}
              aria-label={label}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              title={label}
            >
              <span
                className={`${styles.flag} ${flagClassByLanguage[languageCode]}`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LanguageSwitcher;
