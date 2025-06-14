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
import { createCoordinate } from "../db/Repositories/coordinateRepository";
import useAddColor from "../states/colorArea";

export default function Area() {
  const [showPickColor, setShowPickColor] = useState(false);
  const router = useRouter();

  const [name, setName] = useState("");
  const [showError, setShowError] = useState(false);

  const { locations, getCurrentLocation, removeLocation } =
    useCurrentLocation();
  const { currentUser } = useCurrentUser();
  const { color } = useAddColor();

  // funcions
  const validaArea = async () => {
    if (name === "" || currentUser == null) {
      setShowError(true);
    } else {
      const area = await createArea(currentUser, name, color);
      createLocation(area.id);
      router.push("/home");
    }
  };

  const createLocation = async (idArea: number) => {
    for (const loc of locations) {
      await createCoordinate(idArea, loc.coords.latitude, loc.coords.longitude);
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
            buttonStyle={[
              styles.colorButton,
              { backgroundColor: color || "#49B265" },
            ]}
            onPress={() => setShowPickColor(true)}
          />
        </View>

        <CustomButtom
          title="Marcar"
          type="evilIcons"
          onPress={() => getCurrentLocation()}
        />
        {locations.map((loc, index) => (
          <CardLocation
            key={index}
            lat={loc.coords.latitude}
            long={loc.coords.longitude}
            onPress={() => removeLocation(index)}
            deletable={true}
          />
        ))}

        <View style={styles.containerList}></View>

        <CustomButtom title="Salvar área" onPress={() => validaArea()} />
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
