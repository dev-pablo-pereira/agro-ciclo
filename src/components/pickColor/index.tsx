import { ColorWheel } from "react-native-color-wheel";
import { StyleSheet } from "react-native";
import tinycolor from "tinycolor2";

import useAddColor from "../../states/colorArea";

export default function PickColor() {
  const { addColor } = useAddColor();

  return (
    <ColorWheel
      initialColor="#ee0000"
      onColorChangeComplete={(color) => {
        const hex = tinycolor(color).toHexString();
        console.log("Selecionou cor:", hex);
        addColor(hex);
      }}
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
