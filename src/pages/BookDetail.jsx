import { Link, useParams } from 'react-router-dom';
import RevealOnScroll from '../components/RevealOnScroll/RevealOnScroll';
import SEO from '../components/SEO/SEO';
import { getBookBySlug, getBookCopy } from '../data/books';
import { useTranslation } from '../i18n/useTranslation';
import {
  PERSON_NAME,
  SITE_NAME,
  getLocalizedPath,
  getSiteUrl,
  toAbsoluteUrl,
} from '../utils/seo';
import NotFound from './NotFound';
import styles from './BookDetail.module.css';

function BookDetail() {
  const { slug } = useParams();
  const { language } = useTranslation();
  const book = getBookBySlug(slug);

  if (!book) {
    return <NotFound />;
  }

  const copy = getBookCopy(book, language);
  const bookPath = `/libros/${book.slug}`;
  const canonical = getLocalizedPath(bookPath, language);
  const siteUrl = getSiteUrl();
  const pageUrl = toAbsoluteUrl(canonical);
  const imageUrl = toAbsoluteUrl(book.image);
  const title = `${copy.title} | ${PERSON_NAME}`;
  const inLanguage = language === 'es' ? 'es-PE' : 'en';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description: copy.intro,
        inLanguage,
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
        about: {
          '@id': `${pageUrl}#book`,
        },
        mainEntity: {
          '@id': `${pageUrl}#book`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: SITE_NAME,
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: copy.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'Book',
        '@id': `${pageUrl}#book`,
        name: copy.title,
        alternateName: copy.subtitle,
        description: copy.intro,
        image: imageUrl,
        author: {
          '@id': `${siteUrl}/#person`,
          name: PERSON_NAME,
        },
        publisher: {
          '@type': 'Organization',
          name: book.publisher,
        },
        datePublished: book.year,
        inLanguage,
        url: pageUrl,
        sameAs: book.buyUrl,
        about: copy.highlights,
      },
    ],
  };

  return (
    <>
      <SEO
        title={title}
        description={copy.intro}
        canonical={canonical}
        image={book.image}
        imageAlt={copy.imageAlt}
        type="book"
        jsonLd={jsonLd}
        alternateLinks={[
          { hrefLang: 'es-PE', href: bookPath },
          { hrefLang: 'en', href: getLocalizedPath(bookPath, 'en') },
          { hrefLang: 'x-default', href: bookPath },
        ]}
      />

      <section className={styles.bookPage}>
        <Link to="/#libros" className={styles.backLink}>
          {language === 'es' ? 'Volver a libros' : 'Back to books'}
        </Link>

        <div className={styles.hero}>
          <RevealOnScroll
            as="div"
            className={styles.coverPanel}
            variant="image"
            direction="right"
            distance={44}
            duration={960}
            scale={1.05}
            blur={6}
            parallax
            parallaxDistance={16}
          >
            <img
              src={book.image}
              alt={copy.imageAlt}
              decoding="async"
              width={book.imageWidth}
              height={book.imageHeight}
            />
          </RevealOnScroll>

          <RevealOnScroll
            as="div"
            className={styles.copy}
            variant="title"
            direction="left"
            distance={44}
            duration={900}
            blur={0}
          >
            <p className={styles.kicker}>
              {book.year} · {book.publisher}
            </p>
            <h1>{copy.title}</h1>
            <p className={styles.subtitle}>{copy.subtitle}</p>
            <blockquote>{copy.quote}</blockquote>
            <p>{copy.intro}</p>
            <a
              href={book.buyUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.buyButton}
            >
              {language === 'es' ? 'Comprar en Planeta' : 'Buy at Planeta'}
            </a>
          </RevealOnScroll>
        </div>

        <div className={styles.contentGrid}>
          <RevealOnScroll as="article" variant="card" delay={0} distance={42} duration={840} blur={5}>
            <h2>{language === 'es' ? 'Sobre el libro' : 'About the book'}</h2>
            <p>{copy.description}</p>
            <p>{copy.audience}</p>
          </RevealOnScroll>

          <RevealOnScroll as="aside" variant="card" delay={100} distance={42} duration={840} blur={5}>
            <h2>{language === 'es' ? 'Temas clave' : 'Key themes'}</h2>
            <ul>
              {copy.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

export default BookDetail;
