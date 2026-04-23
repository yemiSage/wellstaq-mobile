import { router } from "expo-router";
import { useState } from "react";

import { PrimaryButton } from "@/components/ui/button";
import { PrivacyCallout } from "@/components/ui/feedback";
import { ToggleRow } from "@/components/ui/fields";
import { ScreenShell } from "@/features/shared/screen-shell";
import { onboardingRepository } from "@/services/mock/repositories";
import { useSessionStore } from "@/state/session-store";

export function PrivacyScreen() {
  const [acceptsTerms, setAcceptsTerms] = useState(true);
  const [understandsHrBoundary, setUnderstandsHrBoundary] = useState(true);
  const [locationTaggingEnabled, setLocationTaggingEnabled] = useState(false);
  const completeOnboarding = useSessionStore((state) => state.completeOnboarding);

  async function finish() {
    if (!acceptsTerms || !understandsHrBoundary) {
      return;
    }
    await onboardingRepository.completePrivacyStep();
    completeOnboarding();
    router.replace("/(tabs)/home");
  }

  return (
    <ScreenShell title="Privacy and consent" subtitle="Clear boundaries matter. Your app experience should feel supportive, not invasive." requireCompletedOnboarding={false}>
      <PrivacyCallout
        title="What HR can and cannot see"
        body="HR/admin can see aggregated organizational trends. They cannot see your individual mood logs, personal insights, or private check-in history."
      />
      <ToggleRow title="Accept terms" description="Required to continue into your workspace." value={acceptsTerms} onValueChange={setAcceptsTerms} />
      <ToggleRow
        title="I understand the privacy boundary"
        description="Required so the employee experience stays transparent and trustworthy."
        value={understandsHrBoundary}
        onValueChange={setUnderstandsHrBoundary}
      />
      <ToggleRow
        title="Enable temporary location tagging"
        description="Optional. This lets colleagues discover you by city for a limited time only."
        value={locationTaggingEnabled}
        onValueChange={setLocationTaggingEnabled}
      />
      <PrimaryButton label="Finish setup" onPress={finish} />
    </ScreenShell>
  );
}
