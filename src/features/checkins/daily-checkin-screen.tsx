import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { PrimaryButton } from "@/components/ui/button";
import { ChipGroup, TextField } from "@/components/ui/fields";
import { theme } from "@/theme";

export function DailyCheckinScreen() {
  const [mood, setMood] = useState<string[]>([]);
  const [stress, setStress] = useState<string[]>([]);
  const [energy, setEnergy] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const isComplete = mood.length > 0 && stress.length > 0 && energy.length > 0;

  return (
    <AppScreen padded={true}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.xl }}>
        <View>
          <AppText variant="title" weight="bold">Daily Check-in</AppText>
          <AppText color={theme.colors.grey[2]}>Track how you feel today.</AppText>
        </View>

        <ChipGroup
          label="Mood"
          options={["Terrible", "Bad", "Okay", "Good", "Great"]}
          selected={mood}
          onToggle={(val) => setMood([val])}
        />

        <ChipGroup
          label="Stress Level"
          options={["Low", "Moderate", "High"]}
          selected={stress}
          onToggle={(val) => setStress([val])}
        />

        <ChipGroup
          label="Energy Level"
          options={["Low", "Moderate", "High"]}
          selected={energy}
          onToggle={(val) => setEnergy([val])}
        />

        <TextField
          label="Notes (Optional)"
          placeholder="Anything you'd like to add?"
          value={note}
          onChangeText={setNote}
          multiline
        />

        <View style={{ marginTop: theme.spacing.xl }}>
          <PrimaryButton 
            label="Save Check-in" 
            onPress={() => router.back()}
            disabled={!isComplete}
          />
        </View>
      </ScrollView>
    </AppScreen>
  );
}
