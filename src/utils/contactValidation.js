const ALLOWED_FIELDS = [
  'name',
  'company',
  'email',
  'country',
  'need',
  'message',
  'website',
];

const LIMITS = {
  name: 90,
  company: 120,
  email: 160,
  country: 80,
  need: 120,
  message: 2000,
  minName: 2,
  minMessage: 20,
  maxBodyBytes: 8000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function hasUnknownFields(payload) {
  return Object.keys(payload).some((key) => !ALLOWED_FIELDS.includes(key));
}

export function normalizeContactPayload(payload) {
  const source = payload && typeof payload === 'object' ? payload : {};

  return {
    name: asString(source.name),
    company: asString(source.company),
    email: asString(source.email).toLowerCase(),
    country: asString(source.country),
    need: asString(source.need),
    message: asString(source.message),
    website: asString(source.website),
  };
}

export function validateContactPayload(payload) {
  const fieldErrors = {};
  const normalized = normalizeContactPayload(payload);

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {
      fieldErrors: { form: 'invalidPayload' },
      normalized,
      valid: false,
    };
  }

  if (hasUnknownFields(payload)) {
    fieldErrors.form = 'unknownFields';
  }

  if (JSON.stringify(payload).length > LIMITS.maxBodyBytes) {
    fieldErrors.form = 'bodyTooLarge';
  }

  if (normalized.website) {
    fieldErrors.form = 'spam';
  }

  if (normalized.name.length < LIMITS.minName) {
    fieldErrors.name = 'required';
  } else if (normalized.name.length > LIMITS.name) {
    fieldErrors.name = 'tooLong';
  }

  if (normalized.company.length > LIMITS.company) {
    fieldErrors.company = 'tooLong';
  }

  if (!EMAIL_PATTERN.test(normalized.email)) {
    fieldErrors.email = 'invalid';
  } else if (normalized.email.length > LIMITS.email) {
    fieldErrors.email = 'tooLong';
  }

  if (normalized.country.length > LIMITS.country) {
    fieldErrors.country = 'tooLong';
  }

  if (!normalized.need) {
    fieldErrors.need = 'required';
  } else if (normalized.need.length > LIMITS.need) {
    fieldErrors.need = 'tooLong';
  }

  if (normalized.message.length < LIMITS.minMessage) {
    fieldErrors.message = 'tooShort';
  } else if (normalized.message.length > LIMITS.message) {
    fieldErrors.message = 'tooLong';
  }

  return {
    fieldErrors,
    normalized,
    valid: Object.keys(fieldErrors).length === 0,
  };
}
