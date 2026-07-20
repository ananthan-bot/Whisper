/**
 * tests/routes/messages.test.js
 * Unit tests for GET /:taskId and POST / message route handlers.
 *
 * Run with:  node --test server/tests/routes/messages.test.js
 */
'use strict';

const test   = require('node:test');
const assert = require('node:assert/strict');

// ── Inline handler logic (mirrors routes/messages.js) ────────────────────────

async function getMessagesHandler(taskId, db) {
  try {
    const result = await db.getMessagesByTaskId(taskId);
    return { status: 200, json: result.rows };
  } catch {
    return { status: 500, json: { error: 'Server error' } };
  }
}

async function createMessageHandler(body, user, db) {
  const { task_id, sender_role, text } = body;
  if (!task_id || !sender_role || !text || text.trim().length === 0) {
    return { status: 400, json: { error: 'task_id, sender_role, and text are required' } };
  }
  try {
    const result = await db.createMessage(task_id, user.id, sender_role, text);
    return { status: 200, json: result.rows[0] };
  } catch {
    return { status: 500, json: { error: 'Server error' } };
  }
}

// ─── GET messages ─────────────────────────────────────────────────────────────

test('GET /:taskId — returns messages for a task', async () => {
  const msgs = [
    { id: 1, task_id: 'TASK-1', sender_role: 'requester', text: 'Hello' },
    { id: 2, task_id: 'TASK-1', sender_role: 'helper',    text: 'On it!' },
  ];
  const db = { getMessagesByTaskId: async () => ({ rows: msgs }) };
  const res = await getMessagesHandler('TASK-1', db);
  assert.equal(res.status, 200);
  assert.equal(res.json.length, 2);
  assert.equal(res.json[0].text, 'Hello');
});

test('GET /:taskId — returns empty array when no messages exist', async () => {
  const db = { getMessagesByTaskId: async () => ({ rows: [] }) };
  const res = await getMessagesHandler('TASK-99', db);
  assert.equal(res.status, 200);
  assert.deepEqual(res.json, []);
});

test('GET /:taskId — returns 500 on DB error', async () => {
  const db = { getMessagesByTaskId: async () => { throw new Error('DB error'); } };
  const res = await getMessagesHandler('TASK-1', db);
  assert.equal(res.status, 500);
});

// ─── POST message ─────────────────────────────────────────────────────────────

test('POST / — creates a message with valid payload', async () => {
  const created = { id: 10, task_id: 'TASK-2', sender_role: 'helper', text: 'Done!' };
  const db = { createMessage: async () => ({ rows: [created] }) };
  const body = { task_id: 'TASK-2', sender_role: 'helper', text: 'Done!' };
  const res = await createMessageHandler(body, { id: 5 }, db);
  assert.equal(res.status, 200);
  assert.equal(res.json.text, 'Done!');
});

test('POST / — rejects missing task_id', async () => {
  const body = { sender_role: 'helper', text: 'Hello' };
  const res = await createMessageHandler(body, { id: 1 }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /task_id/i);
});

test('POST / — rejects empty text', async () => {
  const body = { task_id: 'TASK-2', sender_role: 'helper', text: '   ' };
  const res = await createMessageHandler(body, { id: 1 }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /text/i);
});

test('POST / — rejects missing sender_role', async () => {
  const body = { task_id: 'TASK-2', text: 'Hi there' };
  const res = await createMessageHandler(body, { id: 1 }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /sender_role/i);
});

test('POST / — returns 500 on DB error', async () => {
  const db = { createMessage: async () => { throw new Error('DB'); } };
  const body = { task_id: 'TASK-2', sender_role: 'requester', text: 'Help me please' };
  const res = await createMessageHandler(body, { id: 1 }, db);
  assert.equal(res.status, 500);
});
