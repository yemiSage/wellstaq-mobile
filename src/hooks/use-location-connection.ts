import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { locationRepository } from "@/services/mock/repositories";

export function useLocationConnection() {
  const queryClient = useQueryClient();

  const locationTag = useQuery({
    queryKey: ["location-tag"],
    queryFn: () => locationRepository.getLocationTag()
  });

  const nearby = useQuery({
    queryKey: ["nearby-employees"],
    queryFn: () => locationRepository.discoverNearby({})
  });

  const updateLocationTag = useMutation({
    mutationFn: locationRepository.updateTemporaryTag,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["location-tag"] });
    }
  });

  return { locationTag, nearby, updateLocationTag };
}
