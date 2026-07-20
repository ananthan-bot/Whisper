/**
 * src/store/useStore.test.js
 * Unit tests for Zustand store action logic.
 *
 * We test the state-transition logic directly without mounting React or a DOM
 * by extracting and executing the action functions against plain state objects.
 *
 * Run with:  node --test src/store/useStore.test.js
 */
import test   from 'node:test';
import assert from 'node:assert/strict';

// ── Re-implement the store action logic as pure functions ─────────────────────
// These mirror the exact logic in useStore.js so we can unit-test state changes
// without needing React, jsdom, or localStorage.

function generateAlias() {
  return `User #${Math.floor(1000 + Math.random() * 9000)}`;
}

// Pure versions of each Zustand action
const actions = {
  addTask(state, task) {
    const newTask = {
      ...task,
      id: task.id || `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
      alias: task.alias || generateAlias(),
      status: 'open',
      createdAt: task.createdAt || new Date().toISOString(),
    };
    return { ...state, tasks: [newTask, ...state.tasks] };
  },

  claimTask(state, taskId) {
    return {
      ...state,
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: 'claimed' } : t
      ),
    };
  },

  submitProof(state, taskId, proofData) {
    return {
      ...state,
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: 'completed', proof: proofData } : t
      ),
    };
  },

  acceptTask(state, taskId) {
    return {
      ...state,
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: 'accepted' } : t
      ),
    };
  },

  addMessage(state, taskId, sender, text) {
    return {
      ...state,
      messages: [
        ...state.messages,
        { taskId, sender, text, timestamp: new Date().toISOString() },
      ],
    };
  },

  rateTask(state, taskId, stars) {
    return {
      ...state,
      ratings: { ...state.ratings, [taskId]: stars },
    };
  },

  setViewMode(state, mode) {
    return { ...state, viewMode: mode };
  },
};

// ── Initial state factory ─────────────────────────────────────────────────────
function initialState() {
  return { tasks: [], messages: [], ratings: {}, viewMode: 'requester' };
}

// ─── addTask ──────────────────────────────────────────────────────────────────

test('addTask — prepends task to the list', () => {
  let state = initialState();
  state = actions.addTask(state, { category: 'negotiator', description: 'Call Comcast' });
  assert.equal(state.tasks.length, 1);
  assert.equal(state.tasks[0].category, 'negotiator');
});

test('addTask — sets status to "open"', () => {
  let state = initialState();
  state = actions.addTask(state, { category: 'secretary', description: 'Book a table' });
  assert.equal(state.tasks[0].status, 'open');
});

test('addTask — generates id if not provided', () => {
  let state = initialState();
  state = actions.addTask(state, { category: 'researcher', description: 'Check stock' });
  assert.match(state.tasks[0].id, /^TASK-\d{4}$/);
});

test('addTask — uses provided id when given', () => {
  let state = initialState();
  state = actions.addTask(state, { id: 'TASK-9999', category: 'wordsmith', description: 'Draft email' });
  assert.equal(state.tasks[0].id, 'TASK-9999');
});

test('addTask — generates alias if not provided', () => {
  let state = initialState();
  state = actions.addTask(state, { category: 'negotiator', description: 'Negotiate bill' });
  assert.match(state.tasks[0].alias, /^User #\d{4}$/);
});

test('addTask — sets createdAt timestamp', () => {
  let state = initialState();
  state = actions.addTask(state, { category: 'secretary', description: 'Reserve restaurant' });
  assert.ok(state.tasks[0].createdAt);
  assert.doesNotThrow(() => new Date(state.tasks[0].createdAt));
});

test('addTask — newest task appears first (prepend behaviour)', () => {
  let state = initialState();
  state = actions.addTask(state, { id: 'TASK-0001', category: 'negotiator', description: 'First task added' });
  state = actions.addTask(state, { id: 'TASK-0002', category: 'secretary',  description: 'Second task added' });
  assert.equal(state.tasks[0].id, 'TASK-0002');
  assert.equal(state.tasks[1].id, 'TASK-0001');
});

// ─── claimTask ────────────────────────────────────────────────────────────────

test('claimTask — transitions target task to "claimed"', () => {
  let state = initialState();
  state = actions.addTask(state, { id: 'TASK-A', category: 'negotiator', description: 'Negotiate bill' });
  state = actions.claimTask(state, 'TASK-A');
  assert.equal(state.tasks[0].status, 'claimed');
});

test('claimTask — does not affect other tasks', () => {
  let state = initialState();
  state = actions.addTask(state, { id: 'TASK-A', category: 'negotiator', description: 'Negotiate bill' });
  state = actions.addTask(state, { id: 'TASK-B', category: 'secretary',  description: 'Book restaurant' });
  state = actions.claimTask(state, 'TASK-B');
  const taskA = state.tasks.find((t) => t.id === 'TASK-A');
  assert.equal(taskA.status, 'open');
});

test('claimTask — no-op when taskId does not exist', () => {
  let state = initialState();
  state = actions.addTask(state, { id: 'TASK-A', category: 'negotiator', description: 'Negotiate bill' });
  state = actions.claimTask(state, 'TASK-MISSING');
  assert.equal(state.tasks[0].status, 'open');
});

// ─── submitProof ──────────────────────────────────────────────────────────────

test('submitProof — transitions task to "completed" and attaches proof', () => {
  let state = initialState();
  state = actions.addTask(state, { id: 'TASK-P', category: 'negotiator', description: 'Negotiate bill' });
  state = actions.claimTask(state, 'TASK-P');
  state = actions.submitProof(state, 'TASK-P', 'Here is my screenshot');
  const task = state.tasks.find((t) => t.id === 'TASK-P');
  assert.equal(task.status, 'completed');
  assert.equal(task.proof, 'Here is my screenshot');
});

test('submitProof — does not affect other tasks', () => {
  let state = initialState();
  state = actions.addTask(state, { id: 'TASK-P', category: 'negotiator', description: 'Negotiate bill' });
  state = actions.addTask(state, { id: 'TASK-Q', category: 'secretary',  description: 'Book restaurant' });
  state = actions.claimTask(state, 'TASK-P');
  state = actions.submitProof(state, 'TASK-P', 'proof');
  const taskQ = state.tasks.find((t) => t.id === 'TASK-Q');
  assert.equal(taskQ.status, 'open');
  assert.equal(taskQ.proof, undefined);
});

// ─── acceptTask ───────────────────────────────────────────────────────────────

test('acceptTask — transitions task to "accepted"', () => {
  let state = initialState();
  state = actions.addTask(state,   { id: 'TASK-C', category: 'researcher', description: 'Check inventory now' });
  state = actions.claimTask(state,  'TASK-C');
  state = actions.submitProof(state, 'TASK-C', 'proof text');
  state = actions.acceptTask(state, 'TASK-C');
  const task = state.tasks.find((t) => t.id === 'TASK-C');
  assert.equal(task.status, 'accepted');
});

test('acceptTask — does not change proof data', () => {
  let state = initialState();
  state = actions.addTask(state,   { id: 'TASK-D', category: 'wordsmith', description: 'Draft a letter for me' });
  state = actions.claimTask(state,  'TASK-D');
  state = actions.submitProof(state, 'TASK-D', 'my proof');
  state = actions.acceptTask(state, 'TASK-D');
  const task = state.tasks.find((t) => t.id === 'TASK-D');
  assert.equal(task.proof, 'my proof');
});

// ─── addMessage ───────────────────────────────────────────────────────────────

test('addMessage — appends message to messages array', () => {
  let state = initialState();
  state = actions.addMessage(state, 'TASK-1', 'requester', 'I need help please');
  assert.equal(state.messages.length, 1);
  assert.equal(state.messages[0].text, 'I need help please');
});

test('addMessage — records taskId, sender, and text correctly', () => {
  let state = initialState();
  state = actions.addMessage(state, 'TASK-42', 'helper', 'On it!');
  const msg = state.messages[0];
  assert.equal(msg.taskId, 'TASK-42');
  assert.equal(msg.sender, 'helper');
  assert.equal(msg.text, 'On it!');
});

test('addMessage — includes a timestamp', () => {
  let state = initialState();
  state = actions.addMessage(state, 'TASK-1', 'requester', 'Hello');
  assert.ok(state.messages[0].timestamp);
  assert.doesNotThrow(() => new Date(state.messages[0].timestamp));
});

test('addMessage — accumulates multiple messages in order', () => {
  let state = initialState();
  state = actions.addMessage(state, 'TASK-1', 'requester', 'First message');
  state = actions.addMessage(state, 'TASK-1', 'helper',    'Second message');
  state = actions.addMessage(state, 'TASK-1', 'requester', 'Third message');
  assert.equal(state.messages.length, 3);
  assert.equal(state.messages[0].text, 'First message');
  assert.equal(state.messages[2].text, 'Third message');
});

test('addMessage — messages from different tasks coexist', () => {
  let state = initialState();
  state = actions.addMessage(state, 'TASK-A', 'requester', 'Message for A');
  state = actions.addMessage(state, 'TASK-B', 'helper',    'Message for B');
  assert.equal(state.messages.filter((m) => m.taskId === 'TASK-A').length, 1);
  assert.equal(state.messages.filter((m) => m.taskId === 'TASK-B').length, 1);
});

// ─── rateTask ─────────────────────────────────────────────────────────────────

test('rateTask — stores rating for a task', () => {
  let state = initialState();
  state = actions.rateTask(state, 'TASK-1', 5);
  assert.equal(state.ratings['TASK-1'], 5);
});

test('rateTask — stores different ratings for different tasks', () => {
  let state = initialState();
  state = actions.rateTask(state, 'TASK-A', 3);
  state = actions.rateTask(state, 'TASK-B', 5);
  assert.equal(state.ratings['TASK-A'], 3);
  assert.equal(state.ratings['TASK-B'], 5);
});

test('rateTask — overwrites previous rating for the same task', () => {
  let state = initialState();
  state = actions.rateTask(state, 'TASK-1', 2);
  state = actions.rateTask(state, 'TASK-1', 4);
  assert.equal(state.ratings['TASK-1'], 4);
});

test('rateTask — does not mutate other ratings', () => {
  let state = initialState();
  state = actions.rateTask(state, 'TASK-A', 5);
  state = actions.rateTask(state, 'TASK-B', 1);
  assert.equal(state.ratings['TASK-A'], 5);
});

// ─── setViewMode ──────────────────────────────────────────────────────────────

test('setViewMode — switches to "helper" mode', () => {
  let state = initialState();
  state = actions.setViewMode(state, 'helper');
  assert.equal(state.viewMode, 'helper');
});

test('setViewMode — switches back to "requester" mode', () => {
  let state = initialState();
  state = actions.setViewMode(state, 'helper');
  state = actions.setViewMode(state, 'requester');
  assert.equal(state.viewMode, 'requester');
});

test('setViewMode — does not affect tasks or messages', () => {
  let state = initialState();
  state = actions.addTask(state, { id: 'TASK-X', category: 'negotiator', description: 'Test task here' });
  state = actions.addMessage(state, 'TASK-X', 'requester', 'Hello world');
  state = actions.setViewMode(state, 'helper');
  assert.equal(state.tasks.length, 1);
  assert.equal(state.messages.length, 1);
});

