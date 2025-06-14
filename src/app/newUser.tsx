import { View, StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import CustomInput from "../components/input";
import CustomButtom from "../components/buttom";
import { Button, Text } from "@rneui/themed";
import { useState } from "react";

import { createUser } from "../db/Repositories/userRepository";
import useCurrentUser from "../states/currentUser";

export default function App() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const { addCurrentUser } = useCurrentUser();

  const validaUser = async () => {
    if (name === "" || password === "") {
      setShowError(true);
    } else {
      const user = await createUser(name, password);
      console.log(user);
    addCurrentUser(user.id)
      router.push("/home");
    }
  };

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

      {showError && (
        <Text style={styles.errorText}>
          Todos os campos devem ser preenchidos
        </Text>
      )}
      <CustomButtom title="Salvar" icon="save" onPress={() => validaUser()} />
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
  errorText: {
    color: "red",
  },
});
