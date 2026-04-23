import { View, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

import { AppText } from "@/components/ui/text";
import { theme } from "@/theme";

export function BottomTabs({ activeTab = "Home" }: { activeTab?: string }) {
  const tabs = [
    { name: "Home", route: "/(tabs)/home" },
    { name: "Feed", route: "/(tabs)/community" },
    { name: "Challenges", route: "/(tabs)/challenges" },
    { name: "Clubs", route: "/(tabs)/clubs" },
    { name: "Profile", route: "/(tabs)/profile" }
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <Pressable 
            key={tab.name} 
            style={styles.tab} 
            onPress={() => router.push(tab.route as any)}
          >
            <View style={[styles.iconPlaceholder, isActive && styles.activeIcon]} />
            <AppText 
              variant="caption" 
              color={isActive ? theme.colors.primary[1] : theme.colors.grey[2]}
              weight={isActive ? "bold" : "regular"}
            >
              {tab.name}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80,
    backgroundColor: theme.colors.grey[0],
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey[4],
    paddingBottom: 20 // safe area roughly
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: theme.colors.grey[3],
    borderRadius: 4
  },
  activeIcon: {
    backgroundColor: theme.colors.primary[1]
  }
});
