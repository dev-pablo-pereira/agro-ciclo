import { Button, Card, Icon, Text } from "@rneui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";

export interface CardLocationProps {
  lat: number;
  long: number;
  onPress?: () => void
}

export default function CardLocation({ lat, long, onPress}: CardLocationProps) {
  return (
    <Card containerStyle={styles.container}>
      <View style={styles.row}>
        <View>
          <Text style={styles.text}>Lat: {lat}</Text>
          <Text style={styles.text}>Long: {long}</Text>
        </View>
        <Button
        onPress={onPress}
        type="clear"
        icon={{
          name:"trash-2",
          type:"feather",
          color:'#C25757'
        }}/>
      </View>
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
  },
  row: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
