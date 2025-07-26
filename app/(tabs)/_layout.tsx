import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "홈",
          // tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              color={focused ? "black" : "gray"}
              size={24}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}
      />
      <Tabs.Screen
        name="write"
        options={{
          title: "글작성",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="add" color={focused ? "black" : "gray"} size={24} />
          ),
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
          title: "게시글",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="list"
              color={focused ? "black" : "gray"}
              size={24}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}
      />
    </Tabs>
  );
}
