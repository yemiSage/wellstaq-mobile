import { View, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { SecondaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function SpaceDetailScreen() {
  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <SecondaryButton label="Back" onPress={() => router.back()} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imagePlaceholder} />
        
        <View style={styles.content}>
          <View>
            <AppText variant="title" weight="bold">Zen Spa & Massage</AppText>
            <AppText color={theme.colors.grey[2]}>Spa • 2.5 miles away</AppText>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.iconPlaceholder} />
            <View>
              <AppText weight="bold">Address</AppText>
              <AppText variant="caption" color={theme.colors.grey[2]}>123 Relaxation Ln, Suite 4</AppText>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconPlaceholder} />
            <View>
              <AppText weight="bold">Hours</AppText>
              <AppText variant="caption" color={theme.colors.grey[2]}>Open • Closes at 8:00 PM</AppText>
            </View>
          </View>

          <View style={{ marginTop: theme.spacing.md }}>
            <AppText variant="heading" weight="bold" style={{ marginBottom: theme.spacing.sm }}>About</AppText>
            <AppText style={styles.description}>
              Zen Spa offers a tranquil escape from the bustling city. Specializing in deep tissue and Swedish massages to aid your physical and mental recovery.
            </AppText>
          </View>
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: theme.spacing.md, alignItems: "flex-start" },
  imagePlaceholder: { height: 200, backgroundColor: theme.colors.grey[4], borderRadius: theme.radii.lg, marginBottom: theme.spacing.xl },
  content: { gap: theme.spacing.lg },
  infoRow: { flexDirection: "row", alignItems: "center", gap: theme.spacing.md },
  iconPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.grey[4] },
  description: { lineHeight: 22 }
});
