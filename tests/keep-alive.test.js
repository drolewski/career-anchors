import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/keep-alive.js';

function response() {
  return {
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

test('health check fails closed and rejects unsupported methods without querying a database', async () => {
  const original = process.env.CRON_SECRET;
  try {
    delete process.env.CRON_SECRET;
    let res = response();
    await handler({ method: 'GET', headers: {} }, res);
    assert.equal(res.statusCode, 401);

    process.env.CRON_SECRET = 'synthetic-test-value';
    res = response();
    await handler({ method: 'GET', headers: { authorization: 'Bearer incorrect' } }, res);
    assert.equal(res.statusCode, 401);

    res = response();
    await handler({ method: 'POST', headers: { authorization: 'Bearer synthetic-test-value' } }, res);
    assert.equal(res.statusCode, 405);
    assert.equal(res.headers.Allow, 'GET');
  } finally {
    if (original === undefined) delete process.env.CRON_SECRET;
    else process.env.CRON_SECRET = original;
  }
});
