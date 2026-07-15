import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../../i18n/useTranslation';

const DEFAULT_SITE_URL = 'https://www.cristinaquinones.com';

function getSiteUrl() {
  return (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
}

function toAbsoluteUrl(value) {
  if (!value) {
    return undefined;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${getSiteUrl()}${value.startsWith('/') ? value : `/${value}`}`;
}

function SEO({
  title,
  description,
  canonical,
  image = '/cristina-quinones-hero.webp',
  keywords,
  robots = 'index, follow, max-image-preview:large',
  type = 'website',
  jsonLd,
  alternateLinks = [],
}) {
  const { language } = useTranslation();
  const canonicalUrl = toAbsoluteUrl(canonical || '/');
  const imageUrl = toAbsoluteUrl(image);
  const locale = language === 'es' ? 'es_PE' : 'en_US';
  const alternateLocale = language === 'es' ? 'en_US' : 'es_PE';

  return (
    <Helmet>
      <html lang={language === 'es' ? 'es-PE' : 'en'} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />
      {alternateLinks.map((link) => (
        <link
          key={link.hrefLang}
          rel="alternate"
          hrefLang={link.hrefLang}
          href={toAbsoluteUrl(link.href)}
        />
      ))}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Cristina Quiñones" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="application-name" content="Cristina Quiñones" />
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}

export default SEO;
