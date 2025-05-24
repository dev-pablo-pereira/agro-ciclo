import { View, StyleSheet } from "react-native";
import CustomButtom from "../components/buttom";
import CardArea from "../components/cardArea";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";

const AREAS = [
  { id: "1", title: "Área 1", dimension: 60, color: "#CFB8B8" },
  { id: "2", title: "Área 2", dimension: 70, color: "#CFB858" },
  { id: "3", title: "Área 1", dimension: 60, color: "#CFB8B8" },
  { id: "4", title: "Área 2", dimension: 70, color: "#CFB858" },
  { id: "5", title: "Área 1", dimension: 60, color: "#CFB8B8" },
  { id: "6", title: "Área 2", dimension: 70, color: "#CFB858" },
];

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.containerButtom}>
        <CustomButtom title="Nova Área" icon="plus" type="entypo" onPress={ ()=> router.push('/area')} />
      </View>

      <FlatList
        data={AREAS}
        keyExtractor={(item) => item.id}
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
