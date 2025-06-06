import { Icon } from "@rneui/themed";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          title: "Home",
          headerStyle: styles.headerStyle,
          headerRight: () => <Icon name="menu" type="feather" />,
        }}
      />
      <Stack.Screen name="area" options={{
        title: "Área",
        headerStyle: styles.headerStyle,
        headerRight: () => <Icon name="menu" type="feather" />,
      }}/>
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#8D6E63",
  },
});
