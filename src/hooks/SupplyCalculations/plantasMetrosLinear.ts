import { getProduct } from "../../db/Repositories/productRepository";

export async function PlantPerLinearMeter(id:number) {
    const data =  await getProduct(id)
    if (data) {
        return data.population_ha * data.spacing / 10000 // valor do hectare em m2
    }
}