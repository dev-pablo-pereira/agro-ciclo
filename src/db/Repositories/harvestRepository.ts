import { eq } from "drizzle-orm";
import { db } from "../db";
import { harvests } from "../schema";

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

export async function deleteHavest(id:number) {
  db.delete(harvests).where(eq(harvests.id, id))
}
