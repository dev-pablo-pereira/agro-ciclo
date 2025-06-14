import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CustomInput from "../../components/input";
import { useLocalSearchParams } from "expo-router";
import { getArea } from "../../db/Repositories/areaRepository";
import { Button, Text } from "@rneui/themed";
import { getAllCoordinate } from "../../db/Repositories/coordinateRepository";
import CardLocation from "../../components/cardLocation";

type Locations = {
  longitude: number;
  latitude: number;
};

export default function EditArea() {
  const { id } = useLocalSearchParams();

  // exibe o pick color
  const [showPickColor, setShowPickColor] = useState(false);

  // atributos area
  const [name, setName] = useState("");
  const [colorArea, setColorArea] = useState("");

  // locations area
  const [locationsArea, setLocationsArea] = useState<Locations[]>([]);

  useEffect(() => {
    const infoData = async () => {
      const infoData = await getArea(Number(id));
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
      <Button onPress={() => console.log(locationsArea)}>teste</Button>
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

      {locationsArea.map((loc, index) => (
        <CardLocation
          key={index}
          lat={loc.latitude}
          long={loc.longitude}
        />
      ))}
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
