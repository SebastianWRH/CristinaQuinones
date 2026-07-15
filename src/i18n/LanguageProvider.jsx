import { useCallback, useEffect, useMemo, useState } from 'react';

import { LanguageContext } from './LanguageContext';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_OPTIONS,
  translations,
} from './translations';

const STORAGE_KEY = 'cristinaq-language';

function isSupportedLanguage(language) {
  return Boolean(translations[language]);
}

function readStoredLanguage() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getInitialLanguage() {
  const storedLanguage = readStoredLanguage();

  if (isSupportedLanguage(storedLanguage)) {
    return storedLanguage;
  }

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState(isSupportedLanguage(nextLanguage) ? nextLanguage : DEFAULT_LANGUAGE);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((currentLanguage) =>
      currentLanguage === 'es' ? 'en' : 'es'
    );
  }, []);

  useEffect(() => {
    document.documentElement.lang = LANGUAGE_OPTIONS[language].htmlLang;

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The selected language still works for the current session.
    }
  }, [language]);

  const value = useMemo(
    () => ({
      dictionary: translations[language] ?? translations[DEFAULT_LANGUAGE],
      language,
      setLanguage,
      toggleLanguage,
    }),
    [language, setLanguage, toggleLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
