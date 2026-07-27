import { test } from 'node:test';
import assert from 'node:assert';
import { getScriptTemplates, generateScriptDraft, CATEGORY_TEMPLATES } from './aiScriptHelpers.js';

test('getScriptTemplates — returns category specific templates with fallback', () => {
  const negotiatorTemplates = getScriptTemplates('negotiator');
  assert.ok(Array.isArray(negotiatorTemplates));
  assert.ok(negotiatorTemplates.length > 0);

  const fallbackTemplates = getScriptTemplates('unknown_category');
  assert.strictEqual(fallbackTemplates, CATEGORY_TEMPLATES.negotiator);
});

test('generateScriptDraft — appends user task description to template script', () => {
  const draft = generateScriptDraft('negotiator', 'Need help canceling gym membership');
  assert.ok(draft.includes('Talking points'));
  assert.ok(draft.includes('Specific Task Details:'));
  assert.ok(draft.includes('Need help canceling gym membership'));
});
