import { useTranslation } from '../i18n/useTranslation';

function Method() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t('pages.method.title')}</h1>
      <p>{t('pages.method.body')}</p>
    </section>
  );
}

export default Method;
