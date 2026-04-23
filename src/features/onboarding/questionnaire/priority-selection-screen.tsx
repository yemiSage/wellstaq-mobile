import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { ChipGroup } from "@/components/ui/fields";
import { PrimaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function PrioritySelectionScreen() {
  const [priorities, setPriorities] = useState<string[]>([]);

  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">Set your priorities</AppText>
        <AppText color={theme.colors.grey[2]}>Based on your answers, what would you like to tackle first?</AppText>
      </View>

      <View style={styles.form}>
        <ChipGroup
          label="Top Priorities"
          options={["Stress management", "Fitness / healthy eating", "Social life", "Financial management"]}
          selected={priorities}
          onToggle={(val) => setPriorities(prev => 
            prev.includes(val) ? prev.filter(p => p !== val) : [...prev, val]
          )}
        />
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          label="Finish Baseline" 
          onPress={() => router.replace("/(tabs)/home")}
          disabled={priorities.length === 0}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: theme.spacing.xl, gap: theme.spacing.sm },
  form: { gap: theme.spacing.lg, flex: 1 },
  footer: { marginTop: theme.spacing.xl }
});
