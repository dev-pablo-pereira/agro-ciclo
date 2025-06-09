import { db } from "../db";
import { coordinates } from "../schema";

export async function createCoordinate(
  id_area: number,
  latitude: number,
  longitude: number
) {
  await db.insert(coordinates).values([
    {
      id_area: id_area,
      latitude: latitude,
      longitude: longitude,
    },
  ]);
}
