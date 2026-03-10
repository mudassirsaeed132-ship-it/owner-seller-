// PATH: src/features/auth/model/authStore.js
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      selectedRole: null,
      authFlow: null,
      pendingEmail: "",

      setSelectedRole: (selectedRole) => set({ selectedRole }),
      setAuthFlow: (authFlow) => set({ authFlow }),
      setPendingEmail: (pendingEmail) => set({ pendingEmail }),

      loginSuccess: ({ token, user }) =>
        set({
          token,
          user,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : state.user,
        })),

      markSellerVerified: () =>
        set((state) => ({
          user: state.user
            ? { ...state.user, isSellerVerified: true }
            : state.user,
        })),

      clearTransientFlow: () =>
        set({
          authFlow: null,
          pendingEmail: "",
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          selectedRole: null,
          authFlow: null,
          pendingEmail: "",
        }),
    }),
    {
      name: "real-estate-auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        selectedRole: state.selectedRole,
        authFlow: state.authFlow,
        pendingEmail: state.pendingEmail,
      }),
    }
  )
);

export default useAuthStore;