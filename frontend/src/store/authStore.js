import { create } from "zustand";

const BASE_URL = "http://localhost:3001/api/auth";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });

      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.message || "Something went wrong",
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  register: async (payload) => {
    try {
      set({ isLoading: true, error: null });

      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await res.json();

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.message || "Something went wrong",
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });

      const res = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Logout failed");
      }

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.message || "Something went wrong",
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });

      const res = await fetch(`${BASE_URL}/check`, {
        method: "POST",
        credentials: "include", 
      });

      if (!res.ok) {
        throw new Error("Not authenticated");
      }

      const data = await res.json();

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
