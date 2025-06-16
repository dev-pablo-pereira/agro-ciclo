import { eq } from "drizzle-orm";
import { db } from "../db";
import { areas, cultivations, harvests, products } from "../schema";

export async function newCultivation(
  idArea: number,
  idProduct: number,
  idHarvest?: number
) {
  await db
    .insert(cultivations)
    .values({ id_area: idArea, id_product: idProduct, id_harvest: idHarvest });
}

export async function getAllCultivations() {
  const result = await db
    .select({
      id_cultivation: cultivations.id,
      productName: products.name,
      areaName: areas.name,
    })
    .from(cultivations)
    .innerJoin(products, eq(cultivations.id_product, products.id))
    .innerJoin(areas, eq(cultivations.id_area, areas.id))
    .innerJoin(harvests, eq(cultivations.id_harvest, harvests.id));
  return result;
}

export async function deleteCultivation(id:number) {
  await db.delete(cultivations).where( eq(cultivations.id, id))
}