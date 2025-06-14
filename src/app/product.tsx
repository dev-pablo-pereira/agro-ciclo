import React from "react";
import { View, StyleSheet } from "react-native";
import CustomInput from "../components/input";
import CustomButtom from "../components/buttom";

export default function Product() {
  return (
    <View style={style.container}>
      <CustomInput
        label="Produto"
        placeholder="Ex: Milho"
        onChangeText={() => {}}
      />
      <CustomInput
        label="População por hectare"
        placeholder="Ex: 50 mil"
        onChangeText={() => {}}
      />
      <CustomInput
        label="Espaçamento em M"
        placeholder="Ex: 0,80 m"
        onChangeText={() => {}}
      />
      <CustomInput
        label="Germinação"
        placeholder="Ex: 85%"
        onChangeText={() => {}}
      />
      <CustomButtom
        title="Salvar"
        icon="save"
        onPress={() => console.log("produto")}
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
