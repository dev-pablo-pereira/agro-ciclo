import { eq } from "drizzle-orm";
import { db } from "../db";
import { cultivations } from "../schema";

export async function newCultivation(idArea: number, idProduct: number) {
  await db
    .insert(cultivations)
    .values({ id_area: idArea, id_product: idProduct });
}
