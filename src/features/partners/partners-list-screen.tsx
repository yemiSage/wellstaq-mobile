import { Pressable } from "react-native";
import { router } from "expo-router";

import { PartnerCard } from "@/components/domain/cards";
import { ScreenShell } from "@/features/shared/screen-shell";
import { usePartners } from "@/hooks/use-partners";

export function PartnersListScreen() {
  const { partners } = usePartners();

  return (
    <ScreenShell title="Wellness partners" subtitle="Employee-facing partner listings and offers. Booking and payment stay out of scope for now." showBack>
      {partners.data?.map((item) => (
        <Pressable key={item.id} onPress={() => router.push(`/partners/${item.id}`)}>
          <PartnerCard item={item} />
        </Pressable>
      ))}
    </ScreenShell>
  );
}
