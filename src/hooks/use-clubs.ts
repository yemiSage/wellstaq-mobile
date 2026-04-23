import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { clubRepository } from "@/services/mock/repositories";

export function useClubs() {
  const queryClient = useQueryClient();

  const clubs = useQuery({
    queryKey: ["clubs"],
    queryFn: () => clubRepository.listClubs()
  });

  const joinClub = useMutation({
    mutationFn: (clubId: string) => clubRepository.joinClub(clubId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["clubs"] });
    }
  });

  return { clubs, joinClub };
}
