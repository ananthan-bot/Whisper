import test from 'node:test';
import assert from 'node:assert/strict';
import { exportTasksToCsv, exportTasksToJson } from './exportHelpers.js';

const MOCK_TASKS = [
  { id: 'TASK-101', category: 'negotiator', bounty: 45, status: 'completed', createdAt: '2026-07-20' },
  { id: 'TASK-102', category: 'secretary', bounty: 25, status: 'open', createdAt: '2026-07-21' },
];

test('exportTasksToCsv — formats task array to CSV lines', () => {
  const csv = exportTasksToCsv(MOCK_TASKS);
  assert.match(csv, /^ID,Category,Bounty,Status,CreatedAt/);
  assert.match(csv, /"TASK-101","negotiator",45,"completed","2026-07-20"/);
  assert.equal(exportTasksToCsv([]), 'ID,Category,Bounty,Status,CreatedAt\n');
});

test('exportTasksToJson — formats task array into formatted JSON string', () => {
  const json = exportTasksToJson(MOCK_TASKS);
  const parsed = JSON.parse(json);
  assert.equal(parsed.length, 2);
  assert.equal(parsed[0].id, 'TASK-101');
  assert.equal(exportTasksToJson(null), '[]');
});
