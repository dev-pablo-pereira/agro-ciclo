import { getProduct } from "../../db/Repositories/productRepository";

export async function PlantPerLinearMeter(id: number) {
  // plantas pro metro linear
  const data = await getProduct(id);
  if (data) {
    let spacing = data.spacing / 100;
    let population = data.population_ha * 1000;
    let result = (population * spacing) / 10000;
    return result;
  }
}

export async function SeedsPerLinearMeter(id: number) {
  // sementes pro metro linear
  const data = await getProduct(id);
  let numberPlants = await PlantPerLinearMeter(id);
  if (data && numberPlants !== undefined) {
    let result = ((numberPlants * 100) / data.germination).toFixed(1);
    return Number(result);
  }
}

export async function LinearMeter(id: number) {
  // metro linear por hectare
  const data = await getProduct(id);
  if (data) {
    let spacing = data.spacing / 100;
    return +(10000 / spacing).toFixed(2);
  }
}

export async function SeedsPerHectare(id: number) {
  const seeds = await SeedsPerLinearMeter(id);
  const linearMeter = await LinearMeter(id);
  if (seeds && linearMeter) {
    return seeds * linearMeter;
  }
}

export async function KgPerHectare(id: number) {
  const data = await getProduct(id);
  const seedsPerHectare = await SeedsPerHectare(id);
  if (data && seedsPerHectare) {
    let pms = data.pms / 1000;

    return +((pms * seedsPerHectare) / 1000).toFixed(1);
  }
}
