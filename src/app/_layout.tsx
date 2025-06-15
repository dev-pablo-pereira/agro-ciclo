import { Icon } from "@rneui/themed";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { useLocalMigrations } from "../hooks/useLocalMigrations";

export default function Layout() {
  useLocalMigrations();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="newUser" options={{title: "Novo Usuário"}}/>
      <Stack.Screen
        name="home"
        options={{
          title: "Home",
          headerStyle: styles.headerStyle,
          headerRight: () => <Icon name="menu" type="feather" />,
        }}
      />
      <Stack.Screen
        name="area"
        options={{
          title: "Área",
          headerStyle: styles.headerStyle,
          headerRight: () => <Icon name="menu" type="feather" />,
        }}
      />
      <Stack.Screen
        name="editArea/[id]"
        options={{
          title: "Edição da Área",
          headerStyle: styles.headerStyle,
          headerRight: () => <Icon name="menu" type="feather" />,
        }}
      />
      <Stack.Screen
        name="product/new"
        options={{
          title: "Novo Produto",
          headerStyle: styles.headerStyle,
          headerRight: () => <Icon name="menu" type="feather" />,
        }}
      />
      <Stack.Screen
        name="harvest"
        options={{
          title: "Safras",
          headerStyle: styles.headerStyle,
          headerRight: () => <Icon name="menu" type="feather" />,
        }}
      />
      <Stack.Screen
        name="harvest/new"
        options={{
          title: "Nova Safra",
          headerStyle: styles.headerStyle,
          headerRight: () => <Icon name="menu" type="feather" />,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#8D6E63",
  },
});
