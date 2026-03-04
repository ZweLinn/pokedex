import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
      }}
    >
      <Tabs.Screen
        name="pokedex"
        options={{
          headerShown: false,
          title: "Pokedex",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          headerShown: false,
          title: "Favorite",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="heart"
              size={size}
              color={color}
              animation="pulse"
            />
          ),
        }}
      />
    </Tabs>
  );
}
