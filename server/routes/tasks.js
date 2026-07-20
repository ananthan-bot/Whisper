const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getAllTasks,
  findTaskById,
  createTask,
  claimTask,
  submitProof,
  acceptTask,
} = require('../db/queries');

const VALID_CATEGORIES = ['negotiator', 'secretary', 'researcher', 'wordsmith'];
const VALID_PROOF_TYPES = ['screenshot', 'summary', 'transcript'];

router.get('/', async (req, res) => {
  try {
    const result = await getAllTasks();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await findTaskById(req.params.id);
    if (!result.rows[0]) return res.status(404).json({ error: 'Task not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

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
    const result = await createTask(id, req.user.id, category, description, script, proof_type || 'screenshot', alias);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id/claim', auth, async (req, res) => {
  try {
    const check = await findTaskById(req.params.id);
    if (!check.rows[0]) return res.status(404).json({ error: 'Task not found' });
    if (check.rows[0].status !== 'open') {
      return res.status(409).json({ error: 'Only open tasks can be claimed' });
    }
    const result = await claimTask(req.params.id, req.user.id);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id/proof', auth, async (req, res) => {
  const { proof } = req.body;
  if (!proof || typeof proof !== 'string' || proof.trim().length === 0) {
    return res.status(400).json({ error: 'proof content is required' });
  }
  try {
    const check = await findTaskById(req.params.id);
    if (!check.rows[0]) return res.status(404).json({ error: 'Task not found' });
    if (check.rows[0].status !== 'claimed') {
      return res.status(409).json({ error: 'Proof can only be submitted for claimed tasks' });
    }
    const result = await submitProof(req.params.id, proof);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id/accept', auth, async (req, res) => {
  try {
    const check = await findTaskById(req.params.id);
    if (!check.rows[0]) return res.status(404).json({ error: 'Task not found' });
    if (check.rows[0].status !== 'completed') {
      return res.status(409).json({ error: 'Only completed tasks can be accepted' });
    }
    const result = await acceptTask(req.params.id);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
