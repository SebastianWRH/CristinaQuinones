import { useTranslation } from '../i18n/useTranslation';

function Conferences() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t('pages.conferences.title')}</h1>
      <p>{t('pages.conferences.body')}</p>
    </section>
  );
}

export default Conferences;
