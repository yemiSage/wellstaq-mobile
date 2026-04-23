import { AuthSession, OtpVerificationResult, UserJourneyState } from "@/models";

export interface AuthRepository {
  requestOtp(email: string): Promise<{ success: true }>;
  verifyOtp(email: string, code: string): Promise<OtpVerificationResult>;
  getJourneyState(userId: string): Promise<UserJourneyState>;
  logout(): Promise<void>;
}

export interface SessionRepository {
  restore(): Promise<{ session: AuthSession; journey: UserJourneyState } | null>;
  persist(payload: { session: AuthSession; journey: UserJourneyState } | null): Promise<void>;
}
