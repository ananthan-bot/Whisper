import test from 'node:test';
import assert from 'node:assert/strict';

// Pure toast state manager to test logic without needing React context DOM render
function createToastManager() {
  let toasts = [];
  return {
    getToasts: () => toasts,
    addToast: (message, type = 'info') => {
      const id = Math.random().toString(36).substring(2, 6);
      toasts.push({ id, message, type });
      return id;
    },
    removeToast: (id) => {
      toasts = toasts.filter((t) => t.id !== id);
    },
  };
}

test('ToastManager — adds toast with default type info', () => {
  const manager = createToastManager();
  manager.addToast('Test notification');
  const toasts = manager.getToasts();
  assert.equal(toasts.length, 1);
  assert.equal(toasts[0].message, 'Test notification');
  assert.equal(toasts[0].type, 'info');
});

test('ToastManager — adds toast with custom type success', () => {
  const manager = createToastManager();
  manager.addToast('Action completed', 'success');
  const toasts = manager.getToasts();
  assert.equal(toasts[0].type, 'success');
});

test('ToastManager — removes toast by id', () => {
  const manager = createToastManager();
  const id1 = manager.addToast('First');
  const id2 = manager.addToast('Second');

  assert.equal(manager.getToasts().length, 2);
  manager.removeToast(id1);

  const toasts = manager.getToasts();
  assert.equal(toasts.length, 1);
  assert.equal(toasts[0].id, id2);
});
