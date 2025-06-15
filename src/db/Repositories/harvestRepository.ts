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
