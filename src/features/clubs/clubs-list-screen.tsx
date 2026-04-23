import { Pressable } from "react-native";
import { router } from "expo-router";

import { ClubCard } from "@/components/domain/cards";
import { PrimaryButton } from "@/components/ui/button";
import { ScreenShell } from "@/features/shared/screen-shell";
import { useClubs } from "@/hooks/use-clubs";

export function ClubsListScreen() {
  const { clubs } = useClubs();

  return (
    <ScreenShell title="Clubs & communities" subtitle="Find or create internal groups built around shared interests and healthy routines." showBack>
      <PrimaryButton label="Create club" onPress={() => router.push("/clubs/create")} />
      {clubs.data?.map((item) => (
        <Pressable key={item.id} onPress={() => router.push(`/clubs/${item.id}`)}>
          <ClubCard item={item} />
        </Pressable>
      ))}
    </ScreenShell>
  );
}
