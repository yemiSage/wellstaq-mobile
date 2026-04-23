import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { TextField, ChipGroup } from "@/components/ui/fields";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function CreateClubScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string[]>([]);

  const isComplete = name && description && category.length > 0;

  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">Create a Club</AppText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.form}>
        <TextField label="Club Name" placeholder="e.g. Weekend Hikers" value={name} onChangeText={setName} />
        
        <ChipGroup
          label="Category"
          options={["Fitness", "Yoga", "Book clubs", "Hobbies", "Other"]}
          selected={category}
          onToggle={(val) => setCategory([val])}
        />

        <TextField 
          label="Description" 
          placeholder="What is this club about?" 
          value={description} 
          onChangeText={setDescription} 
          multiline 
        />
      </ScrollView>

      <View style={styles.footer}>
        <SecondaryButton label="Cancel" onPress={() => router.back()} style={{ flex: 1 }} />
        <View style={{ width: theme.spacing.md }} />
        <PrimaryButton 
          label="Create" 
          onPress={() => router.back()}
          disabled={!isComplete}
          style={{ flex: 1 }}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: theme.spacing.xl },
  form: { gap: theme.spacing.lg },
  footer: { flexDirection: "row", marginTop: theme.spacing.xl }
});
