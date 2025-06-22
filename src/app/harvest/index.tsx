import React, { useEffect, useState } from "react";
import { View } from "react-native";
import CustomButtom from "../../components/buttom";
import { router } from "expo-router";
import { deleteHavest, getAll } from "../../db/Repositories/harvestRepository";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import DeleteButton from "../../components/buttom/delete";
import EditButton from "../../components/buttom/edit";
import CardInfo from "../../components/card";

type Harvest = {
  id: number;
  name: string;
  season: string;
  start: string;
  end: string;
};

export default function index() {
  const [harvests, setHarvests] = useState<Harvest[]>([]);

  useEffect(() => {
    const allHarvests = async () => {
      const products = await getAll();
      setHarvests(products);
    };
    allHarvests();
  }, []);

  const deleteItem = async (id: number) => {
    await deleteHavest(id);
    setHarvests((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <CustomButtom
        title="Nova Safra"
        icon="save"
        onPress={() => router.push("/harvest/new")}
      />
      <FlatList
        style={styles.list}
        data={harvests}
        renderItem={({ item }) => (
          <CardInfo
            title={item.name}
            bodyTexts={[
              `Estação: ${item.season}`,
              `Inicio: ${item.start}`,
              `Fim: ${item.end}`,
            ]}
          >
            <DeleteButton onPress={() => deleteItem(item.id)} />
            <EditButton onPress={() => router.push(`/harvest/${item.id}`)} />
          </CardInfo>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  list: {
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#8D6E63",
    width: "90%",
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
    color: "white",
    marginBottom: 6,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
  },
  options: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
});
