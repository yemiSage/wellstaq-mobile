import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { feedRepository } from "@/services/mock/repositories";

export function useFeed() {
  const queryClient = useQueryClient();

  const feed = useQuery({
    queryKey: ["feed"],
    queryFn: () => feedRepository.listFeed()
  });

  const createPost = useMutation({
    mutationFn: feedRepository.createPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["feed"] });
    }
  });

  return { feed, createPost };
}
