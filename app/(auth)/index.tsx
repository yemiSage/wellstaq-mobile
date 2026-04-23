import { Redirect } from "expo-router";

import { EmailEntryScreen } from "@/features/auth/email-entry-screen";
import { useSessionStore } from "@/state/session-store";

export default function AuthIndexRoute() {
  const { session, journey, hydrated } = useSessionStore();

  if (!hydrated) {
    return null;
  }

  if (session && journey?.isOnboardingComplete) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <EmailEntryScreen />;
}
