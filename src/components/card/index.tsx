import { Card } from "@rneui/base";
import React from "react";
import { StyleSheet, View } from "react-native";
import TextBody from "../text";

interface Props {
  title: string;
  bodyTexts: string[];
  children?: React.ReactNode;
}

export default function CardInfo({ title, bodyTexts, children }: Props) {
  return (
    <Card containerStyle={styles.card}>
      <View>
        <Card.Title style={styles.title}>{title}</Card.Title>
        {bodyTexts.map((text) => (
            <TextBody text={text} />
        ))}
      </View>
      <View style={styles.options}>
        {children}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#8D6E63",
    width: "90%",
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
  options: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
});
