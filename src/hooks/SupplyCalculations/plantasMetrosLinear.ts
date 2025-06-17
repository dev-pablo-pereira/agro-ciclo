import { getProduct } from "../../db/Repositories/productRepository";

export async function PlantPerLinearMeter(id: number) {
  const data = await getProduct(id);
  if (data) {
    return (data.population_ha * data.spacing) / 10000; // valor do hectare em m2
  }
}

export async function SeedsPerLinearMeter(id: number) {
  const data = await getProduct(id);
  let numberPlants = await PlantPerLinearMeter(id);
  if (data && numberPlants !== undefined) {
    return (numberPlants * 100) / data.germination;
  }
}
