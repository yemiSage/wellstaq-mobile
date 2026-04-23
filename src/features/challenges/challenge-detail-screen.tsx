import { View, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function ChallengeDetailScreen() {
  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <SecondaryButton label="Back" onPress={() => router.back()} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imagePlaceholder} />
        
        <View style={styles.content}>
          <AppText variant="title" weight="bold">Step Challenge</AppText>
          <AppText color={theme.colors.grey[2]}>Starts Nov 1 • 2 weeks</AppText>
          
          <AppText style={styles.description}>
            Join your colleagues in the ultimate step challenge! The goal is to reach 10,000 steps a day. Great for your physical wellbeing and mental clarity.
          </AppText>

          <View style={styles.stats}>
            <View style={styles.statBox}>
              <AppText weight="bold">142</AppText>
              <AppText variant="caption" color={theme.colors.grey[2]}>Joined</AppText>
            </View>
            <View style={styles.statBox}>
              <AppText weight="bold">Physical</AppText>
              <AppText variant="caption" color={theme.colors.grey[2]}>Dimension</AppText>
            </View>
          </View>
        </View>

      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton label="Join Challenge" onPress={() => router.push("/(challenges)/1/progress" as any)} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: theme.spacing.md, alignItems: "flex-start" },
  imagePlaceholder: { height: 200, backgroundColor: theme.colors.grey[4], borderRadius: theme.radii.lg, marginBottom: theme.spacing.xl },
  content: { gap: theme.spacing.md },
  description: { lineHeight: 22, marginTop: theme.spacing.sm },
  stats: { flexDirection: "row", gap: theme.spacing.md, marginTop: theme.spacing.lg },
  statBox: { flex: 1, padding: theme.spacing.md, backgroundColor: theme.colors.grey[0], borderRadius: theme.radii.md, borderWidth: 1, borderColor: theme.colors.grey[4], alignItems: "center" },
  footer: { marginTop: theme.spacing.xl }
});
