import { Button, Icon } from "@rneui/themed";
import { StyleSheet } from "react-native";

interface SmallProps {
  title: string;
  onPress: () => void;
}

export default function Small({ title, onPress }: SmallProps) {
  return (
    <Button
      onPress={onPress}
      title={title}
      iconRight={true}
      containerStyle={styles.container}
      buttonStyle={styles.button}
      titleStyle={styles.title}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "45%",
  },
  button: {
    backgroundColor: "#386E21",
    borderRadius: 8,
  },
  title: {
    color: "white",
    fontWeight: "medium",
    fontSize: 20,
  },
});
