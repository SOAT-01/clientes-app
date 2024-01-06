import { parseEnvInt, parseEnvStr } from "./utils";

export const serverConfig = {
    env: parseEnvStr("NODE_ENV", "development"),
    port: parseEnvInt("PORT", 6001),
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV === "development",
    postgres: {
        database: parseEnvStr("POSTGRES_DB", "fast_food"),
        host: parseEnvStr("POSTGRES_DB_HOST", "127.0.0.1"),
        port: parseEnvInt("POSTGRES_DB_PORT", 5432),
        user: parseEnvStr("POSTGRES_DB_USER", "root"),
        password: parseEnvStr("POSTGRES_DB_PASSWORD", "root"),
        schemaFolder: "./src/external/postgres/schemas/*",
        migrationFolder: "./src/external/postgres/migrations",
    },
} as const;
