import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { theme } from "@/theme";

export function ChallengeListScreen() {
  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">Challenges</AppText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.xl }}>
        <View>
          <AppText variant="subheading" weight="bold" style={styles.sectionTitle}>Ongoing</AppText>
          <Pressable 
            style={styles.card}
            onPress={() => router.push("/(challenges)/1/progress" as any)}
          >
            <AppText weight="bold">30 Days of Mindfulness</AppText>
            <AppText color={theme.colors.grey[2]}>Ends in 12 days</AppText>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "60%" }]} />
            </View>
          </Pressable>
        </View>

        <View>
          <AppText variant="subheading" weight="bold" style={styles.sectionTitle}>Upcoming</AppText>
          {[1, 2].map(id => (
            <Pressable 
              key={id}
              style={styles.card}
              onPress={() => router.push(`/(challenges)/${id}` as any)}
            >
              <AppText weight="bold">Step Challenge</AppText>
              <AppText color={theme.colors.grey[2]}>Starts Nov 1</AppText>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: theme.spacing.xl },
  sectionTitle: { marginBottom: theme.spacing.md },
  card: { padding: theme.spacing.lg, backgroundColor: theme.colors.grey[0], borderRadius: theme.radii.lg, borderWidth: 1, borderColor: theme.colors.grey[4], marginBottom: theme.spacing.md },
  progressBar: { height: 8, backgroundColor: theme.colors.grey[4], borderRadius: 4, marginTop: theme.spacing.md },
  progressFill: { height: "100%", backgroundColor: theme.colors.primary[1], borderRadius: 4 }
});
