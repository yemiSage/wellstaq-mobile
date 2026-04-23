import { useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthGradientBackground, AuthInput, AuthPrimaryButton, AuthScreenFrame, AuthSheet, BrandHero, SocialIconButton } from "@/components/domain/auth";
import { AppleIcon, GoogleIcon } from "@/components/ui/icons";
import { AppText } from "@/components/ui/text";
import { useAuthJourney } from "@/hooks/use-auth-journey";
import { authStyleGuide } from "@/theme/auth";
import { theme } from "@/theme";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address")
});

export function EmailEntryScreen() {
  const { requestOtp } = useAuthJourney();
  const [apiError, setApiError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setApiError(null);

    try {
      const normalizedEmail = values.email.trim().toLowerCase();

      await requestOtp.mutateAsync(normalizedEmail);
      router.push({ pathname: "/(auth)/verify-otp", params: { email: normalizedEmail } });
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Something went wrong while sending your code.");
    }
  });

  const emailValue = form.watch("email");

  return (
    <AuthScreenFrame>
      <View style={styles.heroWrap}>
        <AuthGradientBackground />
        <BrandHero />
      </View>

      <AuthSheet title="Sign Up or Sign in into your account">
        <View style={styles.contentFrame}>
          <View style={styles.formFrame}>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <View style={styles.fieldWrap}>
                  <AuthInput
                    label="Email Address"
                    required
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="e.g Yedmifig@brefiesfield.com"
                    keyboardType="email-address"
                    helperText="For organizations sign in with your company's email"
                  />
                  {fieldState.error ? (
                    <AppText variant="caption" color="#B2553B" style={styles.errorText}>
                      {fieldState.error.message}
                    </AppText>
                  ) : null}
                </View>
              )}
            />

            {apiError ? (
              <AppText variant="caption" color="#B2553B" style={styles.errorText}>
                {apiError}
              </AppText>
            ) : null}

            <AuthPrimaryButton label="Continue" onPress={onSubmit} loading={requestOtp.isPending} disabled={!emailValue.trim()} />

            <AppText style={styles.dividerText} color={theme.colors.grey[3]}>
              - or continue with -
            </AppText>

            <View style={styles.socialRow}>
              <SocialIconButton label="Continue with Apple" icon={<AppleIcon color="#FFFFFF" />} />
              <SocialIconButton label="Continue with Google" icon={<GoogleIcon color="#FFFFFF" monochrome />} />
            </View>
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
  contentFrame: {
    flex: 1,
    alignSelf: "stretch"
  },
  formFrame: {
    gap: theme.spacing["2xl"],
    alignSelf: "stretch"
  },
  fieldWrap: {
    gap: theme.spacing.xs
  },
  dividerText: {
    textAlign: "center",
    fontSize: authStyleGuide.bodyText.fontSize,
    lineHeight: authStyleGuide.bodyText.lineHeight
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.md,
    alignSelf: "stretch"
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
