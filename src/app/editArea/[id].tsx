import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CustomInput from "../../components/input";
import { router, useLocalSearchParams } from "expo-router";
import { editArea, getArea } from "../../db/Repositories/areaRepository";
import { Button, Text } from "@rneui/themed";
import {
  createCoordinate,
  deleteCoordinate,
  getAllCoordinate,
} from "../../db/Repositories/coordinateRepository";
import CardLocation from "../../components/cardLocation";
import CustomButtom from "../../components/buttom";
import { useCurrentLocation } from "../../hooks/currentLocation";

// types
type Area = {
  id: number;
  id_user: number;
  name: string;
  color: string | null;
};

type Locations = {
  id: number;
  longitude: number;
  latitude: number;
};

export default function EditArea() {
  const { id } = useLocalSearchParams();

  const { locations, getCurrentLocation } = useCurrentLocation();

  // exibe o pick colorsetInfoArea(infoData);
  const [showPickColor, setShowPickColor] = useState(false);

  // atributos area
  const [infoArea, setInfoArea] = useState<Area>();

  const [name, setName] = useState("");
  const [colorArea, setColorArea] = useState("");

  // locations area
  const [locationsArea, setLocationsArea] = useState<Locations[]>([]);

  // functions
  const validaArea = async () => {
    if (infoArea?.name !== name || infoArea?.color !== colorArea) {
      await editArea(Number(id), name, colorArea);
      createLocation(Number(id));
    }

    if (locations.length > 0) {
      await createLocation(Number(id)); // grava as localizações novas
    }

    router.push("/home");
  };

  const createLocation = async (idArea: number) => {
    for (const loc of locations) {
      await createCoordinate(idArea, loc.coords.latitude, loc.coords.longitude);
    }
  };

  const deleteCoordinateArea = async (idLocation: number) => {
    await deleteCoordinate(idLocation);
    setLocationsArea((prev) =>
      prev.filter((location) => location.id !== idLocation)
    );
  };

  const removeNewwCoordinate = () => {};

  // functions effect
  useEffect(() => {
    const infoData = async () => {
      const infoData = await getArea(Number(id));
      setInfoArea(infoData);
      setName(infoData?.name || "");
      setColorArea(infoData?.color || "");
    };
    infoData();
  }, [id]);

  useEffect(() => {
    const locationsArea = async () => {
      const locations = await getAllCoordinate(Number(id));
      setLocationsArea(locations);
    };
    locationsArea();
  }, [id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomInput
        label="Nome:"
        value={name}
        onChangeText={(val) => setName(val)}
      />

      <View style={styles.row}>
        <Text style={styles.label}>Cor área:</Text>
        <Button
          buttonStyle={[styles.colorButton, { backgroundColor: colorArea }]}
          onPress={() => setShowPickColor(true)}
        />
      </View>

      <CustomButtom
        title="Marcar"
        type="evilIcons"
        onPress={() => getCurrentLocation()}
      />

      {locationsArea.map((loc, index) => (
        <CardLocation
          key={index}
          lat={loc.latitude}
          long={loc.longitude}
          onPress={() => deleteCoordinateArea(loc.id)}
        />
      ))}

      {locations.map((loc, index) => (
        <CardLocation
          key={index}
          lat={loc.coords.latitude}
          long={loc.coords.longitude}
        />
      ))}

      <CustomButtom title="Salvar área" onPress={() => validaArea()} />
    </ScrollView>
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
