import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/text";
import { Avatar, Badge } from "@/components/ui/layout";
import { theme } from "@/theme";
import { Announcement, Challenge, Club, DailyCheckIn, EmployeeNotification, FeedPost, PartnerListing, PersonalInsight, WellbeingEvent } from "@/models";
import { formatRelativeTime, formatShortDate } from "@/utils/format";

export function WellbeingSnapshotCard({ snapshot }: { snapshot: DailyCheckIn | null }) {
  return (
    <CardShell>
      <Badge label="Today’s wellbeing snapshot" />
      <AppText variant="h5" weight="bold">
        {snapshot ? `Mood ${snapshot.mood}/5, Energy ${snapshot.energy}/5` : "No check-in yet today"}
      </AppText>
      <AppText color={theme.colors.grey[2]}>
        {snapshot
          ? "Your latest entry stays private to you. HR only sees aggregated patterns across the organization."
          : "Start today with a quick private check-in to unlock your personal recommendations."}
      </AppText>
    </CardShell>
  );
}

export function QuickCheckInCard() {
  return (
    <CardShell tone="primary">
      <AppText variant="h5" weight="bold">
        Quick check-in
      </AppText>
      <AppText color={theme.colors.grey[2]}>Log your mood, stress, energy, sleep, and financial wellbeing in under a minute.</AppText>
    </CardShell>
  );
}

export function AnnouncementCard({ item }: { item: Announcement }) {
  return (
    <CardShell>
      <AppText weight="semibold">{item.title}</AppText>
      <AppText color={theme.colors.grey[2]}>{item.body}</AppText>
      <AppText variant="caption" color={theme.colors.grey[3]}>
        {item.author} · {formatShortDate(item.publishedAt)}
      </AppText>
    </CardShell>
  );
}

export function EventCard({ item }: { item: WellbeingEvent }) {
  return (
    <CardShell>
      <AppText weight="semibold">{item.title}</AppText>
      <AppText color={theme.colors.grey[2]}>{item.summary}</AppText>
      <AppText variant="caption" color={theme.colors.grey[3]}>
        {formatShortDate(item.date)} · {item.city}
      </AppText>
    </CardShell>
  );
}

export function ChallengeCard({ item }: { item: Challenge }) {
  return (
    <CardShell>
      <AppText weight="semibold">{item.title}</AppText>
      <AppText color={theme.colors.grey[2]}>
        {item.progress.current}/{item.progress.target} {item.progress.unit} completed
      </AppText>
      <Badge label={item.dimension} />
    </CardShell>
  );
}

export function ChallengeProgressCard({ item }: { item: Challenge }) {
  return (
    <CardShell tone="success">
      <AppText weight="semibold">{item.reward.name}</AppText>
      <AppText color={theme.colors.grey[2]}>{item.reward.description}</AppText>
    </CardShell>
  );
}

export function RecommendationCard({ item }: { item: PersonalInsight }) {
  return (
    <CardShell>
      <AppText weight="semibold">{item.title}</AppText>
      <AppText color={theme.colors.grey[2]}>{item.description}</AppText>
    </CardShell>
  );
}

export function ProductivityModeCard({ mode }: { mode: string }) {
  return (
    <CardShell tone="secondary">
      <AppText weight="semibold">Productivity mode</AppText>
      <AppText color={theme.colors.grey[2]}>Your current mode is {mode}. The app uses this to prioritize supportive prompts, not to monitor your work.</AppText>
    </CardShell>
  );
}

export function ClubCard({ item }: { item: Club }) {
  return (
    <CardShell>
      <AppText weight="semibold">{item.name}</AppText>
      <AppText color={theme.colors.grey[2]}>{item.description}</AppText>
      <AppText variant="caption" color={theme.colors.grey[3]}>
        {item.membersCount} members · {item.activityPreview}
      </AppText>
    </CardShell>
  );
}

export function FeedPostCard({ item }: { item: FeedPost }) {
  return (
    <CardShell>
      <View style={styles.row}>
        <Avatar initials={item.author.fullName.slice(0, 2).toUpperCase()} />
        <View style={{ flex: 1 }}>
          <AppText weight="semibold">{item.author.fullName}</AppText>
          <AppText variant="caption" color={theme.colors.grey[3]}>
            {item.author.role} · {formatRelativeTime(item.createdAt)}
          </AppText>
        </View>
      </View>
      <AppText>{item.content}</AppText>
    </CardShell>
  );
}

export function NotificationRow({ item }: { item: EmployeeNotification }) {
  return (
    <CardShell tone={item.read ? "default" : "primary"}>
      <AppText weight="semibold">{item.title}</AppText>
      <AppText color={theme.colors.grey[2]}>{item.body}</AppText>
    </CardShell>
  );
}

export function PartnerCard({ item }: { item: PartnerListing }) {
  return (
    <CardShell>
      <AppText weight="semibold">{item.name}</AppText>
      <AppText color={theme.colors.grey[2]}>
        {item.category} · {item.city}
      </AppText>
      <AppText color={theme.colors.grey[2]}>{item.summary}</AppText>
    </CardShell>
  );
}

export function LocationTagCard({ city, expiresAt }: { city: string; expiresAt: string }) {
  return (
    <CardShell tone="secondary">
      <AppText weight="semibold">Temporary location tag is on</AppText>
      <AppText color={theme.colors.grey[2]}>
        You’re discoverable in {city} until {formatShortDate(expiresAt)}. You can switch this off at any time.
      </AppText>
    </CardShell>
  );
}

export function InsightCard({ item }: { item: PersonalInsight }) {
  return <RecommendationCard item={item} />;
}

export function LeaderboardCard({ item }: { item: Challenge }) {
  return (
    <CardShell>
      <AppText weight="semibold">Leaderboard</AppText>
      {item.leaderboard.map((entry) => (
        <AppText key={entry.employeeId} color={theme.colors.grey[2]}>
          #{entry.rank} {entry.employeeName} · {entry.score}
        </AppText>
      ))}
    </CardShell>
  );
}

function CardShell({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "primary" | "secondary" | "success" }) {
  const toneStyle = {
    default: styles.defaultCard,
    primary: styles.primaryCard,
    secondary: styles.secondaryCard,
    success: styles.successCard
  };

  return <View style={[styles.card, toneStyle[tone]]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radii.md,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.grey[0]
  },
  defaultCard: {
    backgroundColor: theme.colors.grey[0]
  },
  primaryCard: {
    backgroundColor: theme.colors.primary[5]
  },
  secondaryCard: {
    backgroundColor: theme.colors.secondary[5]
  },
  successCard: {
    backgroundColor: theme.colors.success[5]
  },
  row: {
    flexDirection: "row",
    gap: theme.spacing.md,
    alignItems: "center"
  }
});
