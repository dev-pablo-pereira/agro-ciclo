import { ColorWheel } from "react-native-color-wheel";
import { StyleSheet } from "react-native";
import { useState } from "react";

export default function PickColor() {
  const [currentColor, setCurrentColor] = useState();

  return (
    <ColorWheel
      initialColor="#ee0000"
      onColorChange={(color) => console.log({ currentColor })}
      onColorChangeComplete={(color) => setCurrentColor(color)}
      style={styles.wheel}
    />
  );
}

const styles = StyleSheet.create({
  wheel: {
    width: 200,
    height: 200,
    backgroundColor: "#fff",
  },
});
