import { db } from "../db";
import { products } from "../schema";

export async function create(
  name: string,
  spacing: number,
  germination: number,
  population_ha: number
) {
  await db
    .insert(products)
    .values({
      name: name,
      spacing: spacing,
      germination: germination,
      population_ha: population_ha,
    });
}

export async function allProduct() {
  const result = await db.select().from(products)
  return result
}