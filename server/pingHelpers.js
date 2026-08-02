/**
 * System ping diagnostic helper for Whisper server.
 */
'use strict';

const startTime = Date.now();

/**
 * Returns system health diagnostic object including uptime and environment info.
 * @returns {Object}
 */
function getSystemPingInfo() {
  const uptimeMs = Date.now() - startTime;
  const memoryUsage = process.memoryUsage ? process.memoryUsage() : {};

  return {
    status: 'ok',
    service: 'whisper-api',
    version: '1.2.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(uptimeMs / 1000),
    memory: {
      heapUsedMB: memoryUsage.heapUsed ? Math.round((memoryUsage.heapUsed / (1024 * 1024)) * 100) / 100 : 0,
      rssMB: memoryUsage.rss ? Math.round((memoryUsage.rss / (1024 * 1024)) * 100) / 100 : 0
    }
  };
}

module.exports = {
  getSystemPingInfo
};
