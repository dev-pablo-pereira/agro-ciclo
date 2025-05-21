import { Card, Text } from "@rneui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";

interface CardLocationProps {
  lat: number;
  long: number;
}

export default function CardLocation({ lat, long }: CardLocationProps) {
  return (
    <Card containerStyle={styles.container}>
      <Text style={styles.text}>Lat: {lat}</Text>
      <Text style={styles.text}>Long: {long}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
    container: {
    width: "70%",
    borderRadius: 5,
    backgroundColor: "#8D6E63",
  },
  text: {
    color: "white",
    fontSize: 20,
  }
});
