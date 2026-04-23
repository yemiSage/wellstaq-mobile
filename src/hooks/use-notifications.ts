import { useQuery } from "@tanstack/react-query";

import { notificationRepository } from "@/services/mock/repositories";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationRepository.listNotifications()
  });
}
