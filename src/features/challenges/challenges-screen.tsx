import { router } from "expo-router";
import { Pressable } from "react-native";

import { ChallengeCard } from "@/components/domain/cards";
import { ScreenShell } from "@/features/shared/screen-shell";
import { useChallenges } from "@/hooks/use-challenges";
import { SecondaryButton } from "@/components/ui/button";

export function ChallengesScreen() {
  const { challenges } = useChallenges();

  return (
    <ScreenShell title="Challenges" subtitle="Join active wellbeing challenges, track progress, and collect recognition along the way.">
      <SecondaryButton label="Completed history" onPress={() => router.push("/challenges/history")} />
      {challenges.data?.map((item) => (
        <Pressable key={item.id} onPress={() => router.push(`/challenges/${item.id}`)}>
          <ChallengeCard item={item} />
        </Pressable>
      ))}
    </ScreenShell>
  );
}
