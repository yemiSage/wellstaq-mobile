import { Redirect } from "expo-router";

import { WelcomeScreen } from "@/features/onboarding/welcome-screen";
import { useSessionStore } from "@/state/session-store";

export default function OnboardingWelcomeRoute() {
  const { session } = useSessionStore();

  if (!session) {
    return <Redirect href="/(auth)" />;
  }

  return <WelcomeScreen />;
}
