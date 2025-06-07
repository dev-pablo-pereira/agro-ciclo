import { db } from "../db";
import { users } from "../schema";

export async function createUser(name: string, password: string) {
  await db.insert(users).values([
    {
      name: name,
      password: password,
    },
  ]);
}

export async function getUserByName(name: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.name, name),
  });

  return user;
}
