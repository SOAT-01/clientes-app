import { parseEnvInt, parseEnvStr } from "./utils";

export const serverConfig = {
    env: parseEnvStr("NODE_ENV", "development"),
    port: parseEnvInt("PORT", 6001),
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV === "development",
    sqs: {
        region: parseEnvStr("SQS_REGION", "us-east-1"),
        accessKeyId: parseEnvStr("SQS_ACCESS_KEY_ID", "AKIASEKWN5VMCC3LDZNW"),
        secretAccessKey: parseEnvStr(
            "SQS_SECRET_ACCESS_KEY",
            "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",
        ),
    },
    postgres: {
        database: parseEnvStr("POSTGRES_DB", "fast_food"),
        host: parseEnvStr("POSTGRES_DB_HOST", "127.0.0.1"),
        port: parseEnvInt("POSTGRES_DB_PORT", 5432),
        user: parseEnvStr("POSTGRES_DB_USER", "root"),
        password: parseEnvStr("POSTGRES_DB_PASSWORD", "root"),
        schemaFolder: "./src/external/postgres/schemas/*",
        migrationFolder: "./src/external/postgres/migrations",
    },
    queues: {
        anonimizacaoCliente: parseEnvStr(
            "QUEUE_ANONIMIZACAO_CLIENTE",
            "http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/localstack-queue",
        ),
    },
} as const;
