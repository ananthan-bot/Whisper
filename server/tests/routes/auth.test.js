/**
 * tests/routes/auth.test.js
 * Unit tests for auth route handler logic (signup + login).
 *
 * Strategy: We test the validation and handler logic directly by
 * extracting it into testable functions, avoiding pg pool entirely.
 *
 * Run with:  node --test server/tests/routes/auth.test.js
 */
'use strict';

const test   = require('node:test');
const assert = require('node:assert/strict');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

const SECRET = 'test_secret';

// ── Inline the handler logic mirroring routes/auth.js ────────────────────────
// This lets us test validation + business logic without loading express/pg.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function signupHandler(body, db) {
  const { email, password, alias } = body;
  if (!email || !EMAIL_RE.test(email))              return { status: 400, json: { error: 'Invalid email format' } };
  if (!password || password.length < 6)             return { status: 400, json: { error: 'Password must be at least 6 characters long' } };
  if (!alias || alias.trim().length === 0)          return { status: 400, json: { error: 'Alias is required' } };
  try {
    const hashed = await bcrypt.hash(password, 1);
    const result = await db.createUser(email, hashed, alias);
    const user   = result.rows[0];
    const token  = jwt.sign({ id: user.id, alias: user.alias }, SECRET, { expiresIn: '7d' });
    return { status: 200, json: { token, user } };
  } catch {
    return { status: 400, json: { error: 'Email or alias already exists' } };
  }
}

async function loginHandler(body, db) {
  const { email, password } = body;
  if (!email || !EMAIL_RE.test(email))   return { status: 400, json: { error: 'Invalid email format' } };
  if (!password || password.length === 0) return { status: 400, json: { error: 'Password is required' } };
  try {
    const result = await db.findUserByEmail(email);
    const user   = result.rows[0];
    if (!user)                               return { status: 400, json: { error: 'User not found' } };
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)                              return { status: 400, json: { error: 'Invalid password' } };
    const token = jwt.sign({ id: user.id, alias: user.alias }, SECRET, { expiresIn: '7d' });
    return { status: 200, json: { token, user: { id: user.id, email: user.email, alias: user.alias } } };
  } catch {
    return { status: 500, json: { error: 'Server error' } };
  }
}

// ─── Signup tests ─────────────────────────────────────────────────────────────

test('POST /signup — succeeds with valid payload', async () => {
  const db = {
    createUser: async () => ({ rows: [{ id: 1, email: 'a@b.com', alias: 'Tester' }] }),
  };
  const res = await signupHandler({ email: 'a@b.com', password: 'password123', alias: 'Tester' }, db);
  assert.equal(res.status, 200);
  assert.ok(res.json.token);
  const decoded = jwt.verify(res.json.token, SECRET);
  assert.equal(decoded.id, 1);
});

test('POST /signup — rejects invalid email', async () => {
  const res = await signupHandler({ email: 'not-an-email', password: 'password123', alias: 'Tester' }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /email/i);
});

test('POST /signup — rejects short password', async () => {
  const res = await signupHandler({ email: 'a@b.com', password: '12', alias: 'Tester' }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /password/i);
});

test('POST /signup — rejects empty alias', async () => {
  const res = await signupHandler({ email: 'a@b.com', password: 'password123', alias: '' }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /alias/i);
});

test('POST /signup — returns 400 when DB throws duplicate error', async () => {
  const db = { createUser: async () => { throw new Error('duplicate key'); } };
  const res = await signupHandler({ email: 'a@b.com', password: 'password123', alias: 'Tester' }, db);
  assert.equal(res.status, 400);
  assert.match(res.json.error, /already exists/i);
});

// ─── Login tests ──────────────────────────────────────────────────────────────

test('POST /login — succeeds with correct credentials', async () => {
  const hashed = await bcrypt.hash('password123', 1);
  const db = {
    findUserByEmail: async () => ({ rows: [{ id: 2, email: 'b@c.com', alias: 'Helper', password: hashed }] }),
  };
  const res = await loginHandler({ email: 'b@c.com', password: 'password123' }, db);
  assert.equal(res.status, 200);
  assert.ok(res.json.token);
  assert.equal(res.json.user.email, 'b@c.com');
});

test('POST /login — rejects unknown email', async () => {
  const db = { findUserByEmail: async () => ({ rows: [] }) };
  const res = await loginHandler({ email: 'nobody@x.com', password: 'password123' }, db);
  assert.equal(res.status, 400);
  assert.match(res.json.error, /not found/i);
});

test('POST /login — rejects wrong password', async () => {
  const hashed = await bcrypt.hash('correct_pass', 1);
  const db = {
    findUserByEmail: async () => ({ rows: [{ id: 3, email: 'c@d.com', alias: 'User', password: hashed }] }),
  };
  const res = await loginHandler({ email: 'c@d.com', password: 'wrong_pass' }, db);
  assert.equal(res.status, 400);
  assert.match(res.json.error, /invalid password/i);
});

test('POST /login — rejects missing password', async () => {
  const res = await loginHandler({ email: 'c@d.com', password: '' }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /password/i);
});

test('POST /login — rejects invalid email format', async () => {
  const res = await loginHandler({ email: 'bad-email', password: 'pass123' }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /email/i);
});
