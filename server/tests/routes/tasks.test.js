/**
 * tests/routes/tasks.test.js
 * Unit tests for task CRUD and status-transition handlers.
 *
 * Run with:  node --test server/tests/routes/tasks.test.js
 */
'use strict';

const test   = require('node:test');
const assert = require('node:assert/strict');

const VALID_CATEGORIES  = ['negotiator', 'secretary', 'researcher', 'wordsmith'];
const VALID_PROOF_TYPES = ['screenshot', 'summary', 'transcript'];

// ── Inline handler logic (mirrors routes/tasks.js) ────────────────────────────

async function getAllTasksHandler(db) {
  const result = await db.getAllTasks();
  return { status: 200, json: result.rows };
}

async function getTaskByIdHandler(id, db) {
  const result = await db.findTaskById(id);
  if (!result.rows[0]) return { status: 404, json: { error: 'Task not found' } };
  return { status: 200, json: result.rows[0] };
}

async function createTaskHandler(body, user, db) {
  const { category, description, script, proof_type, alias } = body;
  if (!category || !VALID_CATEGORIES.includes(category))
    return { status: 400, json: { error: `category must be one of: ${VALID_CATEGORIES.join(', ')}` } };
  if (!description || description.trim().length < 10)
    return { status: 400, json: { error: 'description must be at least 10 characters long' } };
  if (proof_type && !VALID_PROOF_TYPES.includes(proof_type))
    return { status: 400, json: { error: `proof_type must be one of: ${VALID_PROOF_TYPES.join(', ')}` } };
  const id = `TASK-${Math.floor(1000 + Math.random() * 9000)}`;
  try {
    const result = await db.createTask(id, user.id, category, description, script, proof_type || 'screenshot', alias);
    return { status: 200, json: result.rows[0] };
  } catch {
    return { status: 500, json: { error: 'Server error' } };
  }
}

async function claimTaskHandler(taskId, user, db) {
  try {
    const check = await db.findTaskById(taskId);
    if (!check.rows[0])              return { status: 404, json: { error: 'Task not found' } };
    if (check.rows[0].status !== 'open') return { status: 409, json: { error: 'Only open tasks can be claimed' } };
    const result = await db.claimTask(taskId, user.id);
    return { status: 200, json: result.rows[0] };
  } catch {
    return { status: 500, json: { error: 'Server error' } };
  }
}

async function proofHandler(taskId, body, db) {
  const { proof } = body;
  if (!proof || proof.trim().length === 0)
    return { status: 400, json: { error: 'proof content is required' } };
  try {
    const check = await db.findTaskById(taskId);
    if (!check.rows[0])                  return { status: 404, json: { error: 'Task not found' } };
    if (check.rows[0].status !== 'claimed') return { status: 409, json: { error: 'Proof can only be submitted for claimed tasks' } };
    const result = await db.submitProof(taskId, proof);
    return { status: 200, json: result.rows[0] };
  } catch {
    return { status: 500, json: { error: 'Server error' } };
  }
}

async function acceptHandler(taskId, db) {
  try {
    const check = await db.findTaskById(taskId);
    if (!check.rows[0])                     return { status: 404, json: { error: 'Task not found' } };
    if (check.rows[0].status !== 'completed') return { status: 409, json: { error: 'Only completed tasks can be accepted' } };
    const result = await db.acceptTask(taskId);
    return { status: 200, json: result.rows[0] };
  } catch {
    return { status: 500, json: { error: 'Server error' } };
  }
}

// ─── GET all tasks ─────────────────────────────────────────────────────────────

test('GET / — returns all tasks', async () => {
  const tasks = [{ id: 'TASK-1001', category: 'negotiator', status: 'open' }];
  const db = { getAllTasks: async () => ({ rows: tasks }) };
  const res = await getAllTasksHandler(db);
  assert.equal(res.status, 200);
  assert.deepEqual(res.json, tasks);
});

// ─── GET task by id ────────────────────────────────────────────────────────────

test('GET /:id — returns task when found', async () => {
  const task = { id: 'TASK-1234', status: 'open' };
  const db = { findTaskById: async () => ({ rows: [task] }) };
  const res = await getTaskByIdHandler('TASK-1234', db);
  assert.equal(res.status, 200);
  assert.deepEqual(res.json, task);
});

test('GET /:id — returns 404 when task not found', async () => {
  const db = { findTaskById: async () => ({ rows: [] }) };
  const res = await getTaskByIdHandler('TASK-XXXX', db);
  assert.equal(res.status, 404);
  assert.match(res.json.error, /not found/i);
});

// ─── POST create task ─────────────────────────────────────────────────────────

test('POST / — creates task with valid payload', async () => {
  const created = { id: 'TASK-5000', category: 'secretary', status: 'open' };
  const db = { createTask: async () => ({ rows: [created] }) };
  const body = { category: 'secretary', description: 'Book a restaurant table for me', proof_type: 'summary' };
  const res = await createTaskHandler(body, { id: 1 }, db);
  assert.equal(res.status, 200);
  assert.equal(res.json.category, 'secretary');
});

test('POST / — rejects invalid category', async () => {
  const body = { category: 'hacker', description: 'Do something sketchy please' };
  const res = await createTaskHandler(body, { id: 1 }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /category/i);
});

test('POST / — rejects description shorter than 10 chars', async () => {
  const body = { category: 'negotiator', description: 'Too short' };
  const res = await createTaskHandler(body, { id: 1 }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /description/i);
});

test('POST / — rejects invalid proof_type', async () => {
  const body = { category: 'researcher', description: 'This is a valid description for testing', proof_type: 'video' };
  const res = await createTaskHandler(body, { id: 1 }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /proof_type/i);
});

test('POST / — defaults proof_type to screenshot when omitted', async () => {
  let capturedProofType;
  const db = {
    createTask: async (id, uid, cat, desc, script, pt, alias) => {
      capturedProofType = pt;
      return { rows: [{ id, category: cat, proof_type: pt }] };
    },
  };
  const body = { category: 'wordsmith', description: 'Draft an email for me please' };
  await createTaskHandler(body, { id: 1 }, db);
  assert.equal(capturedProofType, 'screenshot');
});

// ─── PATCH claim ──────────────────────────────────────────────────────────────

test('PATCH /claim — claims an open task', async () => {
  const db = {
    findTaskById: async () => ({ rows: [{ id: 'TASK-1', status: 'open' }] }),
    claimTask:    async () => ({ rows: [{ id: 'TASK-1', status: 'claimed' }] }),
  };
  const res = await claimTaskHandler('TASK-1', { id: 99 }, db);
  assert.equal(res.status, 200);
  assert.equal(res.json.status, 'claimed');
});

test('PATCH /claim — rejects claiming a non-open task', async () => {
  const db = { findTaskById: async () => ({ rows: [{ id: 'TASK-2', status: 'claimed' }] }) };
  const res = await claimTaskHandler('TASK-2', { id: 99 }, db);
  assert.equal(res.status, 409);
  assert.match(res.json.error, /open/i);
});

test('PATCH /claim — returns 404 for missing task', async () => {
  const db = { findTaskById: async () => ({ rows: [] }) };
  const res = await claimTaskHandler('TASK-NONE', { id: 99 }, db);
  assert.equal(res.status, 404);
});

// ─── PATCH proof ──────────────────────────────────────────────────────────────

test('PATCH /proof — submits proof for a claimed task', async () => {
  const db = {
    findTaskById: async () => ({ rows: [{ id: 'TASK-3', status: 'claimed' }] }),
    submitProof:  async () => ({ rows: [{ id: 'TASK-3', status: 'completed', proof: 'done!' }] }),
  };
  const res = await proofHandler('TASK-3', { proof: 'done!' }, db);
  assert.equal(res.status, 200);
  assert.equal(res.json.status, 'completed');
});

test('PATCH /proof — rejects empty proof', async () => {
  const res = await proofHandler('TASK-3', { proof: '' }, {});
  assert.equal(res.status, 400);
  assert.match(res.json.error, /proof content/i);
});

test('PATCH /proof — rejects proof on unclaimed task', async () => {
  const db = { findTaskById: async () => ({ rows: [{ id: 'TASK-4', status: 'open' }] }) };
  const res = await proofHandler('TASK-4', { proof: 'some proof' }, db);
  assert.equal(res.status, 409);
  assert.match(res.json.error, /claimed/i);
});

// ─── PATCH accept ─────────────────────────────────────────────────────────────

test('PATCH /accept — accepts a completed task', async () => {
  const db = {
    findTaskById: async () => ({ rows: [{ id: 'TASK-5', status: 'completed' }] }),
    acceptTask:   async () => ({ rows: [{ id: 'TASK-5', status: 'accepted' }] }),
  };
  const res = await acceptHandler('TASK-5', db);
  assert.equal(res.status, 200);
  assert.equal(res.json.status, 'accepted');
});

test('PATCH /accept — rejects accepting a non-completed task', async () => {
  const db = { findTaskById: async () => ({ rows: [{ id: 'TASK-6', status: 'claimed' }] }) };
  const res = await acceptHandler('TASK-6', db);
  assert.equal(res.status, 409);
  assert.match(res.json.error, /completed/i);
});

test('PATCH /accept — returns 404 for missing task', async () => {
  const db = { findTaskById: async () => ({ rows: [] }) };
  const res = await acceptHandler('TASK-NONE', db);
  assert.equal(res.status, 404);
});
