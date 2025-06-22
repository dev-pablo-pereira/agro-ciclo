import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { allProduct } from "../../db/Repositories/productRepository";
import { allArea } from "../../db/Repositories/areaRepository";
import useCurrentUser from "../../states/currentUser";
import { getAll } from "../../db/Repositories/harvestRepository";
import CustomButtom from "../../components/buttom";
import {
  editCultivation,
  getCultivation,
} from "../../db/Repositories/cultivationRepository";
import { router, useLocalSearchParams } from "expo-router";

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

type Cultivation = {
  id: number;
  id_area: number;
  id_product: number;
  id_harvest?: number | null;
};

export default function Edit() {
  const { id } = useLocalSearchParams();

  const [cultivationInfo, setCultivationInfo] = useState<Cultivation>();

  const { currentUser } = useCurrentUser();

  const [product, setProduct] = useState<number>(0);
  const [area, setArea] = useState<number>(0);
  const [harvest, setHarvest] = useState<number>(0);

  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [listAreas, setListAreas] = useState<Area[]>([]);
  const [listHarvests, setListHarvests] = useState<Harvest[]>([]);

  useEffect(() => {
    const cultivationInfo = async () => {
      const result = await getCultivation(Number(id));
      setCultivationInfo(result);
    };
    cultivationInfo();
  }, []);

  useEffect(() => {
    if (cultivationInfo) {
      setProduct(cultivationInfo.id_product);
      setArea(cultivationInfo.id_area);
      setHarvest(cultivationInfo.id_harvest ?? 0); // ou use null dependendo da sua lógica
    }
  }, [cultivationInfo]);

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

  const edit = async () => {
    if (cultivationInfo) {
      if (
        product !== cultivationInfo.id_product ||
        area !== cultivationInfo.id_area ||
        harvest !== cultivationInfo.id_harvest
      ) {
        await editCultivation(Number(id), area, product, harvest);
      }

      router.push("/cultivation");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <Picker
          style={styles.select}
          selectedValue={product}
          onValueChange={(itemValue) => setProduct(itemValue)}
        >
          {listProducts.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.id} />
          ))}
        </Picker>

        <Picker
          style={styles.select}
          selectedValue={area}
          onValueChange={(itemValue, itemIndex) => setArea(itemValue)}
        >
          {listAreas.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.id} />
          ))}
        </Picker>

        <Picker
          style={styles.select}
          selectedValue={harvest}
          onValueChange={(itemValue, itemIndex) => setHarvest(itemValue)}
        >
          {listHarvests.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.id} />
          ))}
        </Picker>
      </View>
      <CustomButtom title="teste" onPress={() => edit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  selectContainer: {
    width: "90%",
    marginBottom: 30,
    gap: 20,
  },
  select: {
    backgroundColor: "white",
  },
});
