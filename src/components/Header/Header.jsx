import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from '../../i18n/useTranslation';
import styles from './Header.module.css';

const navItems = [
  {
    href: '/#sobre-mi',
    labelKey: 'navigation.story',
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
    href: '/#laboratorio',
    labelKey: 'navigation.lab',
  },
  {
    href: '/#contacto',
    labelKey: 'navigation.contact',
  },
];

function Header() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo} aria-label="Cristina Q">
        Cristina<span>Q</span>
      </a>

      <div className={styles.headerActions}>
        <nav className={styles.nav} aria-label="Principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {t(item.labelKey)}
            </a>
          ))}
        </nav>

        <div className={styles.tools}>
          <a href="/#contacto" className={styles.cta}>
            {t('navigation.hire')}
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Header;
