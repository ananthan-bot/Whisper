const router = require('express').Router();
const auth = require('../middleware/auth');
const { getMessagesByTaskId, createMessage } = require('../db/queries');

router.get('/:taskId', auth, async (req, res) => {
  try {
    const result = await getMessagesByTaskId(req.params.taskId);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  const { task_id, sender_role, text } = req.body;
  if (!task_id || !sender_role || !text || text.trim().length === 0) {
    return res.status(400).json({ error: 'task_id, sender_role, and text are required' });
  }
  try {
    const result = await createMessage(task_id, req.user.id, sender_role, text);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
