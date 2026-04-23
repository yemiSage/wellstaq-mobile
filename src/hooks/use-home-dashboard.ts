import { useQuery } from "@tanstack/react-query";

import { homeRepository } from "@/services/mock/repositories";

export function useHomeDashboard() {
  return useQuery({
    queryKey: ["home-dashboard"],
    queryFn: () => homeRepository.getDashboard()
  });
}
