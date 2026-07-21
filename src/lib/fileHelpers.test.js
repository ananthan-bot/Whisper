import test from 'node:test';
import assert from 'node:assert/strict';
import { validateFile, MAX_FILE_SIZE_BYTES } from './fileHelpers.js';

test('validateFile — rejects null or undefined file', () => {
  const res1 = validateFile(null);
  assert.equal(res1.valid, false);
  assert.match(res1.error, /no file selected/i);

  const res2 = validateFile(undefined);
  assert.equal(res2.valid, false);
});

test('validateFile — accepts valid image file under 5MB', () => {
  const mockFile = { size: 1024 * 1024, type: 'image/png' };
  const res = validateFile(mockFile);
  assert.equal(res.valid, true);
  assert.equal(res.error, undefined);
});

test('validateFile — accepts valid audio file under 5MB', () => {
  const mockFile = { size: 2 * 1024 * 1024, type: 'audio/webm' };
  const res = validateFile(mockFile);
  assert.equal(res.valid, true);
});

test('validateFile — rejects file exceeding 5MB', () => {
  const mockFile = { size: MAX_FILE_SIZE_BYTES + 1, type: 'image/jpeg' };
  const res = validateFile(mockFile);
  assert.equal(res.valid, false);
  assert.match(res.error, /exceeds the maximum limit/i);
});

test('validateFile — rejects disallowed file types', () => {
  const mockFile = { size: 500, type: 'application/x-msdownload' };
  const res = validateFile(mockFile);
  assert.equal(res.valid, false);
  assert.match(res.error, /invalid file type/i);
});
