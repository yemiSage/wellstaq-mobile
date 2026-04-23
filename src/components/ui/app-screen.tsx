import { PropsWithChildren, ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/theme";

interface AppScreenProps extends PropsWithChildren {
  background?: ReactNode;
  scroll?: boolean;
  padded?: boolean;
}

export function AppScreen({ children, background, scroll = true, padded = true }: AppScreenProps) {
  const content = (
    <View style={[styles.content, padded && styles.padded]}>
      {background}
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.safeArea}>
        {scroll ? <ScrollView contentContainerStyle={styles.scroll}>{content}</ScrollView> : content}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.grey[5]
  },
  scroll: {
    flexGrow: 1
  },
  content: {
    flex: 1
  },
  padded: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing["3xl"]
  }
});
