import React from "react";
import { View } from "react-native";
import CustomInput from "../../components/input";
import CustomButtom from "../../components/buttom";

export default function New() {
  return (
    <View>
      <CustomInput label="Nome" onChangeText={() => {}} />
      <CustomInput label="Estação" onChangeText={() => {}} />
      <CustomInput label="Inicio" onChangeText={() => {}} />
      <CustomInput label="Fim" onChangeText={() => {}} />
      <CustomButtom title="Salvar" icon="save" onPress={() => {}} />
    </View>
  );
}
