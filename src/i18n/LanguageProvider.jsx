import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { LanguageContext } from './LanguageContext';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_OPTIONS,
  translations,
} from './translations';

const STORAGE_KEY = 'cristinaq-language';
const LANGUAGE_QUERY_PARAM = 'lang';

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

function readUrlLanguage() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return new URL(window.location.href).searchParams.get(LANGUAGE_QUERY_PARAM);
  } catch {
    return null;
  }
}

function syncLanguageUrl(language, location) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const url = new URL(window.location.href);

    if (location) {
      url.pathname = location.pathname || '/';
      url.search = location.search || '';
      url.hash = location.hash || '';
    }

    if (language === DEFAULT_LANGUAGE) {
      url.searchParams.delete(LANGUAGE_QUERY_PARAM);
    } else {
      url.searchParams.set(LANGUAGE_QUERY_PARAM, language);
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextUrl !== currentUrl) {
      window.history.replaceState(window.history.state, '', nextUrl);
    }
  } catch {
    // Language is still stored and applied even if the URL cannot be updated.
  }
}

function getInitialLanguage() {
  const urlLanguage = readUrlLanguage();

  if (isSupportedLanguage(urlLanguage)) {
    return urlLanguage;
  }

  const storedLanguage = readStoredLanguage();

  if (isSupportedLanguage(storedLanguage)) {
    return storedLanguage;
  }

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const location = useLocation();
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
    syncLanguageUrl(language, location);

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The selected language still works for the current session.
    }
  }, [language, location]);

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
