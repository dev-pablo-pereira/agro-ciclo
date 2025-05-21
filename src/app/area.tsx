import { View, StyleSheet, ScrollView } from "react-native";
import CustomButtom from "./components/buttom";
import CustomInput from "./components/input";
import PickColor from "./components/pickColor";
import { Button, Text } from "@rneui/themed";
import { useState } from "react";
import CardLocation from "./components/cardLocation";
import { useRouter } from "expo-router";

const LOCATIONS = [
  { id: "1", lat: 30, long: 90 },
  { id: "2", lat: 31, long: 91 },
  { id: "3", lat: 32, long: 92 },
  { id: "4", lat: 33, long: 93 },
  { id: "5", lat: 34, long: 94 },
  { id: "6", lat: 35, long: 95 },
  { id: "7", lat: 36, long: 96 },
];

export default function Area() {
  const [showPickColor, setShowPickColor] = useState(false);
  const router = useRouter()

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomInput label="Nome:" placeholder="Área 1" />

        <View style={styles.row}>
          <Text style={styles.label}>Cor área:</Text>
          <Button
            buttonStyle={[styles.colorButton, { backgroundColor: "#49B265" }]}
            onPress={() => setShowPickColor(true)}
          />
        </View>

        <CustomButtom
          title="Marcar"
          type="evilIcons"
          onPress={() => console.log("Marcar")}
        />

        <View style={styles.containerList}>
          {LOCATIONS.map((item) => (
            <CardLocation key={item.id} lat={item.lat} long={item.long} />
          ))}
        </View>

        <CustomButtom
          title="Salvar área"
          onPress={() => router.navigate('/home')}
        />
      </ScrollView>

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
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: "center",
    gap: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 60,
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
  containerList: {
    width: "100%",
    marginLeft: 70,
    gap: 10,
  },
});
