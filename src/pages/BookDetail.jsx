import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import consumerMindBookImage from '../../imagenes/libro_desnudando_la_mente_del_consumidor.jpg';
import streetStrategyBookImage from '../../imagenes/web_insightsconcalle_bootcamp_libro_estrategias_calle_.png';
import { useTranslation } from '../i18n/useTranslation';
import styles from './BookDetail.module.css';

const bookDetails = {
  es: {
    'desnudando-la-mente-del-consumidor': {
      title: 'Desnudando la Mente del Consumidor',
      subtitle: 'Consumer Insights en el Marketing',
      year: '2013',
      publisher: 'Editorial Planeta',
      image: consumerMindBookImage,
      imageAlt: 'Portada del libro Desnudando la Mente del Consumidor',
      intro:
        'Un libro para entender por qué las personas compran, eligen, recuerdan y conectan con marcas desde motivaciones mucho más profundas que una respuesta racional.',
      quote:
        'Una guía para mirar más allá del focus group y encontrar verdades humanas aplicables al negocio.',
      description:
        'Cristina Quiñones desarrolla una mirada práctica sobre los Consumer Insights: cómo encontrarlos, interpretarlos y convertirlos en oportunidades reales de innovación, comunicación y estrategia de marca.',
      highlights: [
        'Consumer Insights aplicados al marketing latinoamericano.',
        'Lectura psicológica y cultural del consumidor.',
        'Herramientas para pasar del dato a la verdad humana.',
        'Casos y reflexiones para marcas que buscan conexión real.',
      ],
      audience:
        'Ideal para equipos de marketing, innovación, investigación, comunicación y líderes que necesitan comprender mejor la mente del consumidor.',
    },
    'estrategias-con-calle': {
      title: 'Estrategias con Calle',
      subtitle: 'Insights y Tendencias del Consumo',
      year: '2019',
      publisher: 'Editorial Planeta',
      image: streetStrategyBookImage,
      imageAlt: 'Portada del libro Estrategias con Calle',
      intro:
        'Una invitación a salir del escritorio, mirar cultura viva y construir estrategias que nacen del contacto directo con las personas.',
      quote:
        'Una lectura cultural del nuevo consumidor y una ruta para marcas que quieren seguir siendo relevantes.',
      description:
        'El libro conecta tendencias, consumo, calle y transformación cultural para ayudar a las organizaciones a interpretar cambios sociales y convertirlos en decisiones de negocio con sentido.',
      highlights: [
        'Marketing con calle y observación cultural.',
        'Tendencias de consumo y transformación social.',
        'Estrategias para marcas que buscan relevancia.',
        'Mirada humana para innovar, comunicar y liderar.',
      ],
      audience:
        'Pensado para profesionales, emprendedores, líderes comerciales y equipos que quieren construir marcas más sensibles al contexto cultural.',
    },
  },
  en: {
    'desnudando-la-mente-del-consumidor': {
      title: 'Desnudando la Mente del Consumidor',
      subtitle: 'Consumer Insights in Marketing',
      year: '2013',
      publisher: 'Editorial Planeta',
      image: consumerMindBookImage,
      imageAlt: 'Cover of Desnudando la Mente del Consumidor',
      intro:
        'A book about why people buy, choose, remember, and connect with brands through motivations deeper than a rational answer.',
      quote:
        'A guide to look beyond the focus group and find human truths that business can use.',
      description:
        'Cristina Quiñones presents a practical view of Consumer Insights: how to find them, interpret them, and turn them into real opportunities for innovation, communication, and brand strategy.',
      highlights: [
        'Consumer Insights applied to Latin American marketing.',
        'Psychological and cultural reading of consumers.',
        'Tools to move from data to human truth.',
        'Cases and reflections for brands seeking real connection.',
      ],
      audience:
        'Ideal for marketing, innovation, research, communication teams, and leaders who need to better understand the consumer mind.',
    },
    'estrategias-con-calle': {
      title: 'Estrategias con Calle',
      subtitle: 'Insights and Consumer Trends',
      year: '2019',
      publisher: 'Editorial Planeta',
      image: streetStrategyBookImage,
      imageAlt: 'Cover of Estrategias con Calle',
      intro:
        'An invitation to leave the desk, observe living culture, and build strategies born from direct contact with people.',
      quote:
        'A cultural reading of the new consumer and a route for brands that want to stay relevant.',
      description:
        'The book connects trends, consumption, street observation, and cultural transformation to help organizations read social change and turn it into meaningful business decisions.',
      highlights: [
        'Street-smart marketing and cultural observation.',
        'Consumer trends and social transformation.',
        'Strategies for brands seeking relevance.',
        'A human lens to innovate, communicate, and lead.',
      ],
      audience:
        'Designed for professionals, entrepreneurs, commercial leaders, and teams that want to build brands with stronger cultural sensitivity.',
    },
  },
};

function BookDetail() {
  const { slug } = useParams();
  const { language } = useTranslation();
  const books = bookDetails[language] ?? bookDetails.es;
  const book = books[slug];

  if (!book) {
    return <Navigate to="/libros" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`${book.title} | Cristina Quiñones`}</title>
        <meta name="description" content={book.intro} />
      </Helmet>

      <section className={styles.bookPage}>
        <Link to="/#libros" className={styles.backLink}>
          {language === 'es' ? 'Volver a libros' : 'Back to books'}
        </Link>

        <div className={styles.hero}>
          <div className={styles.coverPanel}>
            <img src={book.image} alt={book.imageAlt} />
          </div>

          <div className={styles.copy}>
            <p className={styles.kicker}>
              {book.year} · {book.publisher}
            </p>
            <h1>{book.title}</h1>
            <p className={styles.subtitle}>{book.subtitle}</p>
            <blockquote>{book.quote}</blockquote>
            <p>{book.intro}</p>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <article>
            <h2>{language === 'es' ? 'Sobre el libro' : 'About the book'}</h2>
            <p>{book.description}</p>
            <p>{book.audience}</p>
          </article>

          <aside>
            <h2>{language === 'es' ? 'Temas clave' : 'Key themes'}</h2>
            <ul>
              {book.highlights.map((highlight) => (
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
