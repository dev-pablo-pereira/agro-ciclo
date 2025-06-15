import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function New() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>();

  const pickerRef = useRef<Picker<string> | null>(null);

  const open = () => {
    pickerRef.current?.focus();
  };

  const close = () => {
    pickerRef.current?.blur();
  };
  return (
    <View>
      <Picker
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <Picker
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <Picker
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
}
