import { describe, expect, it } from 'vitest';
import handler from './contact';

function createResponse() {
  return {
    body: null,
    headers: {},
    statusCode: 0,
    setHeader(key, value) {
      this.headers[key] = value;
    },
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

function createRequest(overrides = {}) {
  return {
    body: {},
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': `127.0.0.${Math.floor(Math.random() * 200) + 1}`,
    },
    method: 'POST',
    socket: {
      remoteAddress: '127.0.0.1',
    },
    ...overrides,
  };
}

describe('/api/contact', () => {
  it('rejects methods different from POST', async () => {
    const res = createResponse();

    await handler(createRequest({ method: 'GET' }), res);

    expect(res.statusCode).toBe(405);
    expect(res.body).toEqual({ ok: false, code: 'method_not_allowed' });
  });

  it('rejects invalid data', async () => {
    const res = createResponse();

    await handler(createRequest({ body: { email: 'bad-email' } }), res);

    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('invalid_request');
    expect(res.body.fieldErrors.email).toBe('invalid');
  });

  it('detects the honeypot field', async () => {
    const res = createResponse();

    await handler(
      createRequest({
        body: {
          name: 'Maria Perez',
          email: 'maria@example.com',
          need: 'Conferencia',
          message: 'Necesito una conferencia para mi equipo.',
          website: 'https://spam.example',
        },
      }),
      res
    );

    expect(res.statusCode).toBe(400);
    expect(res.body.fieldErrors.form).toBe('spam');
  });
});
