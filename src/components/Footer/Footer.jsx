import { useTranslation } from '../../i18n/useTranslation';
import styles from './Footer.module.css';

const navLinks = [
  {
    href: '/#sobre-mi',
    labelKey: 'navigation.story',
  },
  {
    href: '/#frases',
    labelKey: 'home.thinking.label',
  },
  {
    href: '/#conferencias',
    labelKey: 'navigation.conferences',
  },
  {
    href: '/#libros',
    labelKey: 'navigation.books',
  },
  {
    href: '/#consumer-truth',
    labelKey: 'navigation.consumerTruth',
  },
  {
    href: '/#contacto',
    labelKey: 'navigation.contact',
  },
];

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <a href="/" className={styles.logo}>
          Cristina<span>Q</span>
        </a>
        <p>{t('footer.quote')}</p>
        <div className={styles.socials} aria-label="Social media">
          <a
            href="https://www.linkedin.com/in/crisquinones/"
            target="_blank"
            rel="noreferrer"
          >
            in
          </a>
          <a
            href="https://www.instagram.com/cristina_qd/"
            target="_blank"
            rel="noreferrer"
          >
            ig
          </a>
          <a
            href="https://www.youtube.com/@Consumer_Truth"
            target="_blank"
            rel="noreferrer"
          >
            yt
          </a>
        </div>
      </div>

      <div>
        <h2>{t('footer.navTitle')}</h2>
        <nav>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {t(link.labelKey)}
            </a>
          ))}
        </nav>
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <div className={styles.bottom}>
        <p>{t('footer.rights')}</p>
        <p>{t('footer.location')}</p>
      </div>
    </footer>
  );
}

export default Footer;
