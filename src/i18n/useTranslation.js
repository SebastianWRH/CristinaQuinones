import { useContext } from 'react';

import { LanguageContext } from './LanguageContext';

function getValue(dictionary, path) {
  return path
    .split('.')
    .reduce((value, key) => (value == null ? undefined : value[key]), dictionary);
}

export function useTranslation() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }

  const t = (path) => {
    const value = getValue(context.dictionary, path);
    return value == null ? path : value;
  };

  return {
    ...context,
    t,
  };
}
