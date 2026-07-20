const router = require('express').Router();
const pool = require('../db');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Task not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const VALID_CATEGORIES = ['negotiator', 'secretary', 'researcher', 'wordsmith'];
const VALID_PROOF_TYPES = ['screenshot', 'summary', 'transcript'];

router.post('/', auth, async (req, res) => {
  const { category, description, script, proof_type, alias } = req.body;

  if (!category || !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: `category must be one of: ${VALID_CATEGORIES.join(', ')}` });
  }
  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    return res.status(400).json({ error: 'description must be at least 10 characters long' });
  }
  if (proof_type && !VALID_PROOF_TYPES.includes(proof_type)) {
    return res.status(400).json({ error: `proof_type must be one of: ${VALID_PROOF_TYPES.join(', ')}` });
  }

  const id = `TASK-${Math.floor(1000 + Math.random() * 9000)}`;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (id, user_id, category, description, script, proof_type, alias) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [id, req.user.id, category, description, script, proof_type || 'screenshot', alias]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id/claim', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE tasks SET status = $1, helper_id = $2 WHERE id = $3 RETURNING *',
      ['claimed', req.user.id, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id/proof', auth, async (req, res) => {
  const { proof } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET status = $1, proof = $2 WHERE id = $3 RETURNING *',
      ['completed', proof, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id/accept', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
      ['accepted', req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
