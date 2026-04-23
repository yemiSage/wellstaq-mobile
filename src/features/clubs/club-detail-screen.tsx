import { View, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function ClubDetailScreen() {
  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <SecondaryButton label="Back" onPress={() => router.back()} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imagePlaceholder} />
        
        <View style={styles.content}>
          <AppText variant="title" weight="bold">Morning Runners</AppText>
          <AppText color={theme.colors.grey[2]}>Fitness • 42 Members</AppText>
          
          <AppText style={styles.description}>
            A club for early birds who love to start their day with a run. All paces are welcome! We usually meet at the downtown park on Tuesdays and Thursdays.
          </AppText>

          <View style={styles.recentActivity}>
            <AppText variant="heading" weight="bold" style={{ marginBottom: theme.spacing.md }}>Recent Activity</AppText>
            <View style={styles.postCard}>
              <AppText weight="bold">Alice M.</AppText>
              <AppText color={theme.colors.grey[1]}>Great run today everyone! See you Thursday.</AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label="Join Club" onPress={() => router.back()} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: theme.spacing.md, alignItems: "flex-start" },
  imagePlaceholder: { height: 200, backgroundColor: theme.colors.grey[4], borderRadius: theme.radii.lg, marginBottom: theme.spacing.xl },
  content: { gap: theme.spacing.md },
  description: { lineHeight: 22, marginTop: theme.spacing.sm },
  recentActivity: { marginTop: theme.spacing.xl },
  postCard: { padding: theme.spacing.md, backgroundColor: theme.colors.grey[0], borderRadius: theme.radii.md, borderWidth: 1, borderColor: theme.colors.grey[4] },
  footer: { marginTop: theme.spacing.xl }
});
