import { useTranslation } from '../i18n/useTranslation';

function Resources() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t('pages.resources.title')}</h1>
      <p>{t('pages.resources.body')}</p>
    </section>
  );
}

export default Resources;
