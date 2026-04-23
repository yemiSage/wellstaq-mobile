import { View, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { TextField } from "@/components/ui/fields";
import { theme } from "@/theme";

export function PostDetailScreen() {
  return (
    <AppScreen padded={true}>
      <View style={styles.header}>
        <SecondaryButton label="Back" onPress={() => router.back()} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.lg }}>
        <View style={styles.postCard}>
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
        </View>

        <View style={styles.commentsSection}>
          <AppText variant="subheading" weight="bold" style={styles.commentsTitle}>Comments (4)</AppText>
          
          <View style={styles.commentInputWrap}>
            <TextField label="" placeholder="Write a comment..." value="" onChangeText={() => {}} />
            <PrimaryButton label="Send" style={styles.sendButton} />
          </View>

          {[1, 2].map(id => (
            <View key={id} style={styles.commentRow}>
              <View style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <AppText weight="bold">Jane Smith</AppText>
                <AppText color={theme.colors.grey[1]}>Great job, John!</AppText>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: theme.spacing.xl, alignItems: "flex-start" },
  postCard: { padding: theme.spacing.lg, backgroundColor: theme.colors.grey[0], borderRadius: theme.radii.lg, borderWidth: 1, borderColor: theme.colors.grey[4] },
  postHeader: { flexDirection: "row", gap: theme.spacing.sm, marginBottom: theme.spacing.md },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.primary[5] },
  postBody: { marginBottom: theme.spacing.md },
  commentsSection: { marginTop: theme.spacing.md },
  commentsTitle: { marginBottom: theme.spacing.md },
  commentInputWrap: { flexDirection: "row", gap: theme.spacing.sm, marginBottom: theme.spacing.xl, alignItems: "center" },
  sendButton: { height: 44, marginTop: 24 }, // align with text field
  commentRow: { flexDirection: "row", gap: theme.spacing.sm, marginBottom: theme.spacing.md },
  commentAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: theme.colors.grey[4] },
  commentContent: { flex: 1, backgroundColor: theme.colors.grey[0], padding: theme.spacing.sm, borderRadius: theme.radii.md }
});
