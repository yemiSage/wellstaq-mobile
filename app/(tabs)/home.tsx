import { Redirect } from "expo-router";

import { HomeScreen } from "@/features/home/home-screen";
import { useSessionStore } from "@/state/session-store";

export default function HomeRoute() {
  const { session, journey } = useSessionStore();

  if (!session) {
    return <Redirect href="/(auth)" />;
  }

  if (journey?.isFirstTimeUser || !journey?.isOnboardingComplete) {
    return <Redirect href="/(onboarding)/profile" />;
  }

  return <HomeScreen />;
}
