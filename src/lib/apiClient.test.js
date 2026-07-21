import test from 'node:test';
import assert from 'node:assert/strict';
import { setAuthToken } from './apiClient.js';

// Mock localStorage for node environment
if (typeof localStorage === 'undefined') {
  const store = {};
  globalThis.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = String(val); },
    removeItem: (key) => { delete store[key]; },
  };
}

test('setAuthToken — saves token to localStorage when provided', () => {
  setAuthToken('sample_jwt_token_123');
  assert.equal(localStorage.getItem('whisper_token'), 'sample_jwt_token_123');
});

test('setAuthToken — removes token from localStorage when null or empty', () => {
  setAuthToken('token_to_remove');
  assert.equal(localStorage.getItem('whisper_token'), 'token_to_remove');

  setAuthToken(null);
  assert.equal(localStorage.getItem('whisper_token'), null);
});
