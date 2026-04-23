import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { TextField } from "@/components/ui/fields";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function CreatePostScreen() {
  const [content, setContent] = useState("");

  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">Create Post</AppText>
      </View>

      <View style={styles.form}>
        <TextField
          label="What's on your mind?"
          placeholder="Share an update, image, or milestone..."
          value={content}
          onChangeText={setContent}
          multiline
        />
        
        <View style={styles.imagePlaceholder}>
          <AppText color={theme.colors.grey[3]}>Tap to add image</AppText>
        </View>
      </View>

      <View style={styles.footer}>
        <SecondaryButton label="Cancel" onPress={() => router.back()} style={{ flex: 1 }} />
        <View style={{ width: theme.spacing.md }} />
        <PrimaryButton 
          label="Post" 
          onPress={() => router.back()}
          disabled={!content}
          style={{ flex: 1 }}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: theme.spacing.xl },
  form: { flex: 1, gap: theme.spacing.lg },
  imagePlaceholder: { height: 120, borderRadius: theme.radii.md, backgroundColor: theme.colors.grey[4], alignItems: "center", justifyContent: "center" },
  footer: { flexDirection: "row", marginTop: theme.spacing.xl }
});
