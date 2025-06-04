import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import {db, sqliteDb} from "../db/db";
import migrations from "../drizzle/migrations";

export function useLocalMigrations() {
    const migrationData = useMigrations(db, migrations)

    if (__DEV__) {
        useDrizzleStudio(sqliteDb())
    }

    return migrationData
}