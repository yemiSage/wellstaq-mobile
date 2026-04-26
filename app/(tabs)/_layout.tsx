import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { CalendarDays, Dumbbell, Grid2X2Plus, House, Map } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/text";
import { theme } from "@/theme";

const TAB_ITEMS: Record<string, { label: string; icon: (color: string, size: number, strokeWidth: number) => ReactNode }> = {
  home: {
    label: "Home",
    icon: (color, size, strokeWidth) => <House color={color} size={size} strokeWidth={strokeWidth} />
  },
  checkins: {
    label: "Challenge",
    icon: (color, size, strokeWidth) => <Dumbbell color={color} size={size} strokeWidth={strokeWidth} />
  },
  community: {
    label: "Space",
    icon: (color, size, strokeWidth) => <Map color={color} size={size} strokeWidth={strokeWidth} />
  },
  challenges: {
    label: "Event",
    icon: (color, size, strokeWidth) => <CalendarDays color={color} size={size} strokeWidth={strokeWidth} />
  },
  settings: {
    label: "More",
    icon: (color, size, strokeWidth) => <Grid2X2Plus color={color} size={size} strokeWidth={strokeWidth} />
  }
};

function WellstaqTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      <View style={styles.tabRow}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const tab = TAB_ITEMS[route.name];

          if (!tab) {
            return null;
          }

          const color = focused ? theme.colors.primary[1] : "#636363";
          const strokeWidth = focused ? 1.8 : 1.6;
          const options = descriptors[route.key]?.options;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={options?.tabBarAccessibilityLabel}
              testID={options?.tabBarButtonTestID}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true
                });

                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              }}
              onLongPress={() => {
                navigation.emit({
                  type: "tabLongPress",
                  target: route.key
                });
              }}
              style={({ pressed }) => [focused ? styles.activePill : styles.iconOnly, pressed && styles.tabPressed]}
            >
              {tab.icon(color, 24, strokeWidth)}
              {focused ? <AppText style={styles.activeLabel}>{tab.label}</AppText> : null}
            </Pressable>
          );
        })}
      </View>
      <View style={styles.homeIndicator} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <WellstaqTabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="checkins" options={{ title: "Challenge" }} />
      <Tabs.Screen name="community" options={{ title: "Space" }} />
      <Tabs.Screen name="challenges" options={{ title: "Event" }} />
      <Tabs.Screen name="settings" options={{ title: "More" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    backgroundColor: "#FFFFFF"
  },
  tabRow: {
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  activePill: {
    minWidth: 92,
    height: 32,
    borderRadius: 100,
    backgroundColor: "rgba(234, 106, 5, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4
  },
  activeLabel: {
    fontFamily: "InterSemiBold",
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.primary[1]
  },
  iconOnly: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  tabPressed: {
    opacity: 0.78
  },
  homeIndicator: {
    alignSelf: "center",
    width: 144,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#000000",
    marginTop: 21
  }
});
