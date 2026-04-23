import { router } from "expo-router";

import { FeedPostCard } from "@/components/domain/cards";
import { PostComposer } from "@/components/domain/post-composer";
import { ScreenShell } from "@/features/shared/screen-shell";
import { useFeed } from "@/hooks/use-feed";

export function CommunityScreen() {
  const { feed } = useFeed();

  return (
    <ScreenShell title="Company feed" subtitle="Announcements, internal posts, and shared wellbeing momentum across your organization.">
      <PostComposer onPress={() => router.push("/create-post")} />
      {feed.data?.map((item) => (
        <FeedPostCard key={item.id} item={item} />
      ))}
    </ScreenShell>
  );
}
