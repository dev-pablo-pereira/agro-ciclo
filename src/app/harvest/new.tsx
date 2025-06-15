import React, { useState } from "react";
import { View, Pressable, TextInput, Platform } from "react-native";
import CustomInput from "../../components/input";
import CustomButtom from "../../components/buttom";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function New() {
  const [name, setName] = useState("");
  const [season, setSeason] = useState("");
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);

  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<"start" | "end" | null>(null);

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

  return (
    <View>
      <CustomInput label="Nome" onChangeText={setName} />
      <CustomInput label="Estação" onChangeText={setSeason} />

      <Pressable onPress={() => toggleDatePicker("start")}>
        <TextInput
          editable={false}
          placeholder="Data de Início"
          value={start ? start.toLocaleDateString("pt-BR") : ""}
        />
      </Pressable>

      <Pressable onPress={() => toggleDatePicker("end")}>
        <TextInput
          editable={false}
          placeholder="Data de Fim"
          value={end ? end.toLocaleDateString("pt-BR") : ""}
        />
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={
            currentPicker === "start"
              ? start || new Date()
              : end || new Date()
          }
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <CustomButtom title="Salvar" icon="save" onPress={() => {}} />
    </View>
  );
}
