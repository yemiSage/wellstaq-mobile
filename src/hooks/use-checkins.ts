import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { checkInRepository } from "@/services/mock/repositories";

export function useCheckIns() {
  const queryClient = useQueryClient();

  const checkIns = useQuery({
    queryKey: ["checkins"],
    queryFn: () => checkInRepository.listCheckIns()
  });

  const insights = useQuery({
    queryKey: ["insights"],
    queryFn: () => checkInRepository.listInsights()
  });

  const submitCheckIn = useMutation({
    mutationFn: checkInRepository.submitCheckIn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["checkins"] });
      await queryClient.invalidateQueries({ queryKey: ["home-dashboard"] });
    }
  });

  return { checkIns, insights, submitCheckIn };
}
