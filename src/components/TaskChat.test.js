import test from 'node:test';
import assert from 'node:assert/strict';

test('TaskChat — message filter isolates messages for specific task ID', () => {
  const allMessages = [
    { taskId: 'TASK-1', sender: 'requester', text: 'Hello' },
    { taskId: 'TASK-2', sender: 'helper', text: 'Hi there' },
    { taskId: 'TASK-1', sender: 'helper', text: 'I am on it' },
  ];

  const task1Messages = allMessages.filter((m) => m.taskId === 'TASK-1');
  assert.equal(task1Messages.length, 2);
  assert.equal(task1Messages[0].text, 'Hello');
  assert.equal(task1Messages[1].text, 'I am on it');
});

test('TaskChat — typing indicator state boolean flag', () => {
  let isTyping = false;
  const setTyping = (val) => { isTyping = val; };

  setTyping(true);
  assert.equal(isTyping, true);
  setTyping(false);
  assert.equal(isTyping, false);
});
