import { useMutation } from "@tanstack/react-query";

import { authRepository } from "@/services/mock/repositories";
import { useSessionStore } from "@/state/session-store";

export function useAuthJourney() {
  const setAuth = useSessionStore((state) => state.setAuth);

  const requestOtp = useMutation({
    mutationFn: (email: string) => authRepository.requestOtp(email)
  });

  const verifyOtp = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) => authRepository.verifyOtp(email, code),
    onSuccess: async (result) => {
      await setAuth(result.session, result.journey);
    }
  });

  return { requestOtp, verifyOtp };
}
