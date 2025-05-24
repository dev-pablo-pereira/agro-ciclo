import { View, StyleSheet } from "react-native";
interface ColorAreaProps {
  color: string;
}

export default function ColorArea({ color }: ColorAreaProps) {
  return <View style={[styles.container, { backgroundColor: color }]}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 60,
    borderRadius: 7,
  },
});
