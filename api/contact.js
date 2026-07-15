import { validateContactPayload } from '../src/utils/contactValidation.js';

const MAX_REQUEST_BYTES = 8000;
const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitStore = new Map();

function sendJson(res, status, body) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.status(status).json(body);
}

function getClientKey(req) {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.socket?.remoteAddress ?? 'anonymous';
}

function isRateLimited(req) {
  const now = Date.now();
  const clientKey = getClientKey(req);
  const requests = (rateLimitStore.get(clientKey) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS
  );

  requests.push(now);
  rateLimitStore.set(clientKey, requests);

  return requests.length > MAX_REQUESTS_PER_WINDOW;
}

async function readJsonBody(req) {
  if (req.body !== undefined) {
    if (typeof req.body === 'string') {
      return JSON.parse(req.body);
    }

    return req.body;
  }

  let size = 0;
  const chunks = [];

  for await (const chunk of req) {
    size += chunk.length;

    if (size > MAX_REQUEST_BYTES) {
      const error = new Error('Body too large');
      error.code = 'body_too_large';
      throw error;
    }

    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  return rawBody ? JSON.parse(rawBody) : {};
}

function buildEmailText(data) {
  return [
    'Nuevo mensaje desde cristinaquinones.com',
    '',
    `Nombre: ${data.name}`,
    `Empresa: ${data.company || 'No indicada'}`,
    `Correo: ${data.email}`,
    `Pais: ${data.country || 'No indicado'}`,
    `Tipo de solicitud: ${data.need}`,
    '',
    'Mensaje:',
    data.message,
  ].join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { ok: false, code: 'method_not_allowed' });
    return;
  }

  const contentType = req.headers['content-type'] ?? '';

  if (!contentType.includes('application/json')) {
    sendJson(res, 415, { ok: false, code: 'unsupported_media_type' });
    return;
  }

  if (isRateLimited(req)) {
    sendJson(res, 429, { ok: false, code: 'rate_limited' });
    return;
  }

  let payload;

  try {
    payload = await readJsonBody(req);
  } catch (error) {
    sendJson(res, error.code === 'body_too_large' ? 413 : 400, {
      ok: false,
      code: 'invalid_json',
    });
    return;
  }

  const { fieldErrors, normalized, valid } = validateContactPayload(payload);

  if (!valid) {
    sendJson(res, 400, {
      ok: false,
      code: 'invalid_request',
      fieldErrors,
    });
    return;
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    sendJson(res, 500, { ok: false, code: 'missing_configuration' });
    return;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: normalized.email,
        subject: `Contacto web: ${normalized.need}`,
        text: buildEmailText(normalized),
      }),
    });

    if (!response.ok) {
      sendJson(res, 502, { ok: false, code: 'email_provider_error' });
      return;
    }

    sendJson(res, 200, { ok: true });
  } catch {
    sendJson(res, 502, { ok: false, code: 'email_provider_error' });
  }
}
