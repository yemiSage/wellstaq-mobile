import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { PrimaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function ClubListScreen() {
  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">Clubs</AppText>
        <PrimaryButton label="Create" onPress={() => router.push("/(clubs)/create" as any)} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.lg }}>
        {[
          { id: 1, title: "Morning Runners", category: "Fitness", members: 42 },
          { id: 2, title: "Book Worms", category: "Book clubs", members: 128 },
          { id: 3, title: "Mindful Yoga", category: "Yoga", members: 35 }
        ].map(club => (
          <Pressable 
            key={club.id}
            style={styles.card}
            onPress={() => router.push(`/(clubs)/${club.id}` as any)}
          >
            <View style={styles.imagePlaceholder} />
            <View style={styles.content}>
              <AppText weight="bold">{club.title}</AppText>
              <AppText variant="caption" color={theme.colors.grey[2]}>{club.category} • {club.members} Members</AppText>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing.xl },
  card: { flexDirection: "row", padding: theme.spacing.md, backgroundColor: theme.colors.grey[0], borderRadius: theme.radii.md, borderWidth: 1, borderColor: theme.colors.grey[4] },
  imagePlaceholder: { width: 60, height: 60, backgroundColor: theme.colors.grey[4], borderRadius: theme.radii.sm, marginRight: theme.spacing.md },
  content: { justifyContent: "center" }
});
