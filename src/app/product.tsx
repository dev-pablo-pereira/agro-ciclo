import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomInput from "../components/input";
import CustomButtom from "../components/buttom";
import { create } from "../db/Repositories/productRepository";

export default function Product() {
  // atributos product
  const [name, setName] = useState("");
  const [populationHa, setPopulationHa] = useState<number>();
  const [spacing, setSpacing] = useState<number>();
  const [germination, setGermination] = useState<number>();

  //functions
  const createProduct = () => {
    if (
      name !== "" &&
      populationHa !== undefined &&
      spacing !== undefined &&
      germination !== undefined
    ) {
      create(name, populationHa, spacing, germination);
    }
  };

  return (
    <View style={style.container}>
      <CustomInput
        label="Produto"
        placeholder="Ex: Milho"
        onChangeText={(val) => setName(val)}
      />
      <CustomInput
        label="População por ha"
        placeholder="Ex: 50 mil"
        onChangeText={(val) => setPopulationHa(Number(val))}
      />
      <CustomInput
        label="Espaçamento em M"
        placeholder="Ex: 0,80 m"
        onChangeText={(val) => setSpacing(Number(val))}
      />
      <CustomInput
        label="Germinação"
        placeholder="Ex: 85%"
        onChangeText={(val) => setGermination(Number(val))}
      />
      <CustomButtom
        title="Salvar"
        icon="save"
        onPress={() => createProduct()}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
});
