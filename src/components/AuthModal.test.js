import test from 'node:test';
import assert from 'node:assert/strict';

// Helper to validate auth modal inputs
function validateAuthInput({ mode, email, password, alias }) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: 'Valid email address is required.' };
  }
  if (!password || password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters long.' };
  }
  if (mode === 'signup' && (!alias || !alias.trim())) {
    return { valid: false, error: 'Alias is required for signup.' };
  }
  return { valid: true };
}

test('AuthInputValidation — succeeds for valid login credentials', () => {
  const res = validateAuthInput({ mode: 'login', email: 'user@example.com', password: 'secret123' });
  assert.equal(res.valid, true);
});

test('AuthInputValidation — succeeds for valid signup credentials', () => {
  const res = validateAuthInput({ mode: 'signup', email: 'user@example.com', password: 'secret123', alias: 'User #9999' });
  assert.equal(res.valid, true);
});

test('AuthInputValidation — rejects invalid email', () => {
  const res = validateAuthInput({ mode: 'login', email: 'bad-email', password: 'secret123' });
  assert.equal(res.valid, false);
  assert.match(res.error, /email/i);
});

test('AuthInputValidation — rejects short password', () => {
  const res = validateAuthInput({ mode: 'login', email: 'user@example.com', password: '123' });
  assert.equal(res.valid, false);
  assert.match(res.error, /password/i);
});

test('AuthInputValidation — rejects missing alias in signup mode', () => {
  const res = validateAuthInput({ mode: 'signup', email: 'user@example.com', password: 'secret123', alias: '' });
  assert.equal(res.valid, false);
  assert.match(res.error, /alias/i);
});
