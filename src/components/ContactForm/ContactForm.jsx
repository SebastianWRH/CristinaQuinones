import { useEffect, useMemo, useRef, useState } from 'react';
import { validateContactPayload } from '../../utils/contactValidation';
import { useTranslation } from '../../i18n/useTranslation';
import styles from './ContactForm.module.css';

const initialValues = {
  name: '',
  company: '',
  email: '',
  country: '',
  need: '',
  message: '',
  website: '',
};

const copy = {
  es: {
    required: 'Este campo es obligatorio.',
    nameRequired: 'Ingresa un nombre válido.',
    emailInvalid: 'Ingresa un correo válido.',
    messageTooShort: 'El mensaje debe tener al menos 20 caracteres.',
    tooLong: 'El texto es demasiado largo.',
    unknownFields: 'La solicitud contiene campos no permitidos.',
    bodyTooLarge: 'La solicitud es demasiado grande.',
    spam: 'No se pudo procesar la solicitud.',
    sending: 'Enviando...',
    success: 'Mensaje enviado. Gracias, te responderemos pronto.',
    error: 'No pudimos enviar el mensaje. Inténtalo nuevamente.',
    configError: 'El formulario aún no está configurado para enviar correos.',
    requiredHint: 'Campo obligatorio',
  },
  en: {
    required: 'This field is required.',
    nameRequired: 'Enter a valid name.',
    emailInvalid: 'Enter a valid email address.',
    messageTooShort: 'The message must be at least 20 characters.',
    tooLong: 'This text is too long.',
    unknownFields: 'The request contains unsupported fields.',
    bodyTooLarge: 'The request is too large.',
    spam: 'The request could not be processed.',
    sending: 'Sending...',
    success: 'Message sent. Thank you, we will reply soon.',
    error: 'We could not send the message. Please try again.',
    configError: 'The form is not configured to send email yet.',
    requiredHint: 'Required field',
  },
};

const fieldOrder = ['name', 'email', 'need', 'message'];

function getFieldMessage(errorKey, language, fieldName) {
  const messages = copy[language] ?? copy.es;

  if (!errorKey) {
    return '';
  }

  if (fieldName === 'name' && errorKey === 'required') {
    return messages.nameRequired;
  }

  if (fieldName === 'email' && errorKey === 'invalid') {
    return messages.emailInvalid;
  }

  if (fieldName === 'message' && errorKey === 'tooShort') {
    return messages.messageTooShort;
  }

  if (errorKey === 'tooLong') {
    return messages.tooLong;
  }

  return messages.required;
}

function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const formRef = useRef(null);
  const { language, t, tArray } = useTranslation();
  const messages = copy[language] ?? copy.es;
  const requestOptions = tArray('home.contact.options');

  const hasErrors = useMemo(
    () => Object.keys(errors).some((key) => key !== 'form'),
    [errors]
  );

  useEffect(() => {
    if (!hasErrors) {
      return;
    }

    const firstInvalidField = fieldOrder.find((field) => errors[field]);
    formRef.current?.elements[firstInvalidField]?.focus();
  }, [errors, hasErrors]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === 'sending') {
      return;
    }

    const result = validateContactPayload(values);

    if (!result.valid) {
      setErrors(result.fieldErrors);
      setStatus('idle');
      setStatusMessage(
        result.fieldErrors.form ? messages[result.fieldErrors.form] : ''
      );
      return;
    }

    setStatus('sending');
    setErrors({});
    setStatusMessage(messages.sending);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.normalized),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus('error');
        setErrors(data.fieldErrors ?? {});
        setStatusMessage(
          data.code === 'missing_configuration'
            ? messages.configError
            : messages.error
        );
        return;
      }

      setStatus('success');
      setValues(initialValues);
      setStatusMessage(messages.success);
    } catch {
      setStatus('error');
      setStatusMessage(messages.error);
    }
  };

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
      <h3>{t('home.contact.formTitle')}</h3>
      <p>{t('home.contact.formIntro')}</p>

      <label htmlFor="contact-name">
        <span>
          {t('home.contact.fields.name')}
          <small>{messages.requiredHint}</small>
        </span>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          required
        />
        {errors.name ? (
          <span id="contact-name-error" className={styles.error}>
            {getFieldMessage(errors.name, language, 'name')}
          </span>
        ) : null}
      </label>

      <label htmlFor="contact-company">
        <span>{t('home.contact.fields.company')}</span>
        <input
          id="contact-company"
          type="text"
          name="company"
          value={values.company}
          onChange={handleChange}
          autoComplete="organization"
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? 'contact-company-error' : undefined}
        />
        {errors.company ? (
          <span id="contact-company-error" className={styles.error}>
            {getFieldMessage(errors.company, language, 'company')}
          </span>
        ) : null}
      </label>

      <label htmlFor="contact-email">
        <span>
          {t('home.contact.fields.email')}
          <small>{messages.requiredHint}</small>
        </span>
        <input
          id="contact-email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          required
        />
        {errors.email ? (
          <span id="contact-email-error" className={styles.error}>
            {getFieldMessage(errors.email, language, 'email')}
          </span>
        ) : null}
      </label>

      <label htmlFor="contact-country">
        <span>{t('home.contact.fields.country')}</span>
        <input
          id="contact-country"
          type="text"
          name="country"
          value={values.country}
          onChange={handleChange}
          autoComplete="country-name"
          aria-invalid={Boolean(errors.country)}
          aria-describedby={errors.country ? 'contact-country-error' : undefined}
        />
        {errors.country ? (
          <span id="contact-country-error" className={styles.error}>
            {getFieldMessage(errors.country, language, 'country')}
          </span>
        ) : null}
      </label>

      <label className={styles.fullField} htmlFor="contact-need">
        <span>
          {t('home.contact.fields.need')}
          <small>{messages.requiredHint}</small>
        </span>
        <select
          id="contact-need"
          name="need"
          value={values.need}
          onChange={handleChange}
          aria-invalid={Boolean(errors.need)}
          aria-describedby={errors.need ? 'contact-need-error' : undefined}
          required
        >
          <option value="" disabled>
            {t('home.contact.fields.need')}
          </option>
          {requestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.need ? (
          <span id="contact-need-error" className={styles.error}>
            {getFieldMessage(errors.need, language, 'need')}
          </span>
        ) : null}
      </label>

      <label className={styles.fullField} htmlFor="contact-message">
        <span>
          {t('home.contact.fields.message')}
          <small>{messages.requiredHint}</small>
        </span>
        <textarea
          id="contact-message"
          name="message"
          rows="5"
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          required
        />
        {errors.message ? (
          <span id="contact-message-error" className={styles.error}>
            {getFieldMessage(errors.message, language, 'message')}
          </span>
        ) : null}
      </label>

      <label className={styles.honeypot} htmlFor="contact-website">
        Website
        <input
          id="contact-website"
          type="text"
          name="website"
          value={values.website}
          onChange={handleChange}
          autoComplete="off"
          tabIndex="-1"
        />
      </label>

      {errors.form ? (
        <p className={styles.formError}>{messages[errors.form] ?? messages.error}</p>
      ) : null}

      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? messages.sending : t('home.contact.submit')}
      </button>

      <p
        className={`${styles.status} ${
          status === 'success' ? styles.statusSuccess : ''
        }`}
        role="status"
        aria-live="polite"
      >
        {statusMessage}
      </p>
    </form>
  );
}

export default ContactForm;
