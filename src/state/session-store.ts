import { create } from "zustand";

import { AuthSession, UserJourneyState } from "@/models";
import { sessionRepository } from "@/services/mock/repositories";

interface SessionState {
  hydrated: boolean;
  session: AuthSession | null;
  journey: UserJourneyState | null;
  notificationCount: number;
  hydrate: () => Promise<void>;
  setAuth: (session: AuthSession, journey: UserJourneyState) => Promise<void>;
  completeOnboarding: () => void;
  logout: () => Promise<void>;
  setNotificationCount: (value: number) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  hydrated: false,
  session: null,
  journey: null,
  notificationCount: 1,
  async hydrate() {
    const payload = await sessionRepository.restore();
    set({
      session: payload?.session ?? null,
      hydrated: true,
      journey: payload?.journey ?? null
    });
  },
  async setAuth(session, journey) {
    await sessionRepository.persist({ session, journey });
    set({ session, journey });
  },
  completeOnboarding() {
    set((state) => ({
      journey: state.journey
        ? {
            ...state.journey,
            isFirstTimeUser: false,
            isOnboardingComplete: true
          }
        : state.journey
    }));
  },
  async logout() {
    await sessionRepository.persist(null);
    set({ session: null, journey: null });
  },
  setNotificationCount(value) {
    set({ notificationCount: value });
  }
}));
