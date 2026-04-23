import { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { theme } from "@/theme";

export function EventsListScreen() {
  const [activeTab, setActiveTab] = useState<"company" | "discover">("company");

  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">Events</AppText>
      </View>

      <View style={styles.tabs}>
        <Pressable 
          style={[styles.tab, activeTab === "company" && styles.activeTab]}
          onPress={() => setActiveTab("company")}
        >
          <AppText weight={activeTab === "company" ? "bold" : "regular"} color={activeTab === "company" ? theme.colors.primary[1] : theme.colors.grey[2]}>Company</AppText>
        </Pressable>
        <Pressable 
          style={[styles.tab, activeTab === "discover" && styles.activeTab]}
          onPress={() => setActiveTab("discover")}
        >
          <AppText weight={activeTab === "discover" ? "bold" : "regular"} color={activeTab === "discover" ? theme.colors.primary[1] : theme.colors.grey[2]}>Discover</AppText>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.lg }}>
        {[1, 2].map(id => (
          <Pressable 
            key={id}
            style={styles.card}
            onPress={() => router.push(`/(events)/${id}` as any)}
          >
            <View style={styles.imagePlaceholder} />
            <View style={styles.content}>
              <AppText variant="caption" color={theme.colors.primary[1]} style={{ marginBottom: 4 }}>Oct 28 • 5:00 PM</AppText>
              <AppText weight="bold">Townhall Meeting</AppText>
              <AppText variant="caption" color={theme.colors.grey[2]}>Virtual</AppText>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: theme.spacing.lg },
  tabs: { flexDirection: "row", marginBottom: theme.spacing.xl, borderBottomWidth: 1, borderBottomColor: theme.colors.grey[4] },
  tab: { flex: 1, paddingVertical: theme.spacing.sm, alignItems: "center" },
  activeTab: { borderBottomWidth: 2, borderBottomColor: theme.colors.primary[1] },
  card: { flexDirection: "row", padding: theme.spacing.md, backgroundColor: theme.colors.grey[0], borderRadius: theme.radii.md, borderWidth: 1, borderColor: theme.colors.grey[4] },
  imagePlaceholder: { width: 80, height: 80, backgroundColor: theme.colors.grey[4], borderRadius: theme.radii.sm, marginRight: theme.spacing.md },
  content: { justifyContent: "center", flex: 1 }
});
