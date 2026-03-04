import { router } from "expo-router";
import { Button, Text, View } from "react-native";
export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pokedex</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          router.push({
            pathname: "/(tabs)/pokedex/[id]" as const,
            params: { id: "1" },
          })
        }
      />
    </View>
  );
}
