import { ColorWheel } from "react-native-color-wheel";
import { Dimensions, StyleSheet, View } from "react-native";
import { useState } from "react";

export default function PickColor() {
  const [currentColor, setCurrentColor] = useState();

  return (
    <View style={{ flex: 1 }}>
      <ColorWheel
        initialColor="#ee0000"
        onColorChange={(color) => console.log({ currentColor })}
        onColorChangeComplete={(color) => setCurrentColor(color)}
        style={{ width: Dimensions.get("window").width }}
        thumbStyle={{ height: 30, width: 30, borderRadius: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  wheel: {
    width: 300,
    height: 300,
  },
});
