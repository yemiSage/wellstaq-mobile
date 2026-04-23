import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { PrimaryButton } from "@/components/ui/button";
import { ScreenShell } from "@/features/shared/screen-shell";
import { partnerRepository } from "@/services/mock/repositories";
import { AppText } from "@/components/ui/text";

export function PartnerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [code, setCode] = useState<string | null>(null);
  const partner = useQuery({
    queryKey: ["partner", id],
    queryFn: () => partnerRepository.getPartner(String(id))
  });

  async function redeem() {
    const result = await partnerRepository.redeemOffer(String(id), partner.data?.offers[0]?.id ?? "");
    setCode(result.code);
  }

  if (!partner.data) {
    return <ScreenShell title="Partner detail" subtitle="Loading partner..." showBack>{null}</ScreenShell>;
  }

  return (
    <ScreenShell title={partner.data.name} subtitle={`${partner.data.category} · ${partner.data.city}`} showBack>
      <AppText>{partner.data.summary}</AppText>
      {partner.data.offers.map((offer) => (
        <AppText key={offer.id}>{offer.title}: {offer.description}</AppText>
      ))}
      <PrimaryButton label="Redeem reward code" onPress={redeem} />
      {code ? <AppText>Your placeholder redemption code: {code}</AppText> : null}
    </ScreenShell>
  );
}
