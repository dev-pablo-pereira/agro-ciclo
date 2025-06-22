import { Card } from "@rneui/themed";
import React from "react";
import TextBody from "../text";
import { StyleSheet, View } from "react-native";
import CustomButtom from "../buttom";
import { router } from "expo-router";

interface Props {
  title: string;
  bodyTexts: string[];
  idCultivation: number;
  children?: React.ReactNode;
}

export default function CardCultivation({
  title,
  bodyTexts,
  idCultivation,
  children,
}: Props) {
  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{`Produto: ${title}`}</Card.Title>
      {bodyTexts.map((text, index) => (
        <TextBody text={text} />
      ))}
      <View style={styles.estimated}>
        <CustomButtom
          title="Estimativa"
          icon="calculator"
          type="antdesign"
          onPress={() => router.push(`calc/${idCultivation}`)}
        />
      </View>
      <View style={styles.options}>{children}</View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#8D6E63",
    width: "100%",
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
    color: "white",
    marginBottom: 6,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
  },
  estimated: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  options: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
});
