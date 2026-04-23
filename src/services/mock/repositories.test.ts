import { authRepository, checkInRepository } from "@/services/mock/repositories";

describe("mock repositories", () => {
  it("routes returning users after valid OTP verification", async () => {
    const result = await authRepository.verifyOtp("employee@wellstaq.com", "123456");

    expect(result.journey.isFirstTimeUser).toBe(false);
    expect(result.journey.isOnboardingComplete).toBe(true);
  });

  it("keeps check-ins employee scoped and appends a new entry", async () => {
    const before = await checkInRepository.listCheckIns();
    await checkInRepository.submitCheckIn({
      mood: 4,
      stress: 2,
      energy: 4,
      sleep: 4,
      financialWellbeing: 3
    });
    const after = await checkInRepository.listCheckIns();

    expect(after.length).toBe(before.length + 1);
    expect(after[0].mood).toBe(4);
  });
});
