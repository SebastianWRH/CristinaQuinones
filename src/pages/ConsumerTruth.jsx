import { useTranslation } from '../i18n/useTranslation';

function ConsumerTruth() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t('pages.consumerTruth.title')}</h1>
      <p>{t('pages.consumerTruth.body')}</p>
    </section>
  );
}

export default ConsumerTruth;
