import test from 'node:test';
import assert from 'node:assert/strict';
import { stripHtmlTags, sanitizeInput, containsScriptTag } from './securityHelpers.js';

test('stripHtmlTags — strips simple and nested HTML tags', () => {
  assert.equal(stripHtmlTags('<b>Hello</b> World'), 'Hello World');
  assert.equal(stripHtmlTags('<script>alert("xss")</script>Test'), 'alert("xss")Test');
  assert.equal(stripHtmlTags(null), '');
});

test('sanitizeInput — strips tags and trims whitespace', () => {
  assert.equal(sanitizeInput('  <div>  Clean Me  </div>  '), 'Clean Me');
  assert.equal(sanitizeInput(null), '');
  assert.equal(sanitizeInput(12345), '12345');
});

test('containsScriptTag — identifies script tag and javascript: protocol vectors', () => {
  assert.equal(containsScriptTag('<script>console.log(1)</script>'), true);
  assert.equal(containsScriptTag('href="javascript:alert(1)"'), true);
  assert.equal(containsScriptTag('Just normal text'), false);
  assert.equal(containsScriptTag(undefined), false);
});
