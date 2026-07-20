/**
 * tests/routes/ratings.test.js
 * Unit tests for POST / (submit rating) and GET /helper/:helperId handlers.
 *
 * Run with:  node --test server/tests/routes/ratings.test.js
 */
'use strict';

const test   = require('node:test');
const assert = require('node:assert/strict');

// ── Inline handler logic (mirrors routes/ratings.js) ─────────────────────────

async function createRatingHandler(body, db) {
  const { task_id, helper_id, rating, review } = body;
  if (!task_id || !helper_id)
    return { status: 400, json: { error: 'task_id and helper_id are required' } };
  if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5)
    return { status: 400, json: { error: 'rating must be an integer between 1 and 5' } };
  try {
    const result = await db.createRating(task_id, helper_id, rating, review);
    return { status: 200, json: result.rows[0] };
  } catch {
    return { status: 500, json: { error: 'Server error' } };
  }
}

async function getHelperRatingHandler(helperId, db) {
  try {
    const result = await db.getHelperRatingSummary(helperId);
    return { status: 200, json: result.rows[0] };
  } catch {
    return { status: 500, json: { error: 'Server error' } };
  }
}

// ─── POST rating ──────────────────────────────────────────────────────────────

test('POST / — creates a rating with valid payload', async () => {
  const created = { id: 1, task_id: 'TASK-1', helper_id: 5, rating: 4, review: 'Great!' };
  const db = { createRating: async () => ({ rows: [created] }) };
  const body = { task_id: 'TASK-1', helper_id: 5, rating: 4, review: 'Great!' };
  const res = await createRatingHandler(body, db);
  assert.equal(res.status, 200);
  assert.equal(res.json.rating, 4);
});

test('POST / — accepts rating of 1 (minimum)', async () => {
  const db = { createRating: async () => ({ rows: [{ rating: 1 }] }) };
  const res = await createRatingHandler({ task_id: 'T', helper_id: 1, rating: 1 }, db);
  assert.equal(res.status, 200);
});

test('POST / — accepts rating of 5 (maximum)', async () => {
  const db = { createRating: async () => ({ rows: [{ rating: 5 }] }) };
  const res = await createRatingHandler({ task_id: 'T', helper_id: 1, rating: 5 }, db);
  assert.equal(res.status, 200);
});

test('POST / — rejects rating of 0', async () => {
  const res = await createRatingHandler({ task_id: 'T', helper_id: 1, rating: 0 }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /rating/i);
});

test('POST / — rejects rating of 6', async () => {
  const res = await createRatingHandler({ task_id: 'T', helper_id: 1, rating: 6 }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /rating/i);
});

test('POST / — rejects string rating', async () => {
  const res = await createRatingHandler({ task_id: 'T', helper_id: 1, rating: '4' }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /rating/i);
});

test('POST / — rejects missing task_id', async () => {
  const res = await createRatingHandler({ helper_id: 1, rating: 3 }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /task_id/i);
});

test('POST / — rejects missing helper_id', async () => {
  const res = await createRatingHandler({ task_id: 'TASK-1', rating: 3 }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /helper_id/i);
});

test('POST / — returns 500 on DB error', async () => {
  const db = { createRating: async () => { throw new Error('DB'); } };
  const res = await createRatingHandler({ task_id: 'T', helper_id: 1, rating: 5 }, db);
  assert.equal(res.status, 500);
});

// ─── GET helper rating summary ────────────────────────────────────────────────

test('GET /helper/:helperId — returns rating summary', async () => {
  const summary = { average: '4.5', total: '10' };
  const db = { getHelperRatingSummary: async () => ({ rows: [summary] }) };
  const res = await getHelperRatingHandler('42', db);
  assert.equal(res.status, 200);
  assert.equal(res.json.average, '4.5');
  assert.equal(res.json.total, '10');
});

test('GET /helper/:helperId — returns 500 on DB error', async () => {
  const db = { getHelperRatingSummary: async () => { throw new Error('DB'); } };
  const res = await getHelperRatingHandler('42', db);
  assert.equal(res.status, 500);
});
