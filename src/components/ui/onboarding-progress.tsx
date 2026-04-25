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
    width: 180,
    height: 3,
    borderRadius: 12,
    backgroundColor: "#EBE7E9",
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    borderRadius: 20,
    backgroundColor: "#202020"
  }
});
