import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { challengeRepository } from "@/services/mock/repositories";

export function useChallenges() {
  const queryClient = useQueryClient();

  const challenges = useQuery({
    queryKey: ["challenges"],
    queryFn: () => challengeRepository.listChallenges()
  });

  const joinChallenge = useMutation({
    mutationFn: (challengeId: string) => challengeRepository.joinChallenge(challengeId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["challenges"] });
    }
  });

  return { challenges, joinChallenge };
}
