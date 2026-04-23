import { View, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function EventDetailScreen() {
  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <SecondaryButton label="Back" onPress={() => router.back()} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imagePlaceholder} />
        
        <View style={styles.content}>
          <AppText variant="title" weight="bold">Townhall Meeting</AppText>
          
          <View style={styles.infoRow}>
            <View style={styles.iconPlaceholder} />
            <View>
              <AppText weight="bold">Oct 28, 2024</AppText>
              <AppText variant="caption" color={theme.colors.grey[2]}>5:00 PM - 6:00 PM</AppText>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.iconPlaceholder} />
            <View>
              <AppText weight="bold">Virtual</AppText>
              <AppText variant="caption" color={theme.colors.grey[2]}>Zoom link provided upon RSVP</AppText>
            </View>
          </View>

          <View style={{ marginTop: theme.spacing.md }}>
            <AppText variant="heading" weight="bold" style={{ marginBottom: theme.spacing.sm }}>About</AppText>
            <AppText style={styles.description}>
              Join us for our monthly company townhall where we will discuss our progress, celebrate achievements, and outline goals for the upcoming quarter.
            </AppText>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label="RSVP Now" onPress={() => router.back()} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: theme.spacing.md, alignItems: "flex-start" },
  imagePlaceholder: { height: 200, backgroundColor: theme.colors.grey[4], borderRadius: theme.radii.lg, marginBottom: theme.spacing.xl },
  content: { gap: theme.spacing.md },
  infoRow: { flexDirection: "row", alignItems: "center", gap: theme.spacing.md },
  iconPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.grey[4] },
  description: { lineHeight: 22 },
  footer: { marginTop: theme.spacing.xl }
});
