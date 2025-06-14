import { eq } from "drizzle-orm";
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

export async function getAllCoordinate(idArea: number) {
  const result = await db.query.coordinates.findMany({
    where: (coordinates, { eq }) => eq(coordinates.id_area, idArea),
  });
  return result;
}

export async function deleteCoordinate(idCoordinate: number) {
  await db.delete(coordinates).where(eq(coordinates.id, idCoordinate));
}