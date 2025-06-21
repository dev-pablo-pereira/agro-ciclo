import { View, StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import CustomInput from "../components/input";
import CustomButtom from "../components/buttom";
import { Button } from "@rneui/base";
import { getUserByName } from "../db/Repositories/userRepository";
import { useState } from "react";
import { Text } from "@rneui/themed";
import useCurrentUser from "../states/currentUser";

export default function App() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const { addCurrentUser } = useCurrentUser();

  const userPresent = async () => {
    try {
      const userFound = await getUserByName(user);
      if (userFound !== undefined) {
        verifyCredentials(userFound.password, userFound.id);
      } else {
        setUserNotFound(true);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const verifyCredentials = (senha: string, idUser: number) => {
    if (senha === password) {
      addCurrentUser(idUser)
      router.push("/home");
    } else {
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Pablito"
        label="Nome"
        onChangeText={(val) => setUser(val)}
      />
      {userNotFound && (
        <Text style={styles.errorText}>Usuario não encontrado</Text>
      )}
      <CustomInput
        label="Senha"
        iconType="MaterialIcons"
        iconName="visibility"
        secureText
        onChangeText={(val) => setPassword(val)}
      />

      <Button type="clear"
        title={"Não cadastrado"}
        onPress={() => router.push("/newUser")}
      />
      {showError && (
        <Text style={styles.errorText}>Credenciais incorretas</Text>
      )}
      <CustomButtom title="Entrar" icon="save" onPress={() => userPresent()} />
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
