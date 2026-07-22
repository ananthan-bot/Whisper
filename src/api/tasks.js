import api from "./axios";

export const getTasks = () => api.get("/api/tasks");
export const getTask = (id) => api.get(`/api/tasks/${id}`);
export const createTask = (data) => api.post("/api/tasks", data);
export const claimTask = (id) => api.patch(`/api/tasks/${id}/claim`);
export const submitProof = (id, proof) => api.patch(`/api/tasks/${id}/proof`, { proof });
export const acceptTask = (id) => api.patch(`/api/tasks/${id}/accept`);
