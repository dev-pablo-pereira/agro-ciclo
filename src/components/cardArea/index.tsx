import { Button, Card, Icon, Text } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import ColorArea from "../colorArea";
import DeleteButton from "../buttom/delete";

export interface CardAreaProps {
  title: string;
  dimension: number;
  color: string;
  onDelete: () => void
}

export default function CardArea({ title, dimension, color, onDelete }: CardAreaProps) {
  return (
    <Card containerStyle={styles.container}>
      <Card.Title style={styles.title}>{title}</Card.Title>
      <View style={styles.containerBody}>
        <View>
          <Text style={styles.text}>
            Dimensão:{" "}
            {new Intl.NumberFormat("pt-BR", {
              maximumFractionDigits: 2,
            }).format(dimension)}{" "}
            m²
          </Text>
          <View style={styles.row}>
            <Text style={styles.text}>Cor da Área</Text>
            <View style={styles.colorWrapper}>
              <ColorArea color={color} />
            </View>
          </View>
        </View>
        <View>
          <DeleteButton onPress={onDelete}/>
          <Button type="clear">
            <Icon name="pencil" type="evilicon" />
          </Button>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderRadius: 5,
    backgroundColor: "#8D6E63",
    marginLeft: "15%",
  },
  containerBody: {
    flexDirection: "row",
  },
  title: {
    fontSize: 25,
    color: "white",
    marginBottom: 6,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  colorWrapper: {
    marginLeft: 5,
  },
});
