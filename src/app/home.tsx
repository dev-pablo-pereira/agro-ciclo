import { View, StyleSheet } from "react-native";
import CustomButtom from "../components/buttom";
import CardArea from "../components/cardArea";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";

import useCurrentUser from "../states/currentUser";
import { allArea, deleteArea } from "../db/Repositories/areaRepository";
import { Button, Text } from "@rneui/themed";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const { currentUser } = useCurrentUser();
  const [userAreas, setUserAreas] = useState<any[]>([]);

  const listAreas = async () => {
    if (currentUser !== null) {
      const listAreas = await allArea(currentUser);

      setUserAreas(listAreas);
    }
  };

  const deleteUserArea = async (idArea: number) => {
    await deleteArea(idArea);
    setUserAreas(prev => prev.filter(area => area.id !== idArea))
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
      </View>
      {userAreas === null ? (
        <Text>Nenhuma área</Text>
      ) : (
        <FlatList
          data={userAreas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Button
                title={"delete"}
                onPress={async () => await deleteUserArea(item.id)}
              />
              <CardArea
                title={item.name}
                dimension={0}
                color={item.color === "" ? "#F5F5F5" : item.color}
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
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
  },
});
