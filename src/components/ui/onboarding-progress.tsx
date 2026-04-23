import { StyleSheet, View } from "react-native";

import { theme } from "@/theme";

export function OnboardingProgressBar({
  progress = 0
}: {
  progress?: number;
}) {
  const safeProgress = Math.max(0, Math.min(1, progress));

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${safeProgress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flex: 1,
    flex: 1,
    height: 4,
    borderRadius: theme.radii.pill,
    backgroundColor: "#E8E5EC",
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.grey[1]
  }
});
