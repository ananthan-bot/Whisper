const router = require('express').Router();
const pool = require('../db');
const auth = require('../middleware/auth');

router.get('/:taskId', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM messages WHERE task_id = $1 ORDER BY created_at ASC',
      [req.params.taskId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  const { task_id, sender_role, text } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO messages (task_id, sender_id, sender_role, text) VALUES ($1, $2, $3, $4) RETURNING *',
      [task_id, req.user.id, sender_role, text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
