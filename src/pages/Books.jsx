import { useTranslation } from '../i18n/useTranslation';

function Books() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t('pages.books.title')}</h1>
      <p>{t('pages.books.body')}</p>
    </section>
  );
}

export default Books;
