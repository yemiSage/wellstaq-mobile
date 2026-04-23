import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Redirect } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppHeader } from "@/components/ui/layout";
import { theme } from "@/theme";
import { useSessionStore } from "@/state/session-store";

export function ScreenShell({
  title,
  subtitle,
  children,
  scroll = true,
  showBack = false,
  requireCompletedOnboarding = true
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  scroll?: boolean;
  showBack?: boolean;
  requireCompletedOnboarding?: boolean;
}) {
  const { session, journey, hydrated } = useSessionStore();

  if (!hydrated) {
    return null;
  }

  if (!session) {
    return <Redirect href="/(auth)" />;
  }

  if (requireCompletedOnboarding && (journey?.isFirstTimeUser || !journey?.isOnboardingComplete)) {
    return <Redirect href="/(onboarding)/profile" />;
  }

  return (
    <AppScreen scroll={scroll}>
      <AppHeader title={title} subtitle={subtitle} showBack={showBack} />
      <View style={styles.content}>{children}</View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.spacing.lg
  }
});
