import { Text } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {
  text: string;
}

export default function TextBody({ text }: Props) {
  return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white'
  },
});
