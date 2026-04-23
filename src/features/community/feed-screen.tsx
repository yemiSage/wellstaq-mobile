import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { PrimaryButton } from "@/components/ui/button";
import { theme } from "@/theme";

export function FeedScreen() {
  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">Community Feed</AppText>
        <PrimaryButton label="Post" onPress={() => router.push("/(community)/create-post" as any)} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.lg }}>
        {[1, 2, 3].map(id => (
          <Pressable 
            key={id} 
            style={styles.postCard}
            onPress={() => router.push(`/(community)/post/${id}` as any)}
          >
            <View style={styles.postHeader}>
              <View style={styles.avatar} />
              <View>
                <AppText weight="bold">John Doe</AppText>
                <AppText variant="caption" color={theme.colors.grey[2]}>2 hours ago</AppText>
              </View>
            </View>
            <AppText style={styles.postBody}>
              Just finished the 5k run challenge! Feeling amazing. Keep it up everyone!
            </AppText>
            <View style={styles.postFooter}>
              <AppText color={theme.colors.grey[2]}>12 Likes</AppText>
              <AppText color={theme.colors.grey[2]}>4 Comments</AppText>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing.xl },
  postCard: { padding: theme.spacing.lg, backgroundColor: theme.colors.grey[0], borderRadius: theme.radii.lg, borderWidth: 1, borderColor: theme.colors.grey[4] },
  postHeader: { flexDirection: "row", gap: theme.spacing.sm, marginBottom: theme.spacing.md },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.primary[5] },
  postBody: { marginBottom: theme.spacing.md },
  postFooter: { flexDirection: "row", gap: theme.spacing.lg }
});
