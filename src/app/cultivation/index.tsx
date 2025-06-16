import React, { useEffect, useState } from "react";
import { View } from "react-native";
import CustomButtom from "../../components/buttom";
import { router } from "expo-router";
import { getAllCultivations } from "../../db/Repositories/cultivationRepository";
import { FlatList } from "react-native";
import { Button, Card, Text } from "@rneui/themed";

type Cultivation = {
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

  return (
    <View>
      <Button onPress={() => console.log(listCultivations)}>teste</Button>
      <CustomButtom
        title="Novo"
        onPress={() => router.push("/cultivation/new")}
      />

      <FlatList
        data={listCultivations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Title>{item.productName}</Card.Title>
            <Text>{item.areaName}</Text>
             <Text>{item.harvestName}</Text>
            <CustomButtom
              title="Estimativa"
              icon="calculator"
              type="antdesign"
              onPress={() => {}}
            />
          </Card>
        )}
      />
    </View>
  );
}
