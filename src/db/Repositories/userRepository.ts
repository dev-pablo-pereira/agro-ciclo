import { db } from "../db";
import { users } from "../schema";

export async function createUser(name: string, password: string) {
  const result = await db
    .insert(users)
    .values([
      {
        name: name,
        password: password,
      },
    ])
    .returning(); // Retorna os campos do usuário recém-criado

  return result[0]; // Retorna o usuário completo
}

export async function getUserByName(name: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.name, name),
  });

  return user;
}
