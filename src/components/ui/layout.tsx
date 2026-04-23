import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Bell, ChevronLeft } from "lucide-react-native";

import { AppText } from "@/components/ui/text";
import { theme } from "@/theme";
import { useSessionStore } from "@/state/session-store";

export function AppHeader({ title, subtitle, showBack = false, right }: { title: string; subtitle?: string; showBack?: boolean; right?: ReactNode }) {
  const router = useRouter();
  const notificationCount = useSessionStore((state) => state.notificationCount);

  return (
    <View style={styles.header}>
      <View style={styles.headerTitleRow}>
        {showBack ? (
          <Pressable onPress={() => router.back()} style={styles.iconShell}>
            <ChevronLeft size={20} color={theme.colors.grey[1]} />
          </Pressable>
        ) : null}
        <View style={{ flex: 1 }}>
          <AppText variant="h4" weight="bold">
            {title}
          </AppText>
          {subtitle ? <AppText color={theme.colors.grey[2]}>{subtitle}</AppText> : null}
        </View>
        {right ?? (
          <Pressable onPress={() => router.push("/notifications")} style={styles.iconShell}>
            <Bell size={20} color={theme.colors.grey[1]} />
            {notificationCount > 0 ? <View style={styles.badge} /> : null}
          </Pressable>
        )}
      </View>
    </View>
  );
}

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <View style={styles.section}>
      <AppText variant="h5" weight="bold">
        {title}
      </AppText>
      {action}
    </View>
  );
}

export function BottomSheetSurface({ children }: { children: ReactNode }) {
  return <View style={styles.sheet}>{children}</View>;
}

export function Avatar({ initials }: { initials: string }) {
  return (
    <View style={styles.avatar}>
      <AppText weight="semibold" color={theme.colors.primary[1]}>
        {initials}
      </AppText>
    </View>
  );
}

export function Badge({ label }: { label: string }) {
  return (
    <View style={styles.tag}>
      <AppText variant="caption" weight="semibold" color={theme.colors.primary[1]}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md
  },
  iconShell: {
    height: 44,
    width: 44,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.grey[0],
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  badge: {
    height: 10,
    width: 10,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.primary[1],
    position: "absolute",
    right: 12,
    top: 10
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sheet: {
    backgroundColor: theme.colors.grey[5],
    borderTopLeftRadius: theme.radii.xl,
    borderTopRightRadius: theme.radii.xl,
    padding: theme.spacing["2xl"],
    gap: theme.spacing.lg,
    ...theme.shadows.card
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: theme.radii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary[5]
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary[5],
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.radii.pill
  }
});
