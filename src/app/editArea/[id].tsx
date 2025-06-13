import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EditArea() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text> textInComponent: {id}</Text>
    </View>
  );
}
