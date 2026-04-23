import { View, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function HomeScreen() {
  return (
    <AppScreen padded={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <AppText variant="caption" color={theme.colors.grey[2]}>Tuesday, Oct 24</AppText>
            <AppText variant="title" weight="bold">Hi, Jane 👋</AppText>
          </View>
          <View style={styles.avatar} />
        </View>

        <View style={styles.checkInCard}>
          <AppText variant="subheading" weight="bold">Daily Check-in</AppText>
          <AppText color={theme.colors.grey[2]} style={{ marginBottom: theme.spacing.md }}>
            Complete today's check-in to track your wellbeing baseline.
          </AppText>
          <PrimaryButton label="Complete today's check-in" onPress={() => router.push("/(tabs)/check-in" as any)} />
        </View>

        <View style={styles.section}>
          <AppText variant="heading" weight="bold" style={styles.sectionTitle}>Snapshot</AppText>
          <View style={styles.snapshotGrid}>
            <View style={styles.snapshotCard}><AppText>Energy: 80%</AppText></View>
            <View style={styles.snapshotCard}><AppText>Stress: Low</AppText></View>
            <View style={styles.snapshotCard}><AppText>Mood: Great</AppText></View>
          </View>
        </View>

        <View style={styles.section}>
          <AppText variant="heading" weight="bold" style={styles.sectionTitle}>Quick Navigation</AppText>
          <View style={{ gap: theme.spacing.sm }}>
            <SecondaryButton label="Join challenge" onPress={() => router.push("/(tabs)/challenges" as any)} />
            <SecondaryButton label="Explore spaces" onPress={() => router.push("/(tabs)/spaces" as any)} />
            <SecondaryButton label="View feed" onPress={() => router.push("/(tabs)/community" as any)} />
            <SecondaryButton label="Discover events" onPress={() => router.push("/(tabs)/events" as any)} />
          </View>
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing.xl },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.primary[1] },
  checkInCard: { backgroundColor: theme.colors.primary[5], padding: theme.spacing.lg, borderRadius: theme.radii.lg, marginBottom: theme.spacing.xl },
  section: { marginBottom: theme.spacing.xl },
  sectionTitle: { marginBottom: theme.spacing.md },
  snapshotGrid: { flexDirection: "row", gap: theme.spacing.sm, flexWrap: "wrap" },
  snapshotCard: { flex: 1, minWidth: 100, backgroundColor: theme.colors.grey[0], padding: theme.spacing.md, borderRadius: theme.radii.md, borderWidth: 1, borderColor: theme.colors.grey[4] }
});
