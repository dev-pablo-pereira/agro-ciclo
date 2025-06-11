import { db } from "../db";
import { areas } from "../schema";

export async function createArea(idUser: number, name: string, color: string) {
  await db.insert(areas).values([
    {
      id_user: idUser,
      name: name,
      color: color,
    },
  ]);
}
export async function allArea(idUser: number) {
  const result = await db.select().from(areas);
  return result;
}
