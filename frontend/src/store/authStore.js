import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, access, refresh) => set({
        user,
        accessToken: access,
        refreshToken: refresh,
        isAuthenticated: true,
      }),

      setTokens: (access, refresh) => set({
        accessToken: access,
        refreshToken: refresh,
      }),

      setUser: (user) => set({ user }),

      logout: () => set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      }),
    }),
    {
      name: 'auth-storage', // saves to localStorage
    }
  )
);
