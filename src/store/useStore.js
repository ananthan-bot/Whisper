import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateAlias } from '../lib/utils';
import { MOCK_TASKS } from './mockTasks';
import { apiClient, setAuthToken } from '../lib/apiClient';

export const useStore = create(
  persist(
    (set, get) => ({
      // Auth Session
      user: null,
      token: null,
      setAuth: (user, token) => {
        setAuthToken(token);
        set({ user, token });
      },
      logout: () => {
        setAuthToken(null);
        set({ user: null, token: null });
      },

      // Tasks
      tasks: MOCK_TASKS,

      fetchTasksFromApi: async () => {
        try {
          const apiTasks = await apiClient.getTasks();
          if (Array.isArray(apiTasks) && apiTasks.length > 0) {
            const formatted = apiTasks.map((t) => ({
              id: t.id,
              category: t.category,
              description: t.description,
              script: t.script,
              proofType: t.proof_type,
              alias: t.alias,
              status: t.status,
              proof: t.proof,
              createdAt: t.created_at,
            }));
            set({ tasks: formatted });
          }
        } catch {
          // Fallback to local persist state when offline
        }
      },

      addTask: (task) =>
        set((state) => {
          const newTask = {
            ...task,
            id: `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
            alias: task.alias || generateAlias(),
            status: 'open',
            createdAt: new Date().toISOString(),
          };
          if (state.token) {
            apiClient.createTask({
              category: newTask.category,
              description: newTask.description,
              script: newTask.script,
              proof_type: newTask.proofType,
              alias: newTask.alias,
            }).catch(() => {});
          }
          return { tasks: [newTask, ...state.tasks] };
        }),

      claimTask: (taskId) =>
        set((state) => {
          if (state.token) {
            apiClient.claimTask(taskId).catch(() => {});
          }
          return {
            tasks: state.tasks.map((t) =>
              t.id === taskId ? { ...t, status: 'claimed' } : t
            ),
          };
        }),

      submitProof: (taskId, proofData) =>
        set((state) => {
          if (state.token) {
            const proofStr = typeof proofData === 'object' ? JSON.stringify(proofData) : proofData;
            apiClient.submitProof(taskId, proofStr).catch(() => {});
          }
          return {
            tasks: state.tasks.map((t) =>
              t.id === taskId ? { ...t, status: 'completed', proof: proofData } : t
            ),
          };
        }),

      acceptTask: (taskId) =>
        set((state) => {
          if (state.token) {
            apiClient.acceptTask(taskId).catch(() => {});
          }
          return {
            tasks: state.tasks.map((t) =>
              t.id === taskId ? { ...t, status: 'accepted' } : t
            ),
          };
        }),

      // Messages
      messages: [],

      fetchMessagesForTask: async (taskId) => {
        try {
          const rows = await apiClient.getMessages(taskId);
          const mapped = rows.map((r) => ({
            id: r.id,
            taskId: r.task_id,
            sender: r.sender_role,
            text: r.text,
            timestamp: r.created_at,
          }));
          set((state) => ({
            messages: [
              ...state.messages.filter((m) => m.taskId !== taskId),
              ...mapped,
            ],
          }));
        } catch {
          // Offline or no token yet
        }
      },

      receiveMessage: (msg) =>
        set((state) => {
          if (msg.id && state.messages.some((m) => m.id === msg.id)) return state;
          return { messages: [...state.messages, msg] };
        }),

      addMessage: (taskId, sender, text) => {
        const state = get();
        const timestamp = new Date().toISOString();

        if (state.token) {
          apiClient.sendMessage(taskId, sender, text).catch(() => {});
        }

        set((s) => ({ messages: [...s.messages, { taskId, sender, text, timestamp }] }));
      },

      // Ratings
      ratings: {},
      rateTask: (taskId, stars, helperId, review) =>
        set((state) => {
          if (state.token && helperId) {
            apiClient.submitRating(taskId, helperId, stars, review).catch(() => {});
          }
          return {
            ratings: { ...state.ratings, [taskId]: stars },
          };
        }),

      // UI State
      viewMode: 'requester',
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: 'whisper-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        tasks: state.tasks,
        messages: state.messages,
        ratings: state.ratings,
        viewMode: state.viewMode,
      }),
    }
  )
);


