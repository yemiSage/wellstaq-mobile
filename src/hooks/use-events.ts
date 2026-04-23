import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { eventRepository } from "@/services/mock/repositories";

export function useEvents() {
  const queryClient = useQueryClient();

  const events = useQuery({
    queryKey: ["events"],
    queryFn: () => eventRepository.listEvents()
  });

  const rsvp = useMutation({
    mutationFn: (eventId: string) => eventRepository.rsvp(eventId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    }
  });

  return { events, rsvp };
}
