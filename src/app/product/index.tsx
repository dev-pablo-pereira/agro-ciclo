import { Button, Card, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import CustomButtom from "../../components/buttom";
import { router } from "expo-router";

export default function index() {
  return (
    <View>
      <CustomButtom title="Novo" onPress={() => router.push("product/new")} />
      <Card>
        <>
          <Card.Title>Nome Produto</Card.Title>
          <Text>População: valor</Text>
          <Text>Espaçamento: valor</Text>
          <Text>Germinação: valor</Text>
        </>
        <>
          <Button type="solid">Delete</Button>
        </>
      </Card>
    </View>
  );
}
