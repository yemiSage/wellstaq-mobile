import { act } from "@testing-library/react-native";

import { useSessionStore } from "@/state/session-store";

describe("session store", () => {
  afterEach(async () => {
    await act(async () => {
      await useSessionStore.getState().logout();
    });
  });

  it("marks onboarding complete after the privacy step", () => {
    useSessionStore.setState({
      hydrated: true,
      session: {
        userId: "emp-001",
        email: "new@wellstaq.com",
        organizationId: "org-001",
        token: "token"
      },
      journey: {
        isFirstTimeUser: true,
        isOnboardingComplete: false,
        organizationId: "org-001"
      }
    });

    useSessionStore.getState().completeOnboarding();

    expect(useSessionStore.getState().journey).toEqual({
      isFirstTimeUser: false,
      isOnboardingComplete: true,
      organizationId: "org-001"
    });
  });
});
