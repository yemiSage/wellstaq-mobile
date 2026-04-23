import { Tabs } from "expo-router";
import { ChartNoAxesCombined, HeartPulse, House, Settings, Users } from "lucide-react-native";

import { theme } from "@/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary[1],
        tabBarInactiveTintColor: theme.colors.grey[3],
        tabBarStyle: {
          height: 72,
          paddingTop: 10,
          paddingBottom: 12,
          borderTopWidth: 0,
          elevation: 0
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="checkins"
        options={{
          title: "Check-ins",
          tabBarIcon: ({ color, size }) => <HeartPulse color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: "Challenges",
          tabBarIcon: ({ color, size }) => <ChartNoAxesCombined color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
