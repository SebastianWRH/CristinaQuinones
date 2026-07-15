import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import storyImage from '../../imagenes/mi historia.jpg';
import conferenceImage from '../../imagenes/conferencias.jpg';
import labImage from '../../imagenes/laboratorio insighter.jpg';
import { books as bookData, getBookCopy } from '../data/books';
import {
  getVideoEmbedUrl,
  getVideoThumbnail,
  getVideoTitle,
  getVideoWatchUrl,
  videos as videoData,
} from '../data/videos';
import {
  getLocalizedTestimonial,
  testimonials as testimonialData,
} from '../data/testimonials';
import ContactForm from '../components/ContactForm/ContactForm';
import SEO from '../components/SEO/SEO';
import { useTranslation } from '../i18n/useTranslation';
import styles from './Home.module.css';

function Home() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [shouldAutoplayVideo, setShouldAutoplayVideo] = useState(false);
  const testimonialTrackRef = useRef(null);
  const { language, t, tArray } = useTranslation();
  const heroBadges = tArray('home.hero.badges');
  const stats = tArray('home.stats');
  const marquee = tArray('home.marquee');
  const storyParagraphs = tArray('home.story.paragraphs');
  const timeline = tArray('home.story.timeline');
  const phrases = tArray('home.thinking.phrases');
  const conferences = tArray('home.conferences.items');
  const books = bookData.map((book) => ({
    ...book,
    copy: getBookCopy(book, language),
  }));
  const services = tArray('home.consumerTruth.services');
  const metrics = tArray('home.consumerTruth.metrics');
  const labParagraphs = tArray('home.lab.paragraphs');
  const labFeatures = tArray('home.lab.features');
  const videos = videoData;
  const testimonials = testimonialData.map((testimonial) =>
    getLocalizedTestimonial(testimonial, language)
  );
  const activeVideo = videos[activeVideoIndex] ?? videos[0];
  const activeVideoTitle = getVideoTitle(activeVideo, language);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Cristina QuiÃ±ones DÃ¡vila',
    alternateName: 'Cristina Q',
    url: t('home.meta.canonical'),
    image: t('home.meta.image'),
    jobTitle:
      language === 'es'
        ? 'PsicÃ³loga social, autora, conferencista y CEO de Consumer Truth'
        : 'Social psychologist, author, speaker and Consumer Truth CEO',
    worksFor: {
      '@type': 'Organization',
      name: 'Consumer Truth',
      url: 'https://consumer-truth.com.pe/',
    },
    knowsAbout: [
      'Consumer Insights',
      'Consumer Psychology',
      'Marketing Strategy',
      'Cultural Transformation',
      'Leadership',
    ],
    sameAs: [
      'https://www.linkedin.com/in/crisquinones/',
      'https://www.instagram.com/cristina_qd/',
      'https://www.tiktok.com/@cristinaqd',
      'https://www.youtube.com/@Consumer_Truth',
      'https://x.com/cristinaq',
    ],
  };

  const repeatedMarquee = [...marquee, ...marquee];

  const scrollTestimonials = (direction) => {
    const track = testimonialTrackRef.current;
    const card = track?.querySelector(`.${styles.testimonialCard}`);

    if (!track || !card) {
      return;
    }

    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
    const distance = card.getBoundingClientRect().width + gap;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    track.scrollBy({
      left: direction * distance,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      <SEO
        title={t('home.meta.title')}
        description={t('home.meta.description')}
        keywords={t('home.meta.keywords')}
        canonical={t('home.meta.canonical')}
        image={t('home.meta.image')}
        jsonLd={jsonLd}
        alternateLinks={[
          { hrefLang: 'es-PE', href: '/' },
          { hrefLang: 'en', href: '/' },
          { hrefLang: 'x-default', href: '/' },
        ]}
      />

      <div className={styles.home}>
        <section id="hero" className={styles.hero} aria-label="Cristina QuiÃ±ones">
          <div className={styles.heroMedia} aria-hidden="true" />
          <div className={styles.heroOverlay} aria-hidden="true" />

          <div className={styles.heroInner}>
            <div className={styles.badges}>
              {heroBadges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>

            <h1>
              <span>{t('home.hero.titleLine1')}</span>
              {' '}
              <span>{t('home.hero.titleLine2')}</span>
              {' '}
              <em>{t('home.hero.titleHighlight')}</em>
            </h1>

            <p className={styles.heroQuote}>{t('home.hero.quote')}</p>
            <p className={styles.heroDescription}>{t('home.hero.description')}</p>

            <div className={styles.heroActions}>
              <a href="#conferencias" className={styles.primaryButton}>
                {t('home.hero.primaryAction')}
              </a>
              <a href="#sobre-mi" className={styles.secondaryButton}>
                {t('home.hero.secondaryAction')}
              </a>
            </div>

            <div
              className={styles.heroStats}
              aria-label={language === 'es' ? 'Trayectoria' : 'Track record'}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.marquee} aria-hidden="true">
          <div>
            {repeatedMarquee.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <section id="sobre-mi" className={styles.storySection}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>{t('home.story.label')}</p>
            <h2>
              {t('home.story.titleTop')}
              {' '}
              <span>{t('home.story.titleMiddle')}</span>
              {' '}
              <em>{t('home.story.titleAccent')}</em>
            </h2>
          </div>

          <div className={styles.storyGrid}>
            <div className={styles.storyCopy}>
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <blockquote>{t('home.story.quote')}</blockquote>
            </div>

            <div className={styles.storySide}>
              <img
                className={styles.storyImage}
                src={storyImage}
                alt={t('home.story.imageAlt')}
                loading="lazy"
              />

              <ol className={styles.timeline}>
                {timeline.map((item) => (
                  <li key={`${item.year}-${item.title}`}>
                    <span>{item.year}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="frases" className={styles.darkSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>{t('home.thinking.label')}</p>
            <h2>{t('home.thinking.title')}</h2>
          </div>

          <div className={styles.phraseGrid}>
            {phrases.map((phrase) => (
              <article key={phrase.number}>
                <span>{phrase.number}</span>
                <blockquote>{phrase.quote}</blockquote>
                <p>{phrase.context}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="conferencias" className={styles.conferenceSection}>
          <div className={styles.conferenceIntro}>
            <p className={styles.kicker}>{t('home.conferences.label')}</p>
            <h2>
              {t('home.conferences.titleTop')}
              {' '}
              <span>{t('home.conferences.titleMiddle')}</span>
              {' '}
              <em>{t('home.conferences.titleAccent')}</em>
            </h2>
            <p>{t('home.conferences.body')}</p>
            <a href="#contacto" className={styles.primaryButton}>
              {t('home.conferences.action')}
            </a>
            <figure className={styles.conferenceHeroImage}>
              <img src={conferenceImage} alt={t('home.conferences.cardTitle')} loading="lazy" />
              <figcaption>
                <span>{t('home.conferences.cardTitle')}</span>
                <p>{t('home.conferences.cardQuote')}</p>
              </figcaption>
            </figure>
          </div>

          <div className={styles.conferenceList}>
            {conferences.map((conference) => (
              <article key={conference.title} className={styles.conferenceCard}>
                <h3>{conference.title}</h3>
                <p>{conference.body}</p>
                <span>{conference.format}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="libros" className={styles.booksSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>{t('home.books.label')}</p>
            <h2>
              {t('home.books.titleTop')}
              {' '}
              <em>{t('home.books.titleAccent')}</em>
            </h2>
          </div>

          <div className={styles.booksGrid}>
            {books.map((book) => {
              const { copy } = book;

              return (
                <Link
                  key={book.slug}
                  to={`/libros/${book.slug}`}
                  className={styles.bookCard}
                  aria-label={`${copy.action}: ${copy.title}`}
                >
                  <article>
                    <img
                      className={styles.bookCover}
                      src={book.image}
                      alt={copy.imageAlt}
                      loading="lazy"
                    />
                    <span>{`${book.year} · ${book.publisher}`}</span>
                    <h3>{copy.title}</h3>
                    <p className={styles.bookSubtitle}>{copy.subtitle}</p>
                    <blockquote>{copy.quote}</blockquote>
                    <p>{copy.body}</p>
                    <span className={styles.bookCta}>{copy.action}</span>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="consumer-truth" className={styles.consumerSection}>
          <div className={styles.consumerTop}>
            <div>
              <p className={styles.kicker}>{t('home.consumerTruth.label')}</p>
              <h2>
                {t('home.consumerTruth.titleTop')}
                {' '}
                <span>{t('home.consumerTruth.titleMiddle')}</span>
                {' '}
                <em>{t('home.consumerTruth.titleAccent')}</em>
              </h2>
            </div>
            <div>
              <p>{t('home.consumerTruth.body')}</p>
              <a
                href="https://consumer-truth.com.pe/"
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryButtonLight}
              >
                {t('home.consumerTruth.action')}
              </a>
            </div>
          </div>

          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article key={service.title}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            ))}
          </div>

          <div className={styles.consumerMetrics}>
            {metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <blockquote className={styles.manifesto}>
            <p>{t('home.consumerTruth.manifesto')}</p>
            <cite>Consumer Truth Â· Manifiesto</cite>
          </blockquote>
        </section>

        <section id="laboratorio" className={styles.labSection}>
          <div className={styles.labVisual}>
            <img
              src={labImage}
              alt={t('home.lab.titleTop')}
              loading="lazy"
            />
            <span>{t('home.lab.location')}</span>
          </div>

          <div className={styles.labCopy}>
            <p className={styles.kicker}>{t('home.lab.label')}</p>
            <h2>
              {t('home.lab.titleTop')}
              {' '}
              <em>{t('home.lab.titleAccent')}</em>
            </h2>
            {labParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className={styles.labFeatures}>
              {labFeatures.map((feature) => (
                <article key={feature.title}>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="videoteca" className={styles.videoSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>{t('home.videos.label')}</p>
            <h2>
              {t('home.videos.titleTop')}
              {' '}
              <em>{t('home.videos.titleAccent')}</em>
            </h2>
          </div>

          <div className={styles.videoCarousel} aria-label={t('home.videos.label')}>
            {videos.map((video, index) => {
              const videoTitle = getVideoTitle(video, language);

              return (
                <button
                  key={video.id}
                  type="button"
                  className={`${styles.videoThumb} ${
                    activeVideoIndex === index ? styles.activeVideo : ''
                  }`}
                  onClick={() => {
                    setActiveVideoIndex(index);
                    setShouldAutoplayVideo(false);
                  }}
                  aria-pressed={activeVideoIndex === index}
                >
                  <span className={styles.videoImageWrap}>
                    <img src={getVideoThumbnail(video)} alt={videoTitle} loading="lazy" />
                    <span className={styles.videoPlayIcon} aria-hidden="true" />
                  </span>
                  <span className={styles.videoCaption}>
                    <strong>{videoTitle}</strong>
                  </span>
                </button>
              );
            })}
          </div>

          <div className={styles.videoPlayerPanel}>
            <div className={styles.videoPlayerHeader}>
              <p>{activeVideoTitle}</p>
              <a
                href={getVideoWatchUrl(activeVideo)}
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>

            <div className={styles.videoPlayer}>
              {shouldAutoplayVideo ? (
                <iframe
                  src={`${getVideoEmbedUrl(activeVideo)}&autoplay=1`}
                  title={activeVideoTitle}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className={styles.videoFacade}
                  onClick={() => setShouldAutoplayVideo(true)}
                  aria-label={
                    language === 'es'
                      ? `Reproducir video: ${activeVideoTitle}`
                      : `Play video: ${activeVideoTitle}`
                  }
                >
                  <img src={getVideoThumbnail(activeVideo)} alt="" loading="lazy" />
                  <span className={styles.videoPlayIcon} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <a
            href="https://www.youtube.com/@Consumer_Truth"
            target="_blank"
            rel="noreferrer"
            className={styles.textButton}
          >
            {t('home.videos.action')}
          </a>
        </section>

        <section id="testimonios" className={styles.testimonialsSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>{t('home.testimonials.label')}</p>
            <h2>
              {t('home.testimonials.titleTop')}
              {' '}
              <em>{t('home.testimonials.titleAccent')}</em>
            </h2>
          </div>

          <div className={styles.testimonialCarousel}>
            <button
              type="button"
              className={styles.testimonialArrow}
              onClick={() => scrollTestimonials(-1)}
              aria-label={language === 'es' ? 'Ver testimonios anteriores' : 'View previous testimonials'}
            >
              â€¹
            </button>

            <div className={styles.testimonialViewport}>
              <div ref={testimonialTrackRef} className={styles.testimonialTrack}>
                {testimonials.map((testimonial) => (
                  <article key={testimonial.name} className={styles.testimonialCard}>
                    <div
                      className={styles.testimonialStars}
                      aria-label={language === 'es' ? '5 estrellas' : '5 stars'}
                    >
                      â˜…â˜…â˜…â˜…â˜…
                    </div>
                    <blockquote>{testimonial.quote}</blockquote>
                    <footer>
                      <span>{testimonial.initials}</span>
                      <p>
                        <strong>{testimonial.name}</strong>
                        {testimonial.role}
                      </p>
                    </footer>
                  </article>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={styles.testimonialArrow}
              onClick={() => scrollTestimonials(1)}
              aria-label={language === 'es' ? 'Ver testimonios siguientes' : 'View next testimonials'}
            >
              â€º
            </button>
          </div>
        </section>

        <section id="contacto" className={styles.contactSection}>
          <div className={styles.contactInfo}>
            <p className={styles.kicker}>{t('home.contact.label')}</p>
            <h2>
              {t('home.contact.titleTop')}
              {' '}
              <span>{t('home.contact.titleMiddle')}</span>
              {' '}
              <em>{t('home.contact.titleAccent')}</em>
            </h2>
            <p>{t('home.contact.body')}</p>

            <dl className={styles.contactList}>
              <div>
                <dt>{t('home.contact.emailLabel')}</dt>
                <dd>
                  <a href={`mailto:${t('home.contact.email')}`}>
                    {t('home.contact.email')}
                  </a>
                </dd>
              </div>
              <div>
                <dt>{t('home.contact.locationLabel')}</dt>
                <dd>{t('home.contact.location')}</dd>
                <dd>{t('home.contact.coverage')}</dd>
              </div>
              <div>
                <dt>{t('home.contact.whatsappLabel')}</dt>
                <dd>
                  <a href="https://api.whatsapp.com/send?phone=51998244997">
                    {t('home.contact.whatsapp')}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </section>

        <a
          href="https://api.whatsapp.com/send?phone=51998244997"
          target="_blank"
          rel="noreferrer"
          className={styles.whatsappFloat}
          aria-label={t('footer.whatsapp')}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            <path d="M16.02 3.2c-7.06 0-12.8 5.73-12.8 12.78 0 2.25.59 4.45 1.72 6.39L3.11 29l6.79-1.78a12.75 12.75 0 0 0 6.11 1.56h.01c7.05 0 12.79-5.73 12.79-12.78S23.08 3.2 16.02 3.2Zm0 23.42h-.01a10.6 10.6 0 0 1-5.41-1.48l-.39-.23-4.03 1.06 1.08-3.93-.25-.4a10.55 10.55 0 0 1-1.62-5.66c0-5.86 4.77-10.62 10.64-10.62 2.84 0 5.51 1.11 7.52 3.12a10.55 10.55 0 0 1 3.11 7.52c0 5.86-4.77 10.62-10.64 10.62Zm5.83-7.96c-.32-.16-1.9-.94-2.19-1.05-.29-.11-.51-.16-.72.16-.21.32-.82 1.05-1 1.26-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.48 4.84.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z" />
          </svg>
        </a>
      </div>
    </>
  );
}

export default Home;
