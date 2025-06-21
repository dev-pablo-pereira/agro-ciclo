import { View, StyleSheet } from "react-native";
import CustomButtom from "../components/buttom";
import CardArea from "../components/cardArea";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";

import useCurrentUser from "../states/currentUser";
import { allArea, deleteArea } from "../db/Repositories/areaRepository";
import { Button, Text } from "@rneui/themed";
import { useEffect, useState } from "react";

// dimensions
import * as turf from "@turf/turf";
import { getAllCoordinate } from "../db/Repositories/coordinateRepository";
import Small from "../components/buttom/small";

export default function Home() {
  const router = useRouter();

  const { currentUser } = useCurrentUser();
  const [userAreas, setUserAreas] = useState<any[]>([]);

  const listAreas = async () => {
    if (currentUser !== null) {
      const listAreas = await allArea(currentUser);

      const areasWithDimensions = await Promise.all(
        listAreas.map(async (area) => {
          const coords = await getAllCoordinate(area.id);
          if (coords.length < 3) return { ...area, dimension: 0 }; // precisa de no mínimo 3

          const turfPoints = coords.map((coord) => [
            coord.longitude,
            coord.latitude,
          ]);
          turfPoints.push(turfPoints[0]); // fecha o polígono

          const polygon = turf.polygon([turfPoints]);
          const areaM2 = turf.area(polygon);

          return { ...area, dimension: areaM2 };
        })
      );

      setUserAreas(areasWithDimensions);
    }
  };

  const deleteUserArea = async (idArea: number) => {
    await deleteArea(idArea);
    setUserAreas((prev) => prev.filter((area) => area.id !== idArea));
  };

  useEffect(() => {
    listAreas();
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <View style={styles.containerButtom}>
        <CustomButtom
          title="Nova Área"
          icon="plus"
          type="entypo"
          onPress={() => router.push("/area")}
        />
        <View style={styles.lineButton}>
          <Small title="Produtos" onPress={() => router.push("product")} />
          <Small title="Cultivos" onPress={() => router.push("cultivation")} />
        </View>
      </View>
      {userAreas === null ? (
        <Text>Nenhuma área</Text>
      ) : (
        <FlatList
          data={userAreas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <CardArea
                title={item.name}
                dimension={item.dimension}
                color={item.color === "" ? "#F5F5F5" : item.color}
                onDelete={() => deleteUserArea(item.id)}
              />
            </View>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#F5F5F5",
    paddingBottom: 30,
  },
  containerButtom: {
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
  },
  lineButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
});
