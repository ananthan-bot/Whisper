import { create } from "zustand";
import * as tasksApi from "../api/tasks";
import * as messagesApi from "../api/messages";

export const useStore = create((set) => ({
  tasks: [],
  messages: [],
  viewMode: "requester",

  setViewMode: (mode) => set({ viewMode: mode }),

  fetchTasks: async () => {
    const res = await tasksApi.getTasks();
    set({ tasks: res.data });
  },

  addTask: async (task) => {
    const res = await tasksApi.createTask(task);
    set((state) => ({ tasks: [res.data, ...state.tasks] }));
  },

  claimTask: async (taskId) => {
    const res = await tasksApi.claimTask(taskId);
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? res.data : t)),
    }));
  },

  submitProof: async (taskId, proofData) => {
    const res = await tasksApi.submitProof(taskId, proofData);
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? res.data : t)),
    }));
  },

  acceptTask: async (taskId) => {
    const res = await tasksApi.acceptTask(taskId);
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? res.data : t)),
    }));
  },

  fetchMessages: async (taskId) => {
    const res = await messagesApi.getMessages(taskId);
    set({ messages: res.data });
  },

  addMessage: async (taskId, senderRole, text) => {
    const res = await messagesApi.sendMessage({
      task_id: taskId,
      sender_role: senderRole,
      text,
    });
    set((state) => ({ messages: [...state.messages, res.data] }));
  },
}));
