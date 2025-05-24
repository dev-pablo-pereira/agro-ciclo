import { View, StyleSheet } from "react-native";
import CustomButtom from "../components/buttom";
import CardArea from "../components/cardArea";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";

import { areas } from "../mocks/Areas";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.containerButtom}>
        <CustomButtom title="Nova Área" icon="plus" type="entypo" onPress={ ()=> router.push('/area')} />
      </View>

      <FlatList
        data={areas}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <CardArea
            title={item.title}
            dimension={item.dimension}
            color={item.color}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#F5F5F5",
    paddingBottom: 30,
  },
  containerButtom: {
    alignItems: "center",
    width: "100%",
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
  },
});
