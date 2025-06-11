import { db } from "../db";
import { areas } from "../schema";

export async function createArea(idUser: number, name: string, color: string) {
  const result = await db.insert(areas).values([
    {
      id_user: idUser,
      name: name,
      color: color,
    },
  ]).returning(); // Retorna os campos do usuário recém-criado

  return result[0]; ;
}
export async function allArea(idUser: number) {
  const result = await db.select().from(areas);
  return result;
}
