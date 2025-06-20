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

export async function getCultivation(id: number) {
  const result = await db.query.cultivations.findFirst({
    where: (cultivations, { eq }) => eq(cultivations.id, id),
  });
  return result;
}

export async function getAllCultivations() {
  const result = await db
    .select({
      id_cultivation: cultivations.id,
      id_product: products.id,
      productName: products.name,
      areaName: areas.name,
    })
    .from(cultivations)
    .innerJoin(products, eq(cultivations.id_product, products.id))
    .innerJoin(areas, eq(cultivations.id_area, areas.id))
    .innerJoin(harvests, eq(cultivations.id_harvest, harvests.id));
  return result;
}

export async function editCultivation(
  id: number,
  id_area: number,
  id_product: number,
  id_harvest?: number
) {
  await db
    .update(cultivations)
    .set({
      id_area: id_area,
      id_product: id_product,
      id_harvest: id_harvest,
    })
    .where(eq(cultivations.id, id));
}

export async function deleteCultivation(id: number) {
  await db.delete(cultivations).where(eq(cultivations.id, id));
}
