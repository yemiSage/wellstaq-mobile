import { View, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { SecondaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function ChallengeProgressScreen() {
  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <SecondaryButton label="Back" onPress={() => router.back()} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.xl }}>
        <View>
          <AppText variant="title" weight="bold">30 Days of Mindfulness</AppText>
          <AppText color={theme.colors.grey[2]}>18 / 30 Days Completed</AppText>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "60%" }]} />
          </View>
        </View>

        <View>
          <AppText variant="heading" weight="bold" style={styles.sectionTitle}>Leaderboard</AppText>
          <View style={styles.board}>
            {[1, 2, 3].map(rank => (
              <View key={rank} style={styles.row}>
                <AppText weight="bold" style={{ width: 30 }}>{rank}</AppText>
                <View style={styles.avatar} />
                <AppText style={{ flex: 1 }}>{rank === 1 ? "Sarah K." : "Mike T."}</AppText>
                <AppText weight="bold">{30 - rank * 2} days</AppText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: theme.spacing.md, alignItems: "flex-start" },
  progressBar: { height: 12, backgroundColor: theme.colors.grey[4], borderRadius: 6, marginTop: theme.spacing.md },
  progressFill: { height: "100%", backgroundColor: theme.colors.primary[1], borderRadius: 6 },
  sectionTitle: { marginBottom: theme.spacing.md },
  board: { gap: theme.spacing.sm },
  row: { flexDirection: "row", alignItems: "center", padding: theme.spacing.md, backgroundColor: theme.colors.grey[0], borderRadius: theme.radii.md, borderWidth: 1, borderColor: theme.colors.grey[4] },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: theme.colors.primary[5], marginRight: theme.spacing.md }
});
