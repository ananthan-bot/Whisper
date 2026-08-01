import test from 'node:test';
import assert from 'node:assert/strict';
import { formatActivityLogsToCsv } from './csvExportHelpers.js';

test('formatActivityLogsToCsv - outputs header when empty', () => {
  assert.equal(formatActivityLogsToCsv([]), 'ID,Action,Timestamp,Details');
});

test('formatActivityLogsToCsv - formats log items with CSV escaping', () => {
  const logs = [
    { id: '1', action: 'LOGIN', timestamp: '2026-08-01', details: 'User logged in' },
    { id: '2', action: 'TASK_CREATE', timestamp: '2026-08-01', details: 'Created "Urgent" Task' }
  ];
  const csv = formatActivityLogsToCsv(logs);
  assert.ok(csv.includes('ID,Action,Timestamp,Details'));
  assert.ok(csv.includes('Created ""Urgent"" Task'));
});
