import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { ChipGroup } from "@/components/ui/fields";
import { PrimaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function DimensionSelectionScreen() {
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);

  const handleToggle = (val: string) => {
    setSelectedDimensions(prev => 
      prev.includes(val) ? prev.filter(d => d !== val) : [...prev, val]
    );
  };

  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">What areas matter to you right now?</AppText>
        <AppText color={theme.colors.grey[2]}>Select the wellbeing dimensions you'd like to focus on.</AppText>
      </View>

      <View style={styles.form}>
        <ChipGroup
          label="Wellbeing Dimensions"
          options={["Physical", "Mental", "Environmental", "Financial", "Occupational"]}
          selected={selectedDimensions}
          onToggle={handleToggle}
        />
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          label="Continue" 
          onPress={() => router.push("/(onboarding)/questionnaire/energy")}
          disabled={selectedDimensions.length === 0}
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
