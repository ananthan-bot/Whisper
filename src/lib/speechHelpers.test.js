import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanTranscript, formatSpeechSummary, createSpeechRecognizer } from './speechHelpers.js';

test('cleanTranscript — handles empty or non-string inputs', () => {
  assert.equal(cleanTranscript(null), '');
  assert.equal(cleanTranscript(undefined), '');
  assert.equal(cleanTranscript(''), '');
  assert.equal(cleanTranscript(123), '');
});

test('cleanTranscript — trims whitespace and capitalizes first letter', () => {
  assert.equal(cleanTranscript('  hello world  '), 'Hello world');
  assert.equal(cleanTranscript('   please negotiate this bill   '), 'Please negotiate this bill');
});

test('cleanTranscript — collapses multiple internal spaces', () => {
  assert.equal(cleanTranscript('hello   there   world'), 'Hello there world');
});

test('formatSpeechSummary — returns fallback message for empty input', () => {
  assert.equal(formatSpeechSummary(''), 'No voice transcript recorded.');
  assert.equal(formatSpeechSummary(null), 'No voice transcript recorded.');
});

test('formatSpeechSummary — returns full string when under maxWords limit', () => {
  const shortText = 'Call Comcast and ask for a bill discount.';
  assert.equal(formatSpeechSummary(shortText, 10), shortText);
});

test('formatSpeechSummary — truncates and appends ellipsis when over maxWords', () => {
  const longText = 'One two three four five six seven eight nine ten eleven twelve';
  const result = formatSpeechSummary(longText, 5);
  assert.equal(result, 'One two three four five...');
});

test('createSpeechRecognizer — returns non-supported object when SpeechRecognition unavailable', () => {
  const recognizer = createSpeechRecognizer();
  assert.equal(recognizer.isSupported, false);
  
  let errorCaught = null;
  const fallback = createSpeechRecognizer({ onError: (err) => { errorCaught = err; } });
  fallback.start();
  assert.ok(errorCaught);
  assert.match(errorCaught.message, /not supported/i);
});
