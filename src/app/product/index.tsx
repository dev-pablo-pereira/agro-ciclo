import { Button, Card, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import CustomButtom from "../../components/buttom";
import { router } from "expo-router";
import {
  allProduct,
  deleteProduct as deleteProductDb,
} from "../../db/Repositories/productRepository";
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

  // functions
  const deleteProduct = async (idProduct: number) => {
    await deleteProductDb(idProduct);
    setProducts((prev) => prev.filter((item) => item.id !== idProduct));
  };

  useEffect(() => {
    const allProducts = async () => {
      const products = await allProduct();
      setProducts(products);
    };
    allProducts();
  }, []);

  return (
    <View>
      <CustomButtom title="Novo" onPress={() => router.push("product/new")} />
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Button type="clear" onPress={() => router.push(`product/${item.id}`)}>
            <Card>
              <>
                <Card.Title>{item.name}</Card.Title>
                <Text>População ha: {item.population_ha} mil</Text>
                <Text>Espaçamento: {item.spacing} m</Text>
                <Text>Germinação: {item.germination}%</Text>
              </>
              <>
                <Button type="solid" onPress={() => deleteProduct(item.id)}>
                  Delete
                </Button>
              </>
            </Card>
          </Button>
        )}
      />
    </View>
  );
}
