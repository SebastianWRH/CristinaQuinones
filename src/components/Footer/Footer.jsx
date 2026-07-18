import { Link } from 'react-router-dom';
import RevealOnScroll from '../RevealOnScroll/RevealOnScroll';
import { useTranslation } from '../../i18n/useTranslation';
import styles from './Footer.module.css';

const navLinks = [
  {
    to: '/#sobre-mi',
    labelKey: 'navigation.story',
  },
  {
    to: '/#frases',
    labelKey: 'home.thinking.label',
  },
  {
    to: '/#conferencias',
    labelKey: 'navigation.conferences',
  },
  {
    to: '/#libros',
    labelKey: 'navigation.books',
  },
  {
    to: '/#consumer-truth',
    labelKey: 'navigation.consumerTruth',
  },
  {
    to: '/#contacto',
    labelKey: 'navigation.contact',
  },
];

function Footer() {
  const { language, t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <RevealOnScroll as="div" className={styles.brand} direction="up" distance={34} duration={820} blur={5}>
        <Link to="/" className={styles.logo}>
          Cristina<span>Q</span>
        </Link>
        <p>{t('footer.quote')}</p>
        <div
          className={styles.socials}
          aria-label={language === 'es' ? 'Redes sociales' : 'Social media'}
        >
          <a
            href="https://www.linkedin.com/in/crisquinones/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            IN
          </a>
          <a
            href="https://www.instagram.com/cristina_qd/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            IG
          </a>
          <a
            href="https://www.youtube.com/@Consumer_Truth"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            YT
          </a>
        </div>
      </RevealOnScroll>

      <RevealOnScroll as="div" delay={100} direction="up" distance={34} duration={820} blur={5}>
        <h2>{t('footer.navTitle')}</h2>
        <nav>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>
      </RevealOnScroll>

      <RevealOnScroll as="div" delay={200} direction="up" distance={34} duration={820} blur={5}>
        <h2>{t('footer.bookTitle')}</h2>
        <nav>
          <a
            href="https://consumer-truth.com.pe/libro/"
            target="_blank"
            rel="noreferrer"
          >
            Desnudando la Mente del Consumidor
          </a>
          <a
            href="https://consumer-truth.com.pe/libro-estrategias-con-calle/"
            target="_blank"
            rel="noreferrer"
          >
            Estrategias con Calle
          </a>
        </nav>
      </RevealOnScroll>

      <RevealOnScroll as="div" delay={300} direction="up" distance={34} duration={820} blur={5}>
        <h2>{t('footer.contactTitle')}</h2>
        <nav>
          <a href="mailto:info@cristinaquinones.com">info@cristinaquinones.com</a>
          <a href="https://consumer-truth.com.pe/" target="_blank" rel="noreferrer">
            {t('footer.consumerTruth')}
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=51998244997"
            target="_blank"
            rel="noreferrer"
          >
            {t('footer.whatsapp')}
          </a>
        </nav>
      </RevealOnScroll>

      <RevealOnScroll as="div" className={styles.bottom} delay={120} direction="up" distance={24} duration={760} blur={3}>
        <p>{t('footer.rights')}</p>
        <p>{t('footer.location')}</p>
      </RevealOnScroll>
    </footer>
  );
}

export default Footer;
