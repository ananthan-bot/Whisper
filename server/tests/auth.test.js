/**
 * tests/auth.test.js
 * Unit tests for server/middleware/auth.js
 *
 * Run with:  node --test server/tests/auth.test.js
 */
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');

// ── Inline the middleware so we don't need dotenv loaded ─────────────────────
const SECRET = 'test_secret';
process.env.JWT_SECRET = SECRET;
const authMiddleware = require('../middleware/auth');

// ── Helpers ──────────────────────────────────────────────────────────────────
function makeRes() {
  const res = { _status: 200, _body: null };
  res.status = (code) => { res._status = code; return res; };
  res.json   = (body)  => { res._body  = body; return res; };
  return res;
}

// ─────────────────────────────────────────────────────────────────────────────
test('auth middleware — passes when token is valid', async () => {
  const token = jwt.sign({ id: 1, alias: 'TestUser' }, SECRET, { expiresIn: '1h' });
  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = makeRes();
  let nextCalled = false;

  authMiddleware(req, res, () => { nextCalled = true; });

  assert.ok(nextCalled, 'next() should have been called');
  assert.equal(req.user.id, 1);
  assert.equal(req.user.alias, 'TestUser');
});

test('auth middleware — rejects request with no token', () => {
  const req = { headers: {} };
  const res = makeRes();

  authMiddleware(req, res, () => {});

  assert.equal(res._status, 401);
  assert.equal(res._body.error, 'No token provided');
});

test('auth middleware — rejects request with malformed token', () => {
  const req = { headers: { authorization: 'Bearer not.a.real.token' } };
  const res = makeRes();

  authMiddleware(req, res, () => {});

  assert.equal(res._status, 401);
  assert.equal(res._body.error, 'Invalid token');
});

test('auth middleware — rejects token signed with wrong secret', () => {
  const token = jwt.sign({ id: 99 }, 'wrong_secret', { expiresIn: '1h' });
  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = makeRes();

  authMiddleware(req, res, () => {});

  assert.equal(res._status, 401);
  assert.equal(res._body.error, 'Invalid token');
});

test('auth middleware — rejects expired token', () => {
  const token = jwt.sign({ id: 2 }, SECRET, { expiresIn: '-1s' });
  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = makeRes();

  authMiddleware(req, res, () => {});

  assert.equal(res._status, 401);
  assert.equal(res._body.error, 'Invalid token');
});
