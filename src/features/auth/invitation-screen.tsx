import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { PrimaryButton } from "@/components/ui/button";
import { AuthGradientBackground, AuthSheet, BrandHero } from "@/components/domain/auth";

export function InvitationScreen() {
  return (
    <AppScreen padded={false}>
      <View style={styles.heroWrap}>
        <AuthGradientBackground />
        <BrandHero />
      </View>

      <AuthSheet
        title="You've been invited!"
        subtitle="Your organization has invited you to join their WellStaq workspace to support your holistic wellbeing."
      >
        <PrimaryButton 
          label="Accept Invitation" 
          onPress={() => router.push("/(auth)/email-entry")} 
        />
      </AuthSheet>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    flex: 1,
    overflow: "hidden"
  }
});
