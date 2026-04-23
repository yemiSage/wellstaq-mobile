import { NotificationRow } from "@/components/domain/cards";
import { ScreenShell } from "@/features/shared/screen-shell";
import { useNotifications } from "@/hooks/use-notifications";

export function NotificationsScreen() {
  const { data } = useNotifications();

  return (
    <ScreenShell title="Notifications" subtitle="Challenge invites, comments, event reminders, rewards, and partner offers." showBack>
      {data?.map((item) => (
        <NotificationRow key={item.id} item={item} />
      ))}
    </ScreenShell>
  );
}
