import { Redirect } from "expo-router";

import { useSessionStore } from "@/state/session-store";

export default function IndexRoute() {
  const { hydrated, session, journey } = useSessionStore();

  if (!hydrated) {
    return null;
  }

  if (!session) {
    return <Redirect href="/(auth)" />;
  }

  if (journey?.isFirstTimeUser || !journey?.isOnboardingComplete) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
