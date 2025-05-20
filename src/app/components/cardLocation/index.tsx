import { Card, Text } from "@rneui/themed";
import { StyleSheet } from "react-native";

interface CardLocationProps {
  lat: number;
  long: number;
}

export default function CardLocation({ lat, long }: CardLocationProps) {
  return (
    <Card>
      <Text>Lat: {lat}</Text>
      <Text>Long: {long}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({});
