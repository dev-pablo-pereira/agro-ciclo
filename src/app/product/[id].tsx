import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/input";
import CustomButtom from "../../components/buttom";
import {
  editProduct,
  getProduct,
} from "../../db/Repositories/productRepository";
import { router, useLocalSearchParams } from "expo-router";

type Product = {
  id: number;
  name: string;
  spacing: number;
  germination: number;
  pms: number;
  population_ha: number;
};

export default function Index() {
  // ID do product
  const { id } = useLocalSearchParams();

  // atributos product
  const [name, setName] = useState("");
  const [populationHa, setPopulationHa] = useState<number>(0);
  const [spacing, setSpacing] = useState<number>(0);
  const [germination, setGermination] = useState<number>(0);
  const [pms, setPms] = useState<number>(0);

  const [productInfo, setProductInfo] = useState<Product>();

  //functions
  useEffect(() => {
    const infoProduct = async () => {
      const product = await getProduct(Number(id));
      setProductInfo(product);
      if (product) {
        setName(product.name);
        setPopulationHa(product.population_ha);
        setSpacing(product.spacing);
        setGermination(product.germination);
        setPms(product.pms);
      }
    };
    infoProduct();
  }, [id]);

  // verifica se ouve mudanças

  const update = async () => {
    if (productInfo) {
      if (
        productInfo.name !== name ||
        productInfo.population_ha !== populationHa ||
        productInfo.spacing !== spacing ||
        productInfo.germination !== germination ||
        productInfo.pms !== pms
      ) {
        await editProduct(Number(id), name, spacing, germination, populationHa);
        router.push("product");
      }
    }
  };

  return (
    <View style={style.container}>
      <ScrollView
        style={style.scrollView}
        contentContainerStyle={style.scrollContent}
      >
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
        <CustomInput
          label="PMS (Peso de mil Sementes"
          placeholder="Ex: 90g%"
          value={`${germination?.toString()}%`}
          onChangeText={(val) => setGermination(Number(val))}
        />
      </ScrollView>
      <CustomButtom title="Salvar" icon="save" onPress={() => update()} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  scrollView: {
    height: "80%",
    width: "100%",
    marginBottom: 20,
  },
  scrollContent: {
    alignItems: "center",
  },
});
