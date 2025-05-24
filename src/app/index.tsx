import { View, StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import CustomInput from "../components/input";
import CustomButtom from "../components/buttom";

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <CustomInput placeholder="Pablito" label="Nome" />
      <CustomInput
        label="Senha"
        iconType="MaterialIcons"
        iconName="visibility"
        secureText
      />
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
