import { eq } from "drizzle-orm";
import { db } from "../db";
import { harvests, products } from "../schema";

export async function newHarvest(
  name: string,
  season: string,
  start: string,
  end: string
) {
  await db
    .insert(harvests)
    .values({ name: name, season: season, start: start, end: end });
}

export async function getAll() {
  const result = await db.select().from(harvests);
  return result;
}

export async function getHarvest(id: number) {
  const result = await db.query.harvests.findFirst({
    where: (harvests, { eq }) => eq(harvests.id, id),
  });
  return result;
}

export async function editHarvest(
  id: number,
  name: string,
  season: string,
  start: string,
  end: string
) {
  await db
    .update(harvests)
    .set({
      name: name,
      season: season,
      start: start,
      end: end,
    })
    .where(eq(harvests.id, id));
}

export async function deleteHavest(id: number) {
  await db.delete(harvests).where(eq(harvests.id, id));
}
