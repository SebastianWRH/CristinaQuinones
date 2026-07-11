import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import storyImage from '../../imagenes/mi historia.jpg';
import conferenceImage from '../../imagenes/conferencias.jpg';
import labImage from '../../imagenes/laboratorio insighter.jpg';
import consumerMindBookImage from '../../imagenes/libro_desnudando_la_mente_del_consumidor.jpg';
import streetStrategyBookImage from '../../imagenes/web_insightsconcalle_bootcamp_libro_estrategias_calle_.png';
import { useTranslation } from '../i18n/useTranslation';
import styles from './Home.module.css';

const bookImages = [consumerMindBookImage, streetStrategyBookImage];

const bookRoutes = [
  '/libros/desnudando-la-mente-del-consumidor',
  '/libros/estrategias-con-calle',
];

const videoIds = [
  'cuyyIQputDE',
  'uj9Iw1lN-3w',
  'GVdrzj-ap9Q',
  'y6PERZ9Y0_U',
  'vOnJdm65_y0',
  '1-7tQqoGxMQ',
  'K4pF3fQO39E',
  '6IcXKEpbDQU',
  '8pjk4JwpACA',
];

const videoLinks = videoIds.map((videoId) => `https://www.youtube.com/watch?v=${videoId}`);
const videoThumbnails = videoIds.map((videoId) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);

const videoItems = {
  es: [
    'Que es un insight: la mejor forma de descubrir insights es pisando la calle',
    'Parejas y Esposos Empresarios: como nacio Consumer Truth',
    'Podcast Marketing con Calle: 5 razones para creer en Marketing con Calle',
    'Podcast Raul Diaz: como encontrar insights en marketing',
    'Imanpop Podcast: Insights con Calle, conectar antes que vender',
    'Lideres PUCP: Consumer Insights y desnudando la mente del consumidor',
    'Podcast con Ximena Delgado: la clave para conectar con tu publico',
    'Fuera de la Caja: psicologia del consumidor, marketing y tendencias',
    'Cafe Taipa: los insights que la IA no ve definen la reputacion',
  ],
  en: [
    'What an insight is: the best way to find insights is on the street',
    'Entrepreneur couples: how Consumer Truth was born',
    'Marketing con Calle podcast: 5 reasons to believe in street-smart marketing',
    'Raul Diaz podcast: how to find insights in marketing',
    'Imanpop Podcast: insights with street, connecting before selling',
    'Lideres PUCP: consumer insights and uncovering the consumer mind',
    'Podcast with Ximena Delgado: the key to connecting with your audience',
    'Fuera de la Caja: consumer psychology, marketing and trends',
    'Cafe Taipa: the insights AI cannot see define reputation',
  ],
};

const testimonialItems = {
  es: [
    {
      quote:
        'Gracias a Consumer Truth entendimos que no basta con quedarse en el escritorio. Hay que salir a buscar al consumidor en las calles.',
      initials: 'MS',
      name: 'Martín Saldaña',
      role: 'CEO · Unión',
    },
    {
      quote:
        'Nos enseñaron a buscar siempre un poco más adentro para encontrar aquellos insights verdaderamente relevantes para el negocio.',
      initials: 'SB',
      name: 'Sandra Botetano',
      role: 'Jefe de Marketing · UTP',
    },
    {
      quote:
        'Hemos podido conocer, de primera mano, las emociones que mueven a nuestros consumidores. Una experiencia que cambió nuestra forma de hacer marketing.',
      initials: 'CV',
      name: 'Claudia Vidaurrazaga',
      role: 'Gerente Comercial · La Ibérica',
    },
    {
      quote:
        'Nos han permitido desnudar nuestra mente, cambiar nuestra forma de pensar y de ver las cosas. Trabajar con Cristina es una transformación, no una consultoría.',
      initials: 'AG',
      name: 'Andrea Guzmán',
      role: 'Brand Manager · Ajinomoto',
    },
    {
      quote:
        'Compartimos su espíritu, su energía y su pasión por el consumidor. Nos enseñaron a Pisar la Calle, y eso cambió la forma en que construimos nuestra marca.',
      initials: 'LV',
      name: 'Laura Villanueva',
      role: 'Gerente de Marca · Mibanco',
    },
    {
      quote:
        'Esta experiencia me ha ratificado que tener al consumidor en el centro de la estrategia es lo correcto. Y Cristina lo demuestra con cada metodología.',
      initials: 'CG',
      name: 'Carlos González-Artigas',
      role: 'Gerente General · La Fabril, Ecuador',
    },
  ],
  en: [
    {
      quote:
        'Thanks to Consumer Truth, we understood that staying at the desk is not enough. You have to go find consumers in the streets.',
      initials: 'MS',
      name: 'Martín Saldaña',
      role: 'CEO · Unión',
    },
    {
      quote:
        'They taught us to keep looking deeper to find insights that are truly relevant to the business.',
      initials: 'SB',
      name: 'Sandra Botetano',
      role: 'Head of Marketing · UTP',
    },
    {
      quote:
        'We were able to experience first-hand the emotions that move our consumers. It changed the way we do marketing.',
      initials: 'CV',
      name: 'Claudia Vidaurrazaga',
      role: 'Commercial Manager · La Ibérica',
    },
    {
      quote:
        'They allowed us to uncover our mindset, change the way we think and see things. Working with Cristina is a transformation, not just consulting.',
      initials: 'AG',
      name: 'Andrea Guzmán',
      role: 'Brand Manager · Ajinomoto',
    },
    {
      quote:
        'We share her spirit, energy and passion for the consumer. They taught us to hit the street, and that changed how we build our brand.',
      initials: 'LV',
      name: 'Laura Villanueva',
      role: 'Brand Manager · Mibanco',
    },
    {
      quote:
        'This experience confirmed that putting the consumer at the center of strategy is the right thing to do. Cristina proves it with every methodology.',
      initials: 'CG',
      name: 'Carlos González-Artigas',
      role: 'General Manager · La Fabril, Ecuador',
    },
  ],
};

function Home() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [shouldAutoplayVideo, setShouldAutoplayVideo] = useState(false);
  const testimonialTrackRef = useRef(null);
  const { language, t } = useTranslation();
  const heroBadges = t('home.hero.badges');
  const stats = t('home.stats');
  const marquee = t('home.marquee');
  const storyParagraphs = t('home.story.paragraphs');
  const timeline = t('home.story.timeline');
  const phrases = t('home.thinking.phrases');
  const conferences = t('home.conferences.items');
  const books = t('home.books.items');
  const services = t('home.consumerTruth.services');
  const metrics = t('home.consumerTruth.metrics');
  const labParagraphs = t('home.lab.paragraphs');
  const labFeatures = t('home.lab.features');
  const videos = videoItems[language] ?? videoItems.es;
  const testimonials = testimonialItems[language] ?? testimonialItems.es;
  const contactOptions = t('home.contact.options');
  const activeVideoId = videoIds[activeVideoIndex];
  const activeVideoTitle = videos[activeVideoIndex];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Cristina Quiñones Dávila',
    alternateName: 'Cristina Q',
    url: t('home.meta.canonical'),
    image: t('home.meta.image'),
    jobTitle:
      language === 'es'
        ? 'Psicóloga social, autora, conferencista y CEO de Consumer Truth'
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

    track.scrollBy({
      left: direction * distance,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Helmet>
        <html lang={language === 'es' ? 'es-PE' : 'en'} />
        <title>{t('home.meta.title')}</title>
        <meta name="description" content={t('home.meta.description')} />
        <meta name="keywords" content={t('home.meta.keywords')} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={t('home.meta.canonical')} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Cristina Quiñones" />
        <meta property="og:title" content={t('home.meta.title')} />
        <meta property="og:description" content={t('home.meta.description')} />
        <meta property="og:url" content={t('home.meta.canonical')} />
        <meta property="og:image" content={t('home.meta.image')} />
        <meta property="og:locale" content={t('home.meta.locale')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('home.meta.title')} />
        <meta name="twitter:description" content={t('home.meta.description')} />
        <meta name="twitter:image" content={t('home.meta.image')} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className={styles.home}>
        <section id="hero" className={styles.hero} aria-label="Cristina Quiñones">
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

            <div className={styles.heroStats} aria-label="Trayectoria">
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
            {books.map((book, index) => (
              <Link
                key={book.title}
                to={bookRoutes[index]}
                className={styles.bookCard}
                aria-label={`${book.action}: ${book.title}`}
              >
                <article>
                  <img
                    className={styles.bookCover}
                    src={bookImages[index]}
                    alt={book.title}
                    loading="lazy"
                  />
                  <span>{book.year}</span>
                  <h3>{book.title}</h3>
                  <p className={styles.bookSubtitle}>{book.subtitle}</p>
                  <blockquote>{book.quote}</blockquote>
                  <p>{book.body}</p>
                  <span className={styles.bookCta}>{book.action}</span>
                </article>
              </Link>
            ))}
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
            <cite>Consumer Truth · Manifiesto</cite>
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
            {videos.map((video, index) => (
              <button
                key={video}
                type="button"
                className={`${styles.videoThumb} ${
                  activeVideoIndex === index ? styles.activeVideo : ''
                }`}
                onClick={() => {
                  setActiveVideoIndex(index);
                  setShouldAutoplayVideo(true);
                }}
                aria-pressed={activeVideoIndex === index}
              >
                <span className={styles.videoImageWrap}>
                  <img src={videoThumbnails[index]} alt={video} loading="lazy" />
                  <span className={styles.videoPlayIcon} aria-hidden="true" />
                </span>
                <span className={styles.videoCaption}>
                  <strong>{video}</strong>
                </span>
              </button>
            ))}
          </div>

          <div className={styles.videoPlayerPanel}>
            <div className={styles.videoPlayerHeader}>
              <p>{activeVideoTitle}</p>
              <a
                href={videoLinks[activeVideoIndex]}
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>

            <div className={styles.videoPlayer}>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?rel=0${
                  shouldAutoplayVideo ? '&autoplay=1' : ''
                }`}
                title={activeVideoTitle}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
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
              ‹
            </button>

            <div className={styles.testimonialViewport}>
              <div ref={testimonialTrackRef} className={styles.testimonialTrack}>
                {testimonials.map((testimonial) => (
                  <article key={testimonial.name} className={styles.testimonialCard}>
                    <div
                      className={styles.testimonialStars}
                      aria-label={language === 'es' ? '5 estrellas' : '5 stars'}
                    >
                      ★★★★★
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
              ›
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

          <form
            className={styles.contactForm}
            onSubmit={(event) => event.preventDefault()}
          >
            <h3>{t('home.contact.formTitle')}</h3>
            <p>{t('home.contact.formIntro')}</p>

            <label>
              <span>{t('home.contact.fields.name')}</span>
              <input type="text" name="name" autoComplete="name" />
            </label>

            <label>
              <span>{t('home.contact.fields.company')}</span>
              <input type="text" name="company" autoComplete="organization" />
            </label>

            <label>
              <span>{t('home.contact.fields.email')}</span>
              <input type="email" name="email" autoComplete="email" />
            </label>

            <label>
              <span>{t('home.contact.fields.country')}</span>
              <input type="text" name="country" autoComplete="country-name" />
            </label>

            <label className={styles.fullField}>
              <span>{t('home.contact.fields.need')}</span>
              <select name="need" defaultValue="">
                <option value="" disabled>
                  {t('home.contact.fields.need')}
                </option>
                {contactOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.fullField}>
              <span>{t('home.contact.fields.message')}</span>
              <textarea name="message" rows="5" />
            </label>

            <button type="submit">{t('home.contact.submit')}</button>
          </form>
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
