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
      productName: products.name,
      areaName: areas.name,
    })
    .from(cultivations)
    .innerJoin(products, eq(cultivations.id_product, products.id))
    .innerJoin(areas, eq(cultivations.id_area, areas.id))
    .innerJoin(harvests, eq(cultivations.id_harvest, harvests.id));
  return result;
}
