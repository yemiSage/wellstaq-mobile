import { useLocalSearchParams } from "expo-router";

import { ScreenShell } from "@/features/shared/screen-shell";
import { mockPeople } from "@/mocks/data";
import { AppText } from "@/components/ui/text";
import { SecondaryButton } from "@/components/ui/button";

export function EmployeeProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const person = mockPeople.find((item) => item.id === id) ?? mockPeople[0];

  return (
    <ScreenShell title={person.fullName} subtitle={`${person.role} · ${person.department}`} showBack>
      <AppText>City: {person.city}</AppText>
      <AppText>Interests: {person.interests.join(", ")}</AppText>
      <SecondaryButton label={person.isFollowing ? "Unfollow" : "Follow"} />
    </ScreenShell>
  );
}
