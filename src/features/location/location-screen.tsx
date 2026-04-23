import { useState } from "react";

import { LocationTagCard } from "@/components/domain/cards";
import { PrimaryButton } from "@/components/ui/button";
import { ToggleRow } from "@/components/ui/fields";
import { ScreenShell } from "@/features/shared/screen-shell";
import { useLocationConnection } from "@/hooks/use-location-connection";
import { AppText } from "@/components/ui/text";

export function LocationScreen() {
  const { locationTag, nearby, updateLocationTag } = useLocationConnection();
  const [enabled, setEnabled] = useState(locationTag.data?.enabled ?? true);

  async function save() {
    if (!locationTag.data) {
      return;
    }
    await updateLocationTag.mutateAsync({ ...locationTag.data, enabled });
  }

  return (
    <ScreenShell title="Location-based connection" subtitle="Make temporary city-level visibility explicit, optional, and easy to control." showBack>
      {locationTag.data ? <LocationTagCard city={locationTag.data.city} expiresAt={locationTag.data.expiresAt} /> : null}
      <ToggleRow
        title="Temporary location tag"
        description="When enabled, coworkers can discover you by city for a limited time. This is never exact-location sharing."
        value={enabled}
        onValueChange={setEnabled}
      />
      <PrimaryButton label="Save location preference" onPress={save} />
      <AppText>Nearby coworkers</AppText>
      {nearby.data?.map((person) => (
        <AppText key={person.id}>{person.fullName} · {person.department} · {person.city}</AppText>
      ))}
    </ScreenShell>
  );
}
