import { db } from "../db";
import { users } from "../schema";

export async function createUser(name: string, password: string) {
  await db.insert(users).values([
    {
      name: name,
      password: password
    },
  ]),
  console.log("usuario criado");
  ;
}
