const router = require('express').Router();
const pool = require('../db');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const { task_id, helper_id, rating, review } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ratings (task_id, helper_id, rating, review) VALUES ($1, $2, $3, $4) RETURNING *',
      [task_id, helper_id, rating, review]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/helper/:helperId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT AVG(rating) as average, COUNT(*) as total FROM ratings WHERE helper_id = $1',
      [req.params.helperId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
