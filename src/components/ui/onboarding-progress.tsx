import { StyleSheet, View } from "react-native";

import { theme } from "@/theme";

export function OnboardingProgressBar({
  progress,
  segments = 3,
  activeSegments
}: {
  progress?: number;
  segments?: number;
  activeSegments?: number;
}) {
  const normalizedSegments = Math.max(1, segments);
  const segmentProgress =
    typeof activeSegments === "number"
      ? Math.max(0, Math.min(normalizedSegments, activeSegments))
      : Math.max(0, Math.min(1, progress ?? 0)) * normalizedSegments;

  return (
    <View style={styles.row}>
      {Array.from({ length: normalizedSegments }).map((_, index) => {
        const fillAmount = Math.max(0, Math.min(1, segmentProgress - index));

        return (
          <View key={index} style={styles.segmentTrack}>
            <View style={[styles.segmentFill, { width: `${fillAmount * 100}%` }]} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    gap: theme.spacing.sm
  },
  segmentTrack: {
    flex: 1,
    height: 4,
    borderRadius: theme.radii.pill,
    backgroundColor: "#E8E5EC",
    overflow: "hidden"
  },
  segmentFill: {
    height: "100%",
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.grey[1]
  }
});
