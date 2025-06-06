import { View, StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import CustomInput from "../components/input";
import CustomButtom from "../components/buttom";
import { Button } from "@rneui/base";

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <CustomInput placeholder="Pablito" label="Nome" onChangeText={()=>{}}/>
      <CustomInput
        label="Senha"
        iconType="MaterialIcons"
        iconName="visibility"
        secureText
        onChangeText={()=>{}}
      />

      <Button title={"Não cadastrado"} onPress={() => router.push("/newUser")} />
      <CustomButtom
        title="Entrar"
        icon="save"
        onPress={() => router.push("/home")}
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
