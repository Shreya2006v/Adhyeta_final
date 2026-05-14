import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  
  currentPage: 'dashboard',
  setCurrentPage: (page) => set({ currentPage: page }),
  
  toasts: [],
  addToast: (toast) => set((s) => ({ toasts: [...s.toasts, { id: Date.now(), ...toast }] })),
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter(t => t.id !== id) })),
  
  showLoading: true,
  setShowLoading: (v) => set({ showLoading: v }),

  konamiActive: false,
  setKonamiActive: (v) => set({ konamiActive: v }),
}));
