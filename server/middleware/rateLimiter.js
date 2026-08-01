/**
 * In-memory rate limiter middleware for express/node routes.
 * @param {number} maxRequests
 * @param {number} windowMs
 */
function createRateLimiter(maxRequests = 100, windowMs = 60000) {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip || (req.headers && req.headers['x-forwarded-for']) || '127.0.0.1';
    const now = Date.now();
    
    if (!requests.has(ip)) {
      requests.set(ip, []);
    }

    const timestamps = requests.get(ip).filter(time => now - time < windowMs);
    
    if (timestamps.length >= maxRequests) {
      if (res && typeof res.status === 'function') {
        return res.status(429).json({ error: 'Too many requests, please try again later.' });
      }
      return false;
    }

    timestamps.push(now);
    requests.set(ip, timestamps);
    
    if (next && typeof next === 'function') {
      next();
    }
    return true;
  };
}

module.exports = { createRateLimiter };
