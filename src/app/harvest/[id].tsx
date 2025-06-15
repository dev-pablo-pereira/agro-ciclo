import React, { useEffect, useState } from "react";
import { View, Pressable, TextInput, Platform } from "react-native";
import CustomInput from "../../components/input";
import CustomButtom from "../../components/buttom";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  getHarvest,
  newHarvest,
} from "../../db/Repositories/harvestRepository";
import { router, useLocalSearchParams } from "expo-router";

type Harvest = {
  id: number;
  name: string;
  season: string;
  start: string;
  end: string;
};

export default function New() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [season, setSeason] = useState("");
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);

  const [startInfo, setStartInfo] = useState("");
  const [endInfo, setEndInfo] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<"start" | "end" | null>(
    null
  );

  const [harvestInfo, setHarvestInfo] = useState<Harvest>();

  useEffect(() => {
    const infoProduct = async () => {
      const harvest = await getHarvest(Number(id));
      setHarvestInfo(harvest);
      if (harvest) {
        setName(harvest.name);
        setSeason(harvest.season);
        setStartInfo(harvest.start);
        setEndInfo(harvest.end);
      }
    };
    infoProduct();
  }, [id]);

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
      router.push("/harvest");
    } else {
      alert("Todos os campos devem estar preenchidos");
    }
  };

  return (
    <View>
      <CustomInput label="Nome" value={name} onChangeText={setName} />
      <CustomInput label="Estação" value={season} onChangeText={setSeason} />

      <Pressable onPress={() => toggleDatePicker("start")}>
        <TextInput
          editable={false}
          placeholder="Data de Início"
          value={
            start
              ? start.toLocaleDateString("pt-BR")
              : startInfo
              ? new Date(startInfo).toLocaleDateString("pt-BR")
              : ""
          }
        />
      </Pressable>

      <Pressable onPress={() => toggleDatePicker("end")}>
        <TextInput
          editable={false}
          placeholder="Data de Fim"
          value={
            end
              ? end.toLocaleDateString("pt-BR")
              : endInfo
              ? new Date(endInfo).toLocaleDateString("pt-BR")
              : ""
          }
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
