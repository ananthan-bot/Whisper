'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { getSystemPingInfo } = require('../pingHelpers.js');

test('getSystemPingInfo returns valid status object structure', () => {
  const ping = getSystemPingInfo();
  assert.equal(ping.status, 'ok');
  assert.equal(ping.service, 'whisper-api');
  assert.equal(ping.version, '1.2.0');
  assert.ok(typeof ping.timestamp === 'string');
  assert.ok(typeof ping.uptimeSeconds === 'number');
  assert.ok(typeof ping.memory.heapUsedMB === 'number');
});
