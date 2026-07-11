import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/useTranslation';

function NotFound() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t('pages.notFound.title')}</h1>
      <p>{t('pages.notFound.body')}</p>
      <Link to="/">{t('pages.notFound.action')}</Link>
    </section>
  );
}

export default NotFound;
