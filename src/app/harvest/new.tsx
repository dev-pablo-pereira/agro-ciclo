import React, { useState } from "react";
import { View, Pressable, TextInput, Platform, StyleSheet } from "react-native";
import CustomInput from "../../components/input";
import CustomButtom from "../../components/buttom";
import DateTimePicker from "@react-native-community/datetimepicker";
import { newHarvest } from "../../db/Repositories/harvestRepository";
import { router } from "expo-router";

export default function New() {
  const [name, setName] = useState("");
  const [season, setSeason] = useState("");
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);

  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<"start" | "end" | null>(
    null
  );

  const toggleDatePicker = (field: "start" | "end") => {
    setCurrentPicker(field);
    setShowPicker(true);
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowPicker(false);

    if (selectedDate) {
      if (currentPicker === "start") {
        setStart(selectedDate);
      } else if (currentPicker === "end") {
        setEnd(selectedDate);
      }
    }
  };

  const converteDataParaStringISO = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const createHarvest = async () => {
    if (name !== "" && season !== "" && start && end) {
      if (start > end) {
        alert("A data de início deve ser anterior ou igual à data de fim.");
        return;
      }
      const startStr = converteDataParaStringISO(start);
      const endStr = converteDataParaStringISO(end);

      await newHarvest(name, season, startStr, endStr);
      router.replace("/harvest");
    } else {
      alert("Todos os campos devem estar preenchidos");
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput label="Nome" onChangeText={setName} placeholder="Ex: Safrinha"/>
      <CustomInput label="Estação" onChangeText={setSeason} placeholder="Ex: Primavera"/>

      <Pressable onPress={() => toggleDatePicker("start")} style={styles.dateWrapper}>
        <TextInput
          style={styles.date}
          placeholderTextColor={'white'}
          editable={false}
          placeholder="Data de Início"
          value={start ? start.toLocaleDateString("pt-BR") : ""}
        />
      </Pressable>

      <Pressable onPress={() => toggleDatePicker("end")} style={styles.dateWrapper}>
        <TextInput
          style={styles.date}
          placeholderTextColor={'white'}
          editable={false}
          placeholder="Data de Fim"
          value={end ? end.toLocaleDateString("pt-BR") : ""}
        />
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={
            currentPicker === "start" ? start || new Date() : end || new Date()
          }
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <CustomButtom
        title="Salvar"
        icon="save"
        onPress={() => createHarvest()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  dateWrapper: {
    width: "100%",
    alignItems: "center",
  },
  date: {
    backgroundColor: "#8D6E63",
    marginBottom: 30,
    borderRadius: 5,
    width: "75%",
    height: 50,
    paddingLeft: 10
  },
});
