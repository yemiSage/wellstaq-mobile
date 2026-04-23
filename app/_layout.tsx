import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import { LaunchSplashScreenView } from "@/components/domain/auth";
import { AppProvider } from "@/providers/app-provider";
import { useSessionStore } from "@/state/session-store";
import { useAppFonts } from "@/theme/fonts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useAppFonts();
  const hydrated = useSessionStore((state) => state.hydrated);
  const [showLaunchSplash, setShowLaunchSplash] = useState(true);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!loaded || !hydrated) {
      setShowLaunchSplash(true);
      return;
    }

    const timeout = setTimeout(() => {
      setShowLaunchSplash(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [hydrated, loaded]);

  return (
    <AppProvider>
      <StatusBar style="dark" />
      {loaded && hydrated && !showLaunchSplash ? (
        <Slot />
      ) : (
        <LaunchSplashScreenView />
      )}
    </AppProvider>
  );
}
