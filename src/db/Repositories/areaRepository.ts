import { eq } from "drizzle-orm";
import { db } from "../db";
import { areas } from "../schema";

export async function createArea(idUser: number, name: string, color: string) {
  const result = await db
    .insert(areas)
    .values([
      {
        id_user: idUser,
        name: name,
        color: color,
      },
    ])
    .returning(); // Retorna os campos do usuário recém-criado

  return result[0];
}

export async function getArea(idArea: number) {
  const result = await db.query.areas.findFirst({
    where: (areas, { eq }) => eq(areas.id, idArea),
  });
  return result;
}

export async function allArea(idUser: number) {
  const result = await db.query.areas.findMany({
    where: (areas, { eq }) => eq(areas.id_user, idUser),
  });
  return result;
}

export async function editArea(idArea: number, name: string, color: string) {
  await db.update(areas).set({name: name, color: color}).where(eq(areas.id, idArea))
}

export async function deleteArea(idArea: number) {
  await db.delete(areas).where(eq(areas.id, idArea));
}
