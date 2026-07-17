import { create } from 'zustand';

export const useStore = create((set) => ({
  tasks: [],
  addTask: (task) => set((state) => {
    const newTask = {
      ...task,
      id: `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'open', // open, claimed, completed, accepted
      createdAt: new Date().toISOString(),
    };
    return { tasks: [newTask, ...state.tasks] };
  }),
  claimTask: (taskId) => set((state) => ({
    tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: 'claimed' } : t)
  })),
  submitProof: (taskId, proofData) => set((state) => ({
    tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: 'completed', proof: proofData } : t)
  })),
  acceptTask: (taskId) => set((state) => ({
    tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: 'accepted' } : t)
  })),
  messages: [],
  addMessage: (taskId, sender, text) => set((state) => ({
    messages: [...state.messages, { taskId, sender, text, timestamp: new Date().toISOString() }]
  })),
  viewMode: 'requester',
  setViewMode: (mode) => set({ viewMode: mode })
}));
