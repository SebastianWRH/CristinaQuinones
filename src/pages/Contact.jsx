import { useTranslation } from '../i18n/useTranslation';

function Contact() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t('pages.contact.title')}</h1>
      <p>{t('pages.contact.body')}</p>
    </section>
  );
}

export default Contact;
