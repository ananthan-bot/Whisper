import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { copyToClipboard, getCopyStatusLabel } from './clipboardHelpers.js';

describe('clipboardHelpers', () => {
  it('copyToClipboard returns false for invalid input', async () => {
    assert.equal(await copyToClipboard(null), false);
    assert.equal(await copyToClipboard(123), false);
  });

  it('getCopyStatusLabel returns Copied! when true', () => {
    assert.equal(getCopyStatusLabel(true), 'Copied!');
  });

  it('getCopyStatusLabel returns default label when false', () => {
    assert.equal(getCopyStatusLabel(false), 'Copy to Clipboard');
  });
});
