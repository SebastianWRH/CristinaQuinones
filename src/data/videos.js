export const videos = [
  {
    id: 'cuyyIQputDE',
    titles: {
      es: 'Que es un insight: la mejor forma de descubrir insights es pisando la calle',
      en: 'What an insight is: the best way to find insights is on the street',
    },
  },
  {
    id: 'uj9Iw1lN-3w',
    titles: {
      es: 'Parejas y Esposos Empresarios: como nacio Consumer Truth',
      en: 'Entrepreneur couples: how Consumer Truth was born',
    },
  },
  {
    id: 'GVdrzj-ap9Q',
    titles: {
      es: 'Podcast Marketing con Calle: 5 razones para creer en Marketing con Calle',
      en: 'Marketing con Calle podcast: 5 reasons to believe in street-smart marketing',
    },
  },
  {
    id: 'y6PERZ9Y0_U',
    titles: {
      es: 'Podcast Raul Diaz: como encontrar insights en marketing',
      en: 'Raul Diaz podcast: how to find insights in marketing',
    },
  },
  {
    id: 'vOnJdm65_y0',
    titles: {
      es: 'Imanpop Podcast: Insights con Calle, conectar antes que vender',
      en: 'Imanpop Podcast: insights with street, connecting before selling',
    },
  },
  {
    id: '1-7tQqoGxMQ',
    titles: {
      es: 'Lideres PUCP: Consumer Insights y desnudando la mente del consumidor',
      en: 'Lideres PUCP: consumer insights and uncovering the consumer mind',
    },
  },
  {
    id: 'K4pF3fQO39E',
    titles: {
      es: 'Podcast con Ximena Delgado: la clave para conectar con tu publico',
      en: 'Podcast with Ximena Delgado: the key to connecting with your audience',
    },
  },
  {
    id: '6IcXKEpbDQU',
    titles: {
      es: 'Fuera de la Caja: psicologia del consumidor, marketing y tendencias',
      en: 'Fuera de la Caja: consumer psychology, marketing and trends',
    },
  },
  {
    id: '8pjk4JwpACA',
    titles: {
      es: 'Cafe Taipa: los insights que la IA no ve definen la reputacion',
      en: 'Cafe Taipa: the insights AI cannot see define reputation',
    },
  },
];

export function getVideoTitle(video, language) {
  return video.titles[language] ?? video.titles.es;
}

export function getVideoThumbnail(video) {
  return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
}

export function getVideoWatchUrl(video) {
  return `https://www.youtube.com/watch?v=${video.id}`;
}

export function getVideoEmbedUrl(video) {
  return `https://www.youtube-nocookie.com/embed/${video.id}?rel=0`;
}
