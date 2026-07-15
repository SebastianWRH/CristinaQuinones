import { useContext } from 'react';

import { LanguageContext } from './LanguageContext';
import { DEFAULT_LANGUAGE, translations } from './translations';

function getValue(dictionary, path) {
  return path
    .split('.')
    .reduce((value, key) => (value == null ? undefined : value[key]), dictionary);
}

function warnMissingTranslation(path, language) {
  if (import.meta.env.DEV) {
    console.warn(`Missing translation "${path}" for language "${language}".`);
  }
}

export function useTranslation() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }

  const t = (path, fallback = '') => {
    const value = getValue(context.dictionary, path);

    if (value != null) {
      return value;
    }

    warnMissingTranslation(path, context.language);

    const defaultValue = getValue(translations[DEFAULT_LANGUAGE], path);
    return defaultValue ?? fallback;
  };

  const tText = (path, fallback = '') => {
    const value = t(path, fallback);
    return typeof value === 'string' ? value : fallback;
  };

  const tArray = (path, fallback = []) => {
    const value = t(path, fallback);
    return Array.isArray(value) ? value : fallback;
  };

  return {
    ...context,
    t,
    tArray,
    tText,
  };
}
