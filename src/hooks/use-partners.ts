import { useMutation, useQuery } from "@tanstack/react-query";

import { partnerRepository } from "@/services/mock/repositories";

export function usePartners() {
  const partners = useQuery({
    queryKey: ["partners"],
    queryFn: () => partnerRepository.listPartners()
  });

  const redeemOffer = useMutation({
    mutationFn: ({ partnerId, offerId }: { partnerId: string; offerId: string }) => partnerRepository.redeemOffer(partnerId, offerId)
  });

  return { partners, redeemOffer };
}
