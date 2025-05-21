import { View, StyleSheet } from "react-native";
import CustomButtom from "./components/buttom";
import CustomInput from "./components/input";
import PickColor from "./components/pickColor";
import { Button, Text } from "@rneui/themed";
import { useState } from "react";
import CardLocation from "./components/cardLocation";

export default function Area() {
  const [showPickColor, setShowPickColor] = useState(false);

  return (
    <View style={styles.container}>
      <CustomInput label="Nome:" placeholder="Área 1" />

      <View style={styles.row}>
        <Text style={styles.label}>Cor área:</Text>
        <Button
          buttonStyle={[styles.colorButton, { backgroundColor: "#49B265" }]} // cor atual da área
          onPress={() => setShowPickColor(true)}
        />
      </View>

      <CustomButtom
        title="Marcar"
        type="evilIcons"
        onPress={() => console.log("Marcar")}
      />

      <CardLocation lat={20} long={30}/>

      <CustomButtom title="Salvar área" onPress={() => console.log("Salvar")} />

      {showPickColor && (
        <View style={styles.overlay}>
          <View style={styles.pickerContainer}>
            <PickColor />
            <Button
              title="Fechar"
              buttonStyle={styles.closeButton}
              onPress={() => setShowPickColor(false)}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 60
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  colorButton: {
    width: 60,
    height: 30,
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#d33",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
});
