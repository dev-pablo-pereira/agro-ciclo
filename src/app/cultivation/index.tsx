import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomButtom from "../../components/buttom";
import { router } from "expo-router";
import {
  deleteCultivation,
  getAllCultivations,
} from "../../db/Repositories/cultivationRepository";
import { FlatList } from "react-native";
import { Button, Card, Text } from "@rneui/themed";

type Cultivation = {
  id_cultivation: number;
  id_product: number;
  productName: string;
  areaName: string;
  harvestName?: string;
};

export default function index() {
  const [listCultivations, setListCultivations] = useState<Cultivation[]>([]);

  useEffect(() => {
    const cultivations = async () => {
      const listCultivations = await getAllCultivations();
      console.log(listCultivations);

      setListCultivations(listCultivations);
    };
    cultivations();
  }, []);

  const deleteCul = async (id: number) => {
    await deleteCultivation(id);
    setListCultivations((prev) =>
      prev.filter((item) => item.id_cultivation !== id)
    );
  };
  return (
    <View style={styles.container}>
      <CustomButtom
        title="Novo Cultivo"
        onPress={() => router.push("/cultivation/new")}
      />

      <FlatList
        data={listCultivations}
        renderItem={({ item }) => (
          <Button
            onPress={() => router.push(`/cultivation/${item.id_cultivation}`)}
            type="clear"
          >
            <Card containerStyle={styles.card}>
              <Card.Title style={styles.title}>
                Produto: {item.productName}
              </Card.Title>
              <Text style={styles.text}>Data: {item.harvestName}</Text>
              <Text style={styles.text}>Safra: {item.harvestName}</Text>
              <Text style={styles.text}>Área: {item.areaName}</Text>
              <View style={styles.estimated}>
                <CustomButtom
                  title="Estimativa"
                  icon="calculator"
                  type="antdesign"
                  onPress={() => router.push(`calc/${item.id_cultivation}`)}
                />
              </View>
              <Button onPress={() => deleteCul(item.id_cultivation)}>
                Delete
              </Button>
            </Card>
          </Button>
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
  estimated: {
    width:'100%',
    alignItems: "center",
  }
});
