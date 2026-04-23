import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { TextField } from "@/components/ui/fields";
import { PrimaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function BasicInfoScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">Let's get to know you</AppText>
        <AppText color={theme.colors.grey[2]}>Please provide your basic information to set up your profile.</AppText>
      </View>

      <View style={styles.form}>
        <View style={styles.avatarPlaceholder}>
          <AppText color={theme.colors.grey[3]}>Photo</AppText>
        </View>

        <TextField
          label="First Name"
          placeholder="e.g. Jane"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextField
          label="Last Name"
          placeholder="e.g. Doe"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          label="Continue" 
          onPress={() => router.push("/(onboarding)/work-context")}
          disabled={!firstName || !lastName}
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
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.grey[4],
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: theme.spacing.md
  },
  footer: {
    marginTop: theme.spacing.xl
  }
});
