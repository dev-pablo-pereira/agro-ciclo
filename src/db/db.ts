import { drizzle } from "drizzle-orm/expo-sqlite";
import { defaultDatabaseDirectory, openDatabaseSync } from "expo-sqlite";

import * as schema from "./schema"

export const sqliteDb = (sholdCloseConnection?: boolean) => {
  const db = openDatabaseSync(
    "db.db",
    {
      enableChangeListener: true,
    },
    defaultDatabaseDirectory
  );

  if (sholdCloseConnection) {
    if (db.isInTransactionSync()) {
      db.closeSync();

      return openDatabaseSync(
        "db.db",
        {
          enableChangeListener: true,
        },
        defaultDatabaseDirectory
      );
    }
  }

  return db;
};

export const db = drizzle(sqliteDb(), {
  schema,
  logger: false,
});
