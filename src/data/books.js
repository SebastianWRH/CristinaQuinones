import consumerMindBookImage from '../../imagenes/libro_desnudando_la_mente_del_consumidor.jpg';
import streetStrategyBookImage from '../../imagenes/web_insightsconcalle_bootcamp_libro_estrategias_calle_.png';

export const books = [
  {
    slug: 'desnudando-la-mente-del-consumidor',
    image: consumerMindBookImage,
    year: '2013',
    publisher: 'Editorial Planeta',
    buyUrl: 'https://www.planetadelibros.com.pe/libro-desnudando-la-mente-del-consumidor/187813',
    translations: {
      es: {
        title: 'Desnudando la Mente del Consumidor',
        subtitle: 'Consumer Insights en el Marketing',
        intro:
          'Un libro para entender por qué las personas compran, eligen, recuerdan y conectan con marcas desde motivaciones mucho más profundas que una respuesta racional.',
        quote:
          'Una guía para mirar más allá del focus group y encontrar verdades humanas aplicables al negocio.',
        body:
          'El primer libro peruano dedicado al poder de los Consumer Insights como herramienta estratégica para marcas latinoamericanas.',
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
        imageAlt: 'Portada del libro Desnudando la Mente del Consumidor',
        action: 'Conoce más',
      },
      en: {
        title: 'Desnudando la Mente del Consumidor',
        subtitle: 'Consumer Insights in Marketing',
        intro:
          'A book about why people buy, choose, remember, and connect with brands through motivations deeper than a rational answer.',
        quote:
          'A guide to look beyond the focus group and find human truths that business can use.',
        body:
          'The first Peruvian book dedicated to Consumer Insights as a strategic tool for Latin American brands.',
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
        imageAlt: 'Cover of Desnudando la Mente del Consumidor',
        action: 'Learn more',
      },
    },
  },
  {
    slug: 'estrategias-con-calle',
    image: streetStrategyBookImage,
    year: '2019',
    publisher: 'Editorial Planeta',
    buyUrl: 'https://www.planetadelibros.com.pe/libro-estrategias-con-calle/294680',
    translations: {
      es: {
        title: 'Estrategias con Calle',
        subtitle: 'Insights y Tendencias del Consumo',
        intro:
          'Una invitación a salir del escritorio, mirar cultura viva y construir estrategias que nacen del contacto directo con las personas.',
        quote:
          'Una lectura cultural del nuevo consumidor y una ruta para marcas que quieren seguir siendo relevantes.',
        body:
          'Un libro sobre transformación cultural, consumo y marcas que necesitan pisar la calle para entender el cambio.',
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
        imageAlt: 'Portada del libro Estrategias con Calle',
        action: 'Conoce más',
      },
      en: {
        title: 'Estrategias con Calle',
        subtitle: 'Insights and Consumer Trends',
        intro:
          'An invitation to leave the desk, observe living culture, and build strategies born from direct contact with people.',
        quote:
          'A cultural reading of the new consumer and a route for brands that want to stay relevant.',
        body:
          'A book about cultural transformation, consumption, and brands that need to hit the street to understand change.',
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
        imageAlt: 'Cover of Estrategias con Calle',
        action: 'Learn more',
      },
    },
  },
];

export function getBookBySlug(slug) {
  return books.find((book) => book.slug === slug) ?? null;
}

export function getBookCopy(book, language) {
  return book.translations[language] ?? book.translations.es;
}
