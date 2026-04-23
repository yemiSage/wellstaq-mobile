import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { PrimaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function ProfileCompletionScreen() {
  return (
    <AppScreen padded={true}>
      <View style={styles.content}>
        <View style={styles.iconPlaceholder} />
        <AppText variant="title" weight="bold" style={styles.title}>Profile Complete!</AppText>
        <AppText color={theme.colors.grey[2]} style={styles.subtitle}>
          Your basic profile is set up. Now let's establish your wellbeing baseline so we can personalize your experience.
        </AppText>
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          label="Start Baseline" 
          onPress={() => router.push("/(onboarding)/questionnaire")}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md
  },
  iconPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primary[1],
    marginBottom: theme.spacing.lg
  },
  title: {
    textAlign: "center"
  },
  subtitle: {
    textAlign: "center",
    paddingHorizontal: theme.spacing.xl
  },
  footer: {
    marginTop: theme.spacing.xl
  }
});
