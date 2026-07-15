export const testimonials = [
  {
    initials: 'MS',
    name: 'Martín Saldaña',
    role: 'CEO · Unión',
    quote: {
      es: 'Gracias a Consumer Truth entendimos que no basta con quedarse en el escritorio. Hay que salir a buscar al consumidor en las calles.',
      en: 'Thanks to Consumer Truth, we understood that staying at the desk is not enough. You have to go find consumers in the streets.',
    },
  },
  {
    initials: 'SB',
    name: 'Sandra Botetano',
    role: {
      es: 'Jefe de Marketing · UTP',
      en: 'Head of Marketing · UTP',
    },
    quote: {
      es: 'Nos enseñaron a buscar siempre un poco más adentro para encontrar aquellos insights verdaderamente relevantes para el negocio.',
      en: 'They taught us to keep looking deeper to find insights that are truly relevant to the business.',
    },
  },
  {
    initials: 'CV',
    name: 'Claudia Vidaurrazaga',
    role: {
      es: 'Gerente Comercial · La Ibérica',
      en: 'Commercial Manager · La Ibérica',
    },
    quote: {
      es: 'Hemos podido conocer, de primera mano, las emociones que mueven a nuestros consumidores. Una experiencia que cambió nuestra forma de hacer marketing.',
      en: 'We were able to experience first-hand the emotions that move our consumers. It changed the way we do marketing.',
    },
  },
  {
    initials: 'AG',
    name: 'Andrea Guzmán',
    role: 'Brand Manager · Ajinomoto',
    quote: {
      es: 'Nos han permitido desnudar nuestra mente, cambiar nuestra forma de pensar y de ver las cosas. Trabajar con Cristina es una transformación, no una consultoría.',
      en: 'They allowed us to uncover our mindset, change the way we think and see things. Working with Cristina is a transformation, not just consulting.',
    },
  },
  {
    initials: 'LV',
    name: 'Laura Villanueva',
    role: {
      es: 'Gerente de Marca · Mibanco',
      en: 'Brand Manager · Mibanco',
    },
    quote: {
      es: 'Compartimos su espíritu, su energía y su pasión por el consumidor. Nos enseñaron a Pisar la Calle, y eso cambió la forma en que construimos nuestra marca.',
      en: 'We share her spirit, energy and passion for the consumer. They taught us to hit the street, and that changed how we build our brand.',
    },
  },
  {
    initials: 'CG',
    name: 'Carlos González-Artigas',
    role: {
      es: 'Gerente General · La Fabril, Ecuador',
      en: 'General Manager · La Fabril, Ecuador',
    },
    quote: {
      es: 'Esta experiencia me ha ratificado que tener al consumidor en el centro de la estrategia es lo correcto. Y Cristina lo demuestra con cada metodología.',
      en: 'This experience confirmed that putting the consumer at the center of strategy is the right thing to do. Cristina proves it with every methodology.',
    },
  },
];

export function getLocalizedTestimonial(testimonial, language) {
  return {
    ...testimonial,
    quote: testimonial.quote[language] ?? testimonial.quote.es,
    role:
      typeof testimonial.role === 'string'
        ? testimonial.role
        : testimonial.role[language] ?? testimonial.role.es,
  };
}
