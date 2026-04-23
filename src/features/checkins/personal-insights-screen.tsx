import { InsightCard } from "@/components/domain/cards";
import { ScreenShell } from "@/features/shared/screen-shell";
import { useCheckIns } from "@/hooks/use-checkins";

export function PersonalInsightsScreen() {
  const { insights } = useCheckIns();

  return (
    <ScreenShell title="Personal insights" subtitle="These suggestions are generated from your private history and preferences." showBack>
      {insights.data?.map((item) => (
        <InsightCard key={item.id} item={item} />
      ))}
    </ScreenShell>
  );
}
