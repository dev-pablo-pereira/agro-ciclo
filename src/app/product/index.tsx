import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomButtom from "../../components/buttom";
import { router } from "expo-router";
import {
  allProduct,
  deleteProduct as deleteProductDb,
} from "../../db/Repositories/productRepository";
import { FlatList } from "react-native";
import DeleteButton from "../../components/buttom/delete";
import EditButton from "../../components/buttom/edit";
import TextBody from "../../components/text";
import CardInfo from "../../components/card";

type Product = {
  id: number;
  name: string;
  spacing: number;
  germination: number;
  pms: number;
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
    <View style={styles.container}>
      <CustomButtom title="Novo" onPress={() => router.push("product/new")} />
      <FlatList
        style={styles.list}
        data={products}
        renderItem={({ item }) => (
          <CardInfo
            title={item.name}
            bodyTexts={[
              `População ha: ${item.population_ha} mil`,
              `Espaçamento: ${item.spacing} m`,
              `Germinação: ${item.germination}%`,
              `PMS: ${item.pms}%`,
            ]}
          >
            <DeleteButton onPress={() => deleteProduct(item.id)} />
            <EditButton onPress={() => router.push(`/product/${item.id}`)} />
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
