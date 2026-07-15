import { Link } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { useTranslation } from '../i18n/useTranslation';
import styles from './NotFound.module.css';

function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={`${t('pages.notFound.title')} | Cristina Quiñones`}
        description={t('pages.notFound.body')}
        canonical="/404"
        robots="noindex, nofollow"
      />

      <section className={styles.notFound}>
        <div>
          <p>404</p>
          <h1>{t('pages.notFound.title')}</h1>
          <p>{t('pages.notFound.body')}</p>
          <Link to="/">{t('pages.notFound.action')}</Link>
        </div>
      </section>
    </>
  );
}

export default NotFound;
