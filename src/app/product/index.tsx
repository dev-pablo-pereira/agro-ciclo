import { Button, Card, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import CustomButtom from "../../components/buttom";
import { router } from "expo-router";
import { allProduct } from "../../db/Repositories/productRepository";
import { FlatList } from "react-native";

type Product = {
  id: number;
  name: string;
  spacing: number;
  germination: number;
  population_ha: number;
};

export default function index() {
  //sets
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts = async () => {
      const products = await allProduct();
      setProducts(products);
    };
    allProducts();
  });

  return (
    <View>
      <CustomButtom title="Novo" onPress={() => router.push("product/new")} />
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Card>
            <>
              <Card.Title>{item.name}</Card.Title>
              <Text>População ha: {item.population_ha} mil</Text>
              <Text>Espaçamento: {item.spacing} m</Text>
              <Text>Germinação: {item.germination}%</Text>
            </>
            <>
              <Button type="solid">Delete</Button>
            </>
          </Card>
        )}
      />
    </View>
  );
}
