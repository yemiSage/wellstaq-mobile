import { EmptyState } from "@/components/ui/feedback";
import { ScreenShell } from "@/features/shared/screen-shell";

export function ChallengeHistoryScreen() {
  return (
    <ScreenShell title="Completed challenges" subtitle="A history view for past challenge participation and earned recognition." showBack>
      <EmptyState title="History scaffold ready" body="Connect this screen to historical challenge data once your backend contract is available." />
    </ScreenShell>
  );
}
