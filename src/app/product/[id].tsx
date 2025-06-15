import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomInput from "../../components/input";
import CustomButtom from "../../components/buttom";
import { create, getProduct } from "../../db/Repositories/productRepository";
import { router, useLocalSearchParams } from "expo-router";

type Product = {
  id: number;
  name: string;
  spacing: number;
  germination: number;
  population_ha: number;
};

export default function Index() {
  // ID do product
  const { id } = useLocalSearchParams();

  // atributos product
  const [name, setName] = useState("");
  const [populationHa, setPopulationHa] = useState<number>();
  const [spacing, setSpacing] = useState<number>();
  const [germination, setGermination] = useState<number>();

  const [productInfo, setProductInfo] = useState<Product>();

  //functions
  useEffect(() => {
    const infoProduct = async () => {
      const product = await getProduct(Number(id));
      setProductInfo(product)
      if (product){
        setName(product.name)
        setPopulationHa(product.population_ha)
        setSpacing(product.spacing)
        setGermination(product.germination)
      }
    };
    infoProduct();
  }, [id]);

  return (
    <View style={style.container}>
      <CustomInput
        label="Produto"
        placeholder="Ex: Milho"
        value={name}
        onChangeText={(val) => setName(val)}
      />
      <CustomInput
        label="População por ha"
        placeholder="Ex: 50 mil"
        value={`${populationHa?.toString()} mil`}
        onChangeText={(val) => setPopulationHa(Number(val))}
      />
      <CustomInput
        label="Espaçamento em M"
        placeholder="Ex: 0,80 m"
        value={`${spacing?.toString()} m`}
        onChangeText={(val) => setSpacing(Number(val))}
      />
      <CustomInput
        label="Germinação"
        placeholder="Ex: 85%"
        value={`${germination?.toString()}%`}
        onChangeText={(val) => setGermination(Number(val))}
      />
      <CustomButtom title="Salvar" icon="save" onPress={() => {}} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
});
