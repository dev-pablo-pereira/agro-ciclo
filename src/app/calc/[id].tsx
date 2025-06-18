import { Card, Text, Button, Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { KgPerHectare } from "../../hooks/SupplyCalculations/plantasMetrosLinear";
import { getProduct } from "../../db/Repositories/productRepository";
import { getCultivation } from "../../db/Repositories/cultivationRepository";
import { getArea } from "../../db/Repositories/areaRepository";
import { getAllCoordinate } from "../../db/Repositories/coordinateRepository";

import * as turf from "@turf/turf";

type Product = {
  id: number;
  name: string;
  spacing: number;
  germination: number;
  population_ha: number;
  pms: number;
};

type Cultivation = {
  id: number;
  id_area: number;
  id_product: number;
  id_harvest: number | null;
};

type Area = {
  id: number;
  name: string;
  id_user: number;
  color: string | null;
};

export default function index() {
  const { id } = useLocalSearchParams();

  const [calcSeeds, setCalcSeeds] = useState<number>(0);
  const [infoProduct, setInfoProduct] = useState<Product>();
  const [infoCultivation, setInfoCultivation] = useState<Cultivation>();
  const [infoArea, setInfoArea] = useState<Area>();
  const [areaDimension, setAreaDimension] = useState<number>(0);

  useEffect(() => {
    const infoCultivation = async (id: number) => {
      const result = await getCultivation(id);
      if (result) {
        setInfoCultivation(result);
        getInfoArea(result.id_area);
        getInfoProduct(result.id_product);
        calc(result.id_product);
      }
    };
    infoCultivation(Number(id));
  }, [id]);

  const getInfoProduct = async (id: number) => {
    const result = await getProduct(id);
    setInfoProduct(result);
  };

  const getInfoArea = async (id: number) => {
    const result = await getArea(id);
    setInfoArea(result);

    const coords = await getAllCoordinate(id);
    if (coords.length >= 3) {
      const turfPoints = coords.map((coord) => [
        coord.longitude,
        coord.latitude,
      ]);
      turfPoints.push(turfPoints[0]); // fecha o polígono
      const polygon = turf.polygon([turfPoints]);
      const areaM2 = turf.area(polygon);
      setAreaDimension(areaM2);
    }
  };

  const calc = async (id: number) => {
    const result = await KgPerHectare(id);
    if (result) {
      setCalcSeeds(result);
    }
  };

  return (
    <View>
      <Button onPress={() => console.log(id)}>test</Button>
      <Card>
        <Card.Title>{infoProduct?.name}</Card.Title>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 8 }}
        >
          <Text>
            Dimensão:{" "}
            {new Intl.NumberFormat("pt-BR", {
              maximumFractionDigits: 2,
            }).format(areaDimension)}{" "}
            m²
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 8 }}
        >
          <Icon
            name="seedling"
            type="font-awesome-5"
            size={20}
            style={{ marginRight: 8 }}
          />
          <Text>
            Sementes:{" "}
            {new Intl.NumberFormat("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(calcSeeds)}{" "}
            kg/ha
          </Text>
        </View>
      </Card>
    </View>
  );
}
