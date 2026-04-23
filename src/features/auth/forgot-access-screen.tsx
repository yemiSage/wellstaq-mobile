import { StyleSheet, View } from "react-native";

import { AppScreen } from "@/components/ui/app-screen";
import { SecondaryButton } from "@/components/ui/button";
import { AuthGradientBackground, AuthSheet, BrandHero } from "@/components/domain/auth";
import { AppText } from "@/components/ui/text";
import { router } from "expo-router";

export function ForgotAccessScreen() {
  return (
    <AppScreen padded={false}>
      <View style={styles.heroWrap}>
        <AuthGradientBackground />
        <BrandHero />
      </View>
      <AuthSheet title="Need help getting back in?" subtitle="If your email doesn’t receive a code, confirm you’re using the address linked to your company workspace.">
        <AppText>
          For this frontend foundation, support is intentionally left as a placeholder. Connect this screen to your real support and resend workflows later.
        </AppText>
        <SecondaryButton label="Back to sign in" onPress={() => router.back()} />
      </AuthSheet>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    minHeight: 360,
    overflow: "hidden"
  }
});
