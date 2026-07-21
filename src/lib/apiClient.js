/**
 * HTTP Client service for interacting with the Whisper Express backend endpoints.
 */

const API_BASE_URL = 'http://localhost:5000/api';

function getAuthToken() {
  return localStorage.getItem('whisper_token') || '';
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('whisper_token', token);
  } else {
    localStorage.removeItem('whisper_token');
  }
}

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const apiClient = {
  // Auth
  signup: (email, password, alias) => request('/auth/signup', { method: 'POST', body: JSON.stringify({ email, password, alias }) }),
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  // Tasks
  getTasks: () => request('/tasks'),
  getTaskById: (id) => request(`/tasks/${id}`),
  createTask: (data) => request('/tasks', { method: 'POST', body: JSON.stringify(data) }),
  claimTask: (id) => request(`/tasks/${id}/claim`, { method: 'PATCH' }),
  submitProof: (id, proof) => request(`/tasks/${id}/proof`, { method: 'PATCH', body: JSON.stringify({ proof }) }),
  acceptTask: (id) => request(`/tasks/${id}/accept`, { method: 'PATCH' }),

  // Messages
  getMessages: (taskId) => request(`/messages/${taskId}`),
  sendMessage: (taskId, senderRole, text) => request('/messages', { method: 'POST', body: JSON.stringify({ task_id: taskId, sender_role: senderRole, text }) }),

  // Ratings
  submitRating: (taskId, helperId, rating, review) => request('/ratings', { method: 'POST', body: JSON.stringify({ task_id: taskId, helper_id: helperId, rating, review }) }),
  getHelperRating: (helperId) => request(`/ratings/helper/${helperId}`),
};
