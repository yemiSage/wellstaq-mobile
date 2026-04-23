import { Redirect } from "expo-router";

import { ProfileScreen } from "@/features/onboarding/profile-screen";
import { useSessionStore } from "@/state/session-store";

export default function OnboardingProfileRoute() {
  const { session } = useSessionStore();

  if (!session) {
    return <Redirect href="/(auth)" />;
  }

  return <ProfileScreen />;
}
