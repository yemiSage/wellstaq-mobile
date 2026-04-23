import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/text";
import { theme } from "@/theme";

export function PrivacyCallout({ title, body }: { title: string; body: string }) {
  return (
    <View style={[styles.card, styles.privacy]}>
      <AppText weight="semibold">{title}</AppText>
      <AppText color={theme.colors.grey[2]}>{body}</AppText>
    </View>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.card}>
      <AppText variant="h5" weight="bold">
        {title}
      </AppText>
      <AppText color={theme.colors.grey[2]}>{body}</AppText>
    </View>
  );
}

export function ErrorState({ title, body }: { title: string; body: string }) {
  return (
    <View style={[styles.card, styles.error]}>
      <AppText weight="semibold" color={theme.colors.error[1]}>
        {title}
      </AppText>
      <AppText color={theme.colors.grey[2]}>{body}</AppText>
    </View>
  );
}

export function LoadingBlock({ label }: { label?: string }) {
  return (
    <View style={styles.card}>
      <AppText color={theme.colors.grey[2]}>{label ?? "Loading..."}</AppText>
    </View>
  );
}

export function ListSkeleton() {
  return <LoadingBlock label="Loading content for this workspace section..." />;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.grey[0],
    padding: theme.spacing.lg,
    gap: theme.spacing.sm
  },
  privacy: {
    backgroundColor: theme.colors.secondary[5]
  },
  error: {
    backgroundColor: theme.colors.error[5]
  }
});
