import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DetailPage() {
  const id = useLocalSearchParams<{ id: string }>().id;
  return (
    <View>
      <Text>This is {id}</Text>
    </View>
  );
}
