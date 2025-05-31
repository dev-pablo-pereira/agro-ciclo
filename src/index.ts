import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema/user';

const db = drizzle(`file:${process.env.DB_FILE_NAME!}`);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    password: '123'
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const users = db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)

  await db
    .update(usersTable)
    .set({
      password: "1234"
    })
    .where(eq(usersTable.name, user.name));
  console.log('User info updated!')

  await db.delete(usersTable).where(eq(usersTable.name, user.name));
  console.log('User deleted!')
}
main();