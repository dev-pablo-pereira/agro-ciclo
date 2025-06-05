import { View, StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import CustomInput from "../components/input";
import CustomButtom from "../components/buttom";
import { Button, Text } from "@rneui/themed";
import { useState } from "react";

import { createUser } from "../db/Repositories/userRepository";

export default function App() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text h2>Novo Usuario</Text>
      <CustomInput
        placeholder="Pablito"
        label="Name"
        onChangeText={(val) => setName(val)}
      />
      <CustomInput
        label="Senha"
        iconType="MaterialIcons"
        iconName="visibility"
        secureText
        onChangeText={(val) => setPassword(val)}
      />
      <CustomButtom
        title="Salvar"
        icon="save"
        onPress={() => createUser(name, password)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
});
