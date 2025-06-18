import { getProduct } from "../../db/Repositories/productRepository";

export async function PlantPerLinearMeter(id: number) {
  const data = await getProduct(id);
  if (data) {
    return ((data.population_ha * 1000) * data.spacing) / 10000; // valor do hectare em m2
  }
}

export async function SeedsPerLinearMeter(id: number) {
  const data = await getProduct(id);
  let numberPlants = await PlantPerLinearMeter(id);
  if (data && numberPlants !== undefined) {
    return (numberPlants * 100) / data.germination;
  }
}

export async function LinearMeter(id:number) {
  const data = await getProduct(id)
  if (data) {
    return +(10000 / (data.spacing / 100)).toFixed(2);
  }
}

export async function SeedsPerHectare(id:number) {
  const seeds = await SeedsPerLinearMeter(id)
  const linearMeter = await LinearMeter(id)
  if (seeds && linearMeter){
    return seeds * linearMeter
  }
}

export async function KgPerHectare(id:number) {
  const data = await getProduct(id)
  const seeds = await SeedsPerHectare(id)
  if (data && seeds) {
    return Math.round(+(data.pms * seeds / 1000).toFixed(2))
  }
}