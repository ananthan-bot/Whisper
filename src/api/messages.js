import api from "./axios";

export const getMessages = (taskId) => api.get(`/api/messages/${taskId}`);
export const sendMessage = (data) => api.post("/api/messages", data);
