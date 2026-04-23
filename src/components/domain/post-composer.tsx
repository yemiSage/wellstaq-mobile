import { StyleSheet, View } from "react-native";

import { SecondaryButton } from "@/components/ui/button";
import { AppText } from "@/components/ui/text";
import { theme } from "@/theme";

export function PostComposer({ onPress }: { onPress?: () => void }) {
  return (
    <View style={styles.container}>
      <AppText color={theme.colors.grey[2]}>Share a win, a reflection, or a check-in style update with your coworkers.</AppText>
      <SecondaryButton label="Create post" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grey[0],
    borderRadius: theme.radii.md,
    padding: theme.spacing.lg,
    gap: theme.spacing.md
  }
});
