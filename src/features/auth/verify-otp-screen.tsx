import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";

import { AuthGradientBackground, AuthInput, AuthScreenFrame, AuthSheet, BrandHero } from "@/components/domain/auth";
import { AppText } from "@/components/ui/text";
import { useAuthJourney } from "@/hooks/use-auth-journey";
import { authStyleGuide } from "@/theme/auth";
import { theme } from "@/theme";

const OTP_SECONDS = 59;

export function VerifyOtpScreen() {
  const { email = "" } = useLocalSearchParams<{ email: string }>();
  const { requestOtp, verifyOtp } = useAuthJourney();
  const [code, setCode] = useState("");
  const [secondsRemaining, setSecondsRemaining] = useState(OTP_SECONDS);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const normalizedEmail = useMemo(() => `${email}`.trim().toLowerCase(), [email]);

  useEffect(() => {
    setSecondsRemaining(OTP_SECONDS);
  }, [normalizedEmail]);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((current) => (current <= 1 ? 0 : current - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining]);

  useEffect(() => {
    if (code.length === 6) {
      void handleVerify(code);
    }
  }, [code]);

  async function handleVerify(otpToVerify: string) {
    setErrorMessage(null);

    try {
      const result = await verifyOtp.mutateAsync({ email: normalizedEmail, code: otpToVerify });

      if (result.journey.isFirstTimeUser || !result.journey.isOnboardingComplete) {
        router.replace("/(onboarding)/welcome");
        return;
      }

      router.replace("/(tabs)/home");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We could not verify your code.");
    }
  }

  async function handleResend() {
    setErrorMessage(null);
    setCode("");

    try {
      await requestOtp.mutateAsync(normalizedEmail);
      setSecondsRemaining(OTP_SECONDS);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We could not resend your code.");
    }
  }

  return (
    <AuthScreenFrame>
      <View style={styles.heroWrap}>
        <AuthGradientBackground />
        <BrandHero />
      </View>

      <AuthSheet
        title="Verify your email address"
        subtitle={
          <AppText style={styles.subtitle} color={theme.colors.grey[2]}>
            We've sent an email with your code to{" "}
            <AppText weight="bold" color={theme.colors.grey[1]}>
              {normalizedEmail}
            </AppText>{" "}
            kindly enter code below to continue
          </AppText>
        }
      >
        <View style={styles.contentFrame}>
          <View style={styles.formFrame}>
            <View style={styles.fieldWrap}>
              <AuthInput
                label="Enter OTP"
                required
                value={code}
                onChangeText={(value) => setCode(value.replace(/[^0-9]/g, ""))}
                placeholder="Enter the verification code"
                keyboardType="number-pad"
                maxLength={6}
                trailing={
                  secondsRemaining > 0 ? (
                    <AppText style={styles.trailingText} color={theme.colors.grey[3]}>
                      {`0:${`${secondsRemaining}`.padStart(2, "0")}`}
                    </AppText>
                  ) : (
                    <Pressable accessibilityRole="button" onPress={() => void handleResend()}>
                      <AppText weight="medium" style={styles.resendText} color={theme.colors.primary[1]}>
                        RESEND
                      </AppText>
                    </Pressable>
                  )
                }
              />
              {errorMessage ? (
                <AppText variant="caption" color="#B2553B" style={styles.errorText}>
                  {errorMessage}
                </AppText>
              ) : null}
            </View>

            <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.changeEmailButton}>
              <AppText weight="medium" style={styles.changeEmailText} color={theme.colors.primary[1]}>
                Change email
              </AppText>
            </Pressable>
          </View>

          <View style={styles.footerWrap}>
            <AppText style={styles.terms} color={theme.colors.grey[2]}>
              By continuing you agree to Wellstaq's{" "}
              <AppText weight="semibold" color={theme.colors.grey[1]} onPress={() => Linking.openURL("https://wellstaq.com/terms")}>
                Terms of use
              </AppText>{" "}
              and{" "}
              <AppText weight="semibold" color={theme.colors.grey[1]} onPress={() => Linking.openURL("https://wellstaq.com/privacy")}>
                privacy policy
              </AppText>
            </AppText>
          </View>
        </View>
      </AuthSheet>
    </AuthScreenFrame>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    flex: 1,
    overflow: "hidden"
  },
  subtitle: {
    fontSize: authStyleGuide.bodyText.fontSize,
    lineHeight: authStyleGuide.bodyText.lineHeight
  },
  contentFrame: {
    flex: 1,
    alignSelf: "stretch"
  },
  formFrame: {
    gap: 32,
    alignSelf: "stretch"
  },
  fieldWrap: {
    gap: theme.spacing.sm
  },
  trailingText: {
    fontSize: authStyleGuide.bodyText.fontSize,
    lineHeight: authStyleGuide.bodyText.lineHeight
  },
  resendText: {
    fontSize: authStyleGuide.bodyText.fontSize,
    lineHeight: authStyleGuide.bodyText.lineHeight
  },
  changeEmailButton: {
    alignItems: "center"
  },
  changeEmailText: {
    fontSize: authStyleGuide.bodyText.fontSize,
    lineHeight: authStyleGuide.bodyText.lineHeight,
    textDecorationLine: "underline"
  },
  footerWrap: {
    marginTop: "auto",
    paddingBottom: authStyleGuide.footerSpacing
  },
  terms: {
    textAlign: "center",
    fontSize: authStyleGuide.bodyText.fontSize,
    lineHeight: authStyleGuide.bodyText.lineHeight
  },
  errorText: {
    lineHeight: 18
  }
});
