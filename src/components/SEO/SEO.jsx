import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../../i18n/useTranslation';
import {
  PERSON_NAME,
  SITE_NAME,
  TWITTER_HANDLE,
  toAbsoluteUrl,
} from '../../utils/seo';

function SEO({
  title,
  description,
  canonical,
  image = '/cristina-quinones-hero.webp',
  imageAlt = SITE_NAME,
  keywords,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  type = 'website',
  jsonLd,
  alternateLinks = [],
}) {
  const { language } = useTranslation();
  const canonicalUrl = toAbsoluteUrl(canonical || '/');
  const imageUrl = toAbsoluteUrl(image);
  const locale = language === 'es' ? 'es_PE' : 'en_US';
  const alternateLocale = language === 'es' ? 'en_US' : 'es_PE';
  const jsonLdNodes = Array.isArray(jsonLd) ? jsonLd : [jsonLd].filter(Boolean);

  return (
    <Helmet>
      <html lang={language === 'es' ? 'es-PE' : 'en'} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={robots} />
      <meta name="author" content={PERSON_NAME} />
      <meta name="creator" content={PERSON_NAME} />
      <meta name="publisher" content={SITE_NAME} />
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
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="application-name" content={SITE_NAME} />
      {jsonLdNodes.map((node, index) => (
        <script key={`json-ld-${index}`} type="application/ld+json">
          {JSON.stringify(node)}
        </script>
      ))}
    </Helmet>
  );
}

export default SEO;
