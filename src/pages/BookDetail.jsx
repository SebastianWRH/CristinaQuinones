import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { getBookBySlug, getBookCopy } from '../data/books';
import { useTranslation } from '../i18n/useTranslation';
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
  const canonical = `/libros/${book.slug}`;
  const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://www.cristinaquinones.com').replace(
    /\/$/,
    ''
  );
  const imageUrl = /^https?:\/\//i.test(book.image)
    ? book.image
    : `${siteUrl}${book.image}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: copy.title,
    description: copy.intro,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: 'Cristina Quiñones Dávila',
    },
    publisher: {
      '@type': 'Organization',
      name: book.publisher,
    },
    datePublished: book.year,
    inLanguage: language === 'es' ? 'es-PE' : 'en',
    url: book.buyUrl,
  };

  return (
    <>
      <SEO
        title={`${copy.title} | Cristina Quiñones`}
        description={copy.intro}
        canonical={canonical}
        image={book.image}
        type="book"
        jsonLd={jsonLd}
        alternateLinks={[
          { hrefLang: 'es-PE', href: canonical },
          { hrefLang: 'en', href: canonical },
          { hrefLang: 'x-default', href: canonical },
        ]}
      />

      <section className={styles.bookPage}>
        <Link to="/#libros" className={styles.backLink}>
          {language === 'es' ? 'Volver a libros' : 'Back to books'}
        </Link>

        <div className={styles.hero}>
          <div className={styles.coverPanel}>
            <img src={book.image} alt={copy.imageAlt} />
          </div>

          <div className={styles.copy}>
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
          </div>
        </div>

        <div className={styles.contentGrid}>
          <article>
            <h2>{language === 'es' ? 'Sobre el libro' : 'About the book'}</h2>
            <p>{copy.description}</p>
            <p>{copy.audience}</p>
          </article>

          <aside>
            <h2>{language === 'es' ? 'Temas clave' : 'Key themes'}</h2>
            <ul>
              {copy.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}

export default BookDetail;
