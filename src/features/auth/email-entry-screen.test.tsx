import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";

import { EmailEntryScreen } from "@/features/auth/email-entry-screen";

const mockPush = jest.fn();
const mockMutateAsync = jest.fn();

jest.mock("expo-router", () => ({
  router: {
    push: (...args: unknown[]) => mockPush(...args)
  }
}));

jest.mock("@/hooks/use-auth-journey", () => ({
  useAuthJourney: () => ({
    requestOtp: {
      mutateAsync: mockMutateAsync,
      isPending: false
    }
  })
}));

describe("EmailEntryScreen", () => {
  beforeEach(() => {
    mockMutateAsync.mockReset();
    mockPush.mockReset();
  });

  it("renders the premium auth content", () => {
    render(<EmailEntryScreen />);

    expect(screen.getByText("Sign Up or Sign in into your account")).toBeTruthy();
    expect(screen.getByText("Email Address")).toBeTruthy();
    expect(screen.getByText("*")).toBeTruthy();
    expect(screen.getByText("For organizations sign in with your company's email")).toBeTruthy();
    expect(screen.getByText("Continue")).toBeTruthy();
    expect(screen.getByText("- or continue with -")).toBeTruthy();
    expect(screen.getByLabelText("Continue with Apple")).toBeTruthy();
    expect(screen.getByLabelText("Continue with Google")).toBeTruthy();
    expect(screen.getByText(/By continuing you agree to Wellstaq's/i)).toBeTruthy();
  });

  it("disables continue when the email is empty and enables it once entered", () => {
    render(<EmailEntryScreen />);

    const continueButton = screen.getByRole("button", { name: "Continue" });
    expect(continueButton.props.accessibilityState.disabled).toBe(true);

    fireEvent.changeText(screen.getByPlaceholderText("e.g Yedmifig@brefiesfield.com"), "person@company.com");

    expect(screen.getByRole("button", { name: "Continue" }).props.accessibilityState.disabled).toBe(false);
  });

  it("submits a trimmed lowercase email and routes to otp verification", async () => {
    mockMutateAsync.mockResolvedValueOnce(undefined);

    render(<EmailEntryScreen />);

    fireEvent.changeText(screen.getByPlaceholderText("e.g Yedmifig@brefiesfield.com"), "  Person@Company.com ");
    fireEvent.press(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith("person@company.com");
    });

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/(auth)/verify-otp",
      params: { email: "person@company.com" }
    });
  });
});
