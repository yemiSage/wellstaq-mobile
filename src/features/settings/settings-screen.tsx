import { router } from "expo-router";

import { EmptyState, PrivacyCallout } from "@/components/ui/feedback";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { ScreenShell } from "@/features/shared/screen-shell";
import { useSessionStore } from "@/state/session-store";

export function SettingsScreen() {
  const logout = useSessionStore((state) => state.logout);

  async function onLogout() {
    await logout();
    router.replace("/(auth)");
  }

  return (
    <ScreenShell title="Settings" subtitle="Profile, notifications, privacy controls, location settings, and access management.">
      <PrivacyCallout
        title="Privacy controls stay close at hand"
        body="Employees should always be able to understand what is private, what is visible, and how temporary discovery works."
      />
      <SecondaryButton label="Edit profile" />
      <SecondaryButton label="Notification preferences" onPress={() => router.push("/notifications")} />
      <SecondaryButton label="Location controls" onPress={() => router.push("/location")} />
      <SecondaryButton label="Partner directory" onPress={() => router.push("/partners")} />
      <PrimaryButton label="Logout" onPress={onLogout} />
      <EmptyState title="Password/help access" body="Email + OTP is the active sign-in flow, so change-password support is intentionally deferred behind future auth adapters." />
    </ScreenShell>
  );
}
