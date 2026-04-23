import { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { ChipGroup } from "@/components/ui/fields";
import { theme } from "@/theme";

export function SpacesListScreen() {
  const [category, setCategory] = useState<string[]>(["All"]);

  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">Wellness Spaces</AppText>
        <AppText color={theme.colors.grey[2]}>Discover local spots for your wellbeing.</AppText>
      </View>

      <View style={{ marginBottom: theme.spacing.lg }}>
        <ChipGroup
          label=""
          options={["All", "Gyms", "Spas", "Therapists"]}
          selected={category}
          onToggle={(val) => setCategory([val])}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.lg }}>
        {[1, 2, 3].map(id => (
          <Pressable 
            key={id}
            style={styles.card}
            onPress={() => router.push(`/(spaces)/${id}` as any)}
          >
            <View style={styles.imagePlaceholder} />
            <View style={styles.content}>
              <AppText weight="bold">Zen Spa & Massage</AppText>
              <AppText variant="caption" color={theme.colors.grey[2]} style={{ marginBottom: 4 }}>Spa • 2.5 miles away</AppText>
              <AppText variant="caption" color={theme.colors.grey[1]}>Rating: 4.8/5</AppText>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: theme.spacing.lg },
  card: { flexDirection: "row", padding: theme.spacing.md, backgroundColor: theme.colors.grey[0], borderRadius: theme.radii.md, borderWidth: 1, borderColor: theme.colors.grey[4] },
  imagePlaceholder: { width: 80, height: 80, backgroundColor: theme.colors.grey[4], borderRadius: theme.radii.sm, marginRight: theme.spacing.md },
  content: { justifyContent: "center", flex: 1 }
});
