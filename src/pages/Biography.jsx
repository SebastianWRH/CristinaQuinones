import { useTranslation } from '../i18n/useTranslation';

function Biography() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t('pages.biography.title')}</h1>
      <p>{t('pages.biography.body')}</p>
    </section>
  );
}

export default Biography;
