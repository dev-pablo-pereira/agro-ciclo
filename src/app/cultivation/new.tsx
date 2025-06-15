import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { allProduct } from "../../db/Repositories/productRepository";
import { allArea } from "../../db/Repositories/areaRepository";
import useCurrentUser from "../../states/currentUser";
import { getAll } from "../../db/Repositories/harvestRepository";
import CustomButtom from "../../components/buttom";

type Product = {
  id: number;
  name: string;
  spacing: number;
  germination: number;
  population_ha: number;
};

type Area = {
  id: number;
  name: string;
  id_user: number;
  color: string | null;
};

type Harvest = {
  id: number;
  name: string;
  season: string;
  start: string;
  end: string;
};

export default function New() {
  const { currentUser } = useCurrentUser();

  const [product, setProduct] = useState<string>();
  const [area, setArea] = useState<string>();
  const [harvest, setHarvest] = useState<string>();

  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [listAreas, setListAreas] = useState<Area[]>([]);
  const [listHarvests, setListHarvests] = useState<Harvest[]>([]);

  useEffect(() => {
    const products = async () => {
      const listProducts = await allProduct();
      setListProducts(listProducts);
    };
    products();
  }, []);

  useEffect(() => {
    const areas = async () => {
      if (currentUser) {
        const listAreas = await allArea(currentUser);
        setListAreas(listAreas);
      }
    };
    areas();
  }, []);

  useEffect(() => {
    const harvests = async () => {
      if (currentUser) {
        const listHarvests = await getAll();
        setListHarvests(listHarvests);
      }
    };
    harvests();
  }, []);

  return (
    <View>
      <Picker
        selectedValue={product}
        onValueChange={(itemValue) => setProduct(itemValue)}
      >
        {listProducts.map((item) => (
          <Picker.Item label={item.name} value={item.name} />
        ))}
      </Picker>

      <Picker
        selectedValue={area}
        onValueChange={(itemValue) => setArea(itemValue)}
      >
        {listAreas.map((item) => (
          <Picker.Item label={item.name} value={item.name} />
        ))}
      </Picker>

      <Picker
        selectedValue={harvest}
        onValueChange={(itemValue) => setHarvest(itemValue)}
      >
        {listHarvests.map((item) => (
          <Picker.Item label={item.name} value={item.name} />
        ))}
      </Picker>
      <CustomButtom title="teste" onPress={() => console.log(`${product} ${area}, ${harvest}`)} />
    </View>
  );
}
