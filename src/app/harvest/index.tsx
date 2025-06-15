import React, { useEffect, useState } from "react";
import { View } from "react-native";
import CustomButtom from "../../components/buttom";
import { router } from "expo-router";
import { deleteHavest, getAll } from "../../db/Repositories/harvestRepository";
import { Button, Card, Text } from "@rneui/themed";
import { FlatList } from "react-native";

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
    <View>
      <CustomButtom
        title="Nova Safra"
        icon="save"
        onPress={() => router.push("/harvest/new")}
      />
      <FlatList
        data={harvests}
        renderItem={({ item }) => (
          <Button>
            <Card>
              <Card.Title>{item.name}</Card.Title>
              <Text>{item.season}</Text>
              <Text>{item.start}</Text>
              <Text>{item.end}</Text>
              <Button onPress={() => deleteItem(item.id)}>Delete</Button>
            </Card>
          </Button>
        )}
      />
    </View>
  );
}
