import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { TextField, SelectField, ChipGroup } from "@/components/ui/fields";
import { PrimaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function WorkContextScreen() {
  const [department, setDepartment] = useState("Engineering");
  const [role, setRole] = useState("Software Developer");
  const [workSetup, setWorkSetup] = useState<string[]>([]);

  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">Your Work Context</AppText>
        <AppText color={theme.colors.grey[2]}>This helps us tailor your wellbeing experience.</AppText>
      </View>

      <View style={styles.form}>
        <TextField
          label="Department"
          value={department}
          onChangeText={setDepartment}
        />
        <TextField
          label="Role"
          value={role}
          onChangeText={setRole}
        />
        <SelectField
          label="City"
          value="San Francisco"
        />
        <ChipGroup
          label="Work Setup"
          options={["Remote", "Hybrid", "Onsite"]}
          selected={workSetup}
          onToggle={(val) => setWorkSetup([val])}
        />
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          label="Continue" 
          onPress={() => router.push("/(onboarding)/profile-completion")}
          disabled={workSetup.length === 0}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.sm
  },
  form: {
    gap: theme.spacing.lg,
    flex: 1
  },
  footer: {
    marginTop: theme.spacing.xl
  }
});
