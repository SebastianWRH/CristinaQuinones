export const DEFAULT_SITE_URL = 'https://www.cristinaquinones.com';
export const SITE_NAME = 'Cristina Quiñones';
export const PERSON_NAME = 'Cristina Quiñones Dávila';
export const TWITTER_HANDLE = '@cristinaq';

export const SOCIAL_PROFILES = [
  'https://www.linkedin.com/in/crisquinones/',
  'https://www.instagram.com/cristina_qd/',
  'https://www.tiktok.com/@cristinaqd',
  'https://www.youtube.com/@Consumer_Truth',
  'https://x.com/cristinaq',
];

export function getSiteUrl() {
  return (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
}

export function toAbsoluteUrl(value) {
  if (!value) {
    return undefined;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${getSiteUrl()}${value.startsWith('/') ? value : `/${value}`}`;
}

export function getLocalizedPath(path, language) {
  const [pathWithSearch, hash] = path.split('#');
  const [pathname, search = ''] = pathWithSearch.split('?');
  const params = new URLSearchParams(search);

  if (language === 'en') {
    params.set('lang', 'en');
  } else {
    params.delete('lang');
  }

  const query = params.toString();
  return `${pathname || '/'}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
}
