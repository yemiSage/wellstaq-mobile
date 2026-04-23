import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { ChipGroup } from "@/components/ui/fields";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function QuestionCardScreen({ 
  question = "How is your energy level today?", 
  options = ["Low", "Average", "High"],
  nextRoute = "/(onboarding)/questionnaire/priority"
}: { question?: string, options?: string[], nextRoute?: string }) {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <AppScreen padded={true}>
      <View style={styles.content}>
        <AppText variant="title" weight="bold" style={styles.question}>{question}</AppText>
        
        <View style={styles.optionsWrap}>
          <ChipGroup
            label=""
            options={options}
            selected={selected}
            onToggle={(val) => setSelected([val])}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <SecondaryButton label="Back" onPress={() => router.back()} style={{ flex: 1 }} />
        <View style={{ width: theme.spacing.md }} />
        <PrimaryButton 
          label="Next" 
          onPress={() => router.push(nextRoute as any)}
          disabled={selected.length === 0}
          style={{ flex: 1 }}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: "center", gap: theme.spacing.xl },
  question: { textAlign: "center" },
  optionsWrap: { alignItems: "center" },
  footer: { flexDirection: "row", marginTop: theme.spacing.xl }
});
