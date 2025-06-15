import { eq } from "drizzle-orm";
import { db } from "../db";
import { products } from "../schema";

export async function create(
  name: string,
  spacing: number,
  germination: number,
  population_ha: number
) {
  await db.insert(products).values({
    name: name,
    spacing: spacing,
    germination: germination,
    population_ha: population_ha,
  });
}

export async function allProduct() {
  const result = await db.select().from(products);
  return result;
}

export async function getProduct(id: number) {
  const result = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.id, id),
  });
  return result;
}

export async function editProduct(
  id: number,
  name: string,
  spacing: number,
  germination: number,
  population_ha: number
) {
  await db
    .update(products)
    .set({
      name: name,
      spacing: spacing,
      germination: germination,
      population_ha: population_ha,
    })
    .where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));
}
