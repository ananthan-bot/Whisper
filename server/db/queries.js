/**
 * db/queries.js
 * Centralised, reusable parameterised database query helpers.
 * Import this module from route handlers instead of calling pool.query directly.
 */
const pool = require('../db');

// ─── Users ───────────────────────────────────────────────────────────────────

/**
 * Insert a new user and return the created row.
 * @param {string} email
 * @param {string} hashedPassword
 * @param {string} alias
 */
const createUser = (email, hashedPassword, alias) =>
  pool.query(
    'INSERT INTO users (email, password, alias) VALUES ($1, $2, $3) RETURNING id, email, alias',
    [email, hashedPassword, alias]
  );

/**
 * Find a user by email.
 * @param {string} email
 */
const findUserByEmail = (email) =>
  pool.query('SELECT * FROM users WHERE email = $1', [email]);

// ─── Tasks ────────────────────────────────────────────────────────────────────

/** Return all tasks ordered newest first. */
const getAllTasks = () =>
  pool.query('SELECT * FROM tasks ORDER BY created_at DESC');

/**
 * Find a single task by its id.
 * @param {string} id
 */
const findTaskById = (id) =>
  pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

/**
 * Insert a new task row and return the created record.
 */
const createTask = (id, userId, category, description, script, proofType, alias) =>
  pool.query(
    'INSERT INTO tasks (id, user_id, category, description, script, proof_type, alias) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [id, userId, category, description, script, proofType, alias]
  );

/**
 * Transition a task to "claimed" and record the helper.
 */
const claimTask = (taskId, helperId) =>
  pool.query(
    'UPDATE tasks SET status = $1, helper_id = $2 WHERE id = $3 RETURNING *',
    ['claimed', helperId, taskId]
  );

/**
 * Attach proof content and move status to "completed".
 */
const submitProof = (taskId, proof) =>
  pool.query(
    'UPDATE tasks SET status = $1, proof = $2 WHERE id = $3 RETURNING *',
    ['completed', proof, taskId]
  );

/**
 * Move a task to "accepted" status.
 */
const acceptTask = (taskId) =>
  pool.query(
    'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
    ['accepted', taskId]
  );

// ─── Messages ─────────────────────────────────────────────────────────────────

/**
 * Retrieve all messages for a task, ordered chronologically.
 */
const getMessagesByTaskId = (taskId) =>
  pool.query('SELECT * FROM messages WHERE task_id = $1 ORDER BY created_at ASC', [taskId]);

/**
 * Insert a new message.
 */
const createMessage = (taskId, senderId, senderRole, text) =>
  pool.query(
    'INSERT INTO messages (task_id, sender_id, sender_role, text) VALUES ($1, $2, $3, $4) RETURNING *',
    [taskId, senderId, senderRole, text]
  );

// ─── Ratings ──────────────────────────────────────────────────────────────────

/**
 * Insert a rating for a helper on a task.
 */
const createRating = (taskId, helperId, rating, review) =>
  pool.query(
    'INSERT INTO ratings (task_id, helper_id, rating, review) VALUES ($1, $2, $3, $4) RETURNING *',
    [taskId, helperId, rating, review]
  );

/**
 * Calculate average rating and total count for a helper.
 */
const getHelperRatingSummary = (helperId) =>
  pool.query(
    'SELECT AVG(rating) as average, COUNT(*) as total FROM ratings WHERE helper_id = $1',
    [helperId]
  );

module.exports = {
  createUser,
  findUserByEmail,
  getAllTasks,
  findTaskById,
  createTask,
  claimTask,
  submitProof,
  acceptTask,
  getMessagesByTaskId,
  createMessage,
  createRating,
  getHelperRatingSummary,
};
