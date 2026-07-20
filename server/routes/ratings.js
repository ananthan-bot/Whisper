const router = require('express').Router();
const auth = require('../middleware/auth');
const { createRating, getHelperRatingSummary } = require('../db/queries');

router.post('/', auth, async (req, res) => {
  const { task_id, helper_id, rating, review } = req.body;
  if (!task_id || !helper_id) {
    return res.status(400).json({ error: 'task_id and helper_id are required' });
  }
  if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'rating must be an integer between 1 and 5' });
  }
  try {
    const result = await createRating(task_id, helper_id, rating, review);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/helper/:helperId', async (req, res) => {
  try {
    const result = await getHelperRatingSummary(req.params.helperId);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
