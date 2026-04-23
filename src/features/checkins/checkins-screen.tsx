import { useState } from "react";
import { View } from "react-native";

import { PrimaryButton } from "@/components/ui/button";
import { EmptyState, PrivacyCallout } from "@/components/ui/feedback";
import { ScreenShell } from "@/features/shared/screen-shell";
import { useCheckIns } from "@/hooks/use-checkins";
import { AppText } from "@/components/ui/text";
import { formatShortDate } from "@/utils/format";
import { router } from "expo-router";
import { ChipGroup } from "@/components/ui/fields";
import { theme } from "@/theme";

export function CheckInsScreen() {
  const { checkIns, insights, submitCheckIn } = useCheckIns();
  const [moodSelection, setMoodSelection] = useState<string[]>(["4"]);

  async function submitQuickEntry() {
    await submitCheckIn.mutateAsync({
      mood: Number(moodSelection[0] ?? 4),
      stress: 2,
      energy: 4,
      sleep: 3,
      financialWellbeing: 3
    });
  }

  return (
    <ScreenShell title="Daily check-ins" subtitle="Private reflections that help you spot patterns and get more useful recommendations.">
      <PrivacyCallout
        title="Private to you"
        body="Your individual check-ins and personal insights are not visible to HR or your manager. Organizational reporting stays aggregated."
      />
      <ChipGroup label="Quick mood check" options={["1", "2", "3", "4", "5"]} selected={moodSelection} onToggle={(value) => setMoodSelection([value])} />
      <PrimaryButton label="Submit private check-in" onPress={submitQuickEntry} loading={submitCheckIn.isPending} />
      <PrimaryButton label="View personal insights" onPress={() => router.push("/personal-insights")} />
      {checkIns.data?.length ? (
        <View style={{ gap: theme.spacing.md }}>
          {checkIns.data.map((item) => (
            <View key={item.id} style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: 16, gap: 4 }}>
              <AppText weight="semibold">{formatShortDate(item.createdAt)}</AppText>
              <AppText color={theme.colors.grey[2]}>
                Mood {item.mood}/5 · Stress {item.stress}/5 · Energy {item.energy}/5 · Sleep {item.sleep}/5
              </AppText>
            </View>
          ))}
        </View>
      ) : (
        <EmptyState title="No check-ins yet" body="Your first check-in helps WellStaq tailor recommendations and private trend summaries." />
      )}
      {insights.data?.[0] ? (
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: 16, gap: 4 }}>
          <AppText weight="semibold">Personal insight preview</AppText>
          <AppText color={theme.colors.grey[2]}>{insights.data[0].description}</AppText>
        </View>
      ) : null}
    </ScreenShell>
  );
}
