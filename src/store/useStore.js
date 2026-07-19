import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateAlias } from '../lib/utils';

export const useStore = create(
  persist(
    (set) => ({
      // ─── Tasks ───────────────────────────────────────────────────────────
      tasks: [],
      addTask: (task) =>
        set((state) => {
          const newTask = {
            ...task,
            id: `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
            alias: task.alias || generateAlias(),
            status: 'open', // open | claimed | completed | accepted
            createdAt: new Date().toISOString(),
          };
          return { tasks: [newTask, ...state.tasks] };
        }),
      claimTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, status: 'claimed' } : t
          ),
        })),
      submitProof: (taskId, proofData) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? { ...t, status: 'completed', proof: proofData }
              : t
          ),
        })),
      acceptTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, status: 'accepted' } : t
          ),
        })),

      // ─── Messages ────────────────────────────────────────────────────────
      messages: [],
      addMessage: (taskId, sender, text) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              taskId,
              sender,
              text,
              timestamp: new Date().toISOString(),
            },
          ],
        })),

      // ─── Ratings ─────────────────────────────────────────────────────────
      ratings: {},
      rateTask: (taskId, stars) =>
        set((state) => ({
          ratings: { ...state.ratings, [taskId]: stars },
        })),

      // ─── UI State ────────────────────────────────────────────────────────
      viewMode: 'requester',
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: 'whisper-store', // localStorage key
      partialize: (state) => ({
        tasks: state.tasks,
        messages: state.messages,
        ratings: state.ratings,
        viewMode: state.viewMode,
      }),
    }
  )
);
