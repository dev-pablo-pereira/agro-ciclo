import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "@rneui/themed";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useCurrentLocation } from "../hooks/currentLocation";

import CustomButtom from "../components/buttom";
import CustomInput from "../components/input";
import PickColor from "../components/pickColor";
import CardLocation from "../components/cardLocation";

import { createArea } from "../db/Repositories/areaRepository";
import useCurrentUser from "../states/currentUser";

export default function Area() {
  const [showPickColor, setShowPickColor] = useState(false);
  const router = useRouter();

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [showError, setShowError] = useState(false);

  const { location, getCurrentLocation } = useCurrentLocation();
  const { currentUser } = useCurrentUser();

  // funcions
  const validaArea = async () => {
    if (name === "" || currentUser == null) {
      setShowError(true);
    } else {
      await createArea(currentUser, name, color);
      router.push("/home");
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomInput
          label="Nome:"
          placeholder="Área 1"
          onChangeText={(val) => setName(val)}
        />

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
          onPress={() => getCurrentLocation()}
        />
        {location && (
          <Text>
            {`Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`}
          </Text>
        )}

        <View style={styles.containerList}></View>

        <CustomButtom
          title="Salvar área"
          onPress={() => validaArea()}
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
