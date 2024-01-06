import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { serverConfig } from "config";
import { ClienteSchema } from "../schemas";

const postgresClient = postgres({
    host: serverConfig.postgres.host,
    port: serverConfig.postgres.port,
    database: serverConfig.postgres.database,
    user: serverConfig.postgres.user,
    password: serverConfig.postgres.password,
    max: 1,
});

const db = drizzle(postgresClient);

async function seedClientes() {
    console.log("Seeding Clientes...");
    const data: (typeof ClienteSchema.$inferInsert)[] = [
        {
            nome: "John Doe",
            email: "john@soat.com.br",
            cpf: "392.145.980-02",
        },
        {
            nome: "Jane Doe",
            email: "jane@soat.com.br",
            cpf: "293.909.060-24",
        },
    ];

    await db.insert(ClienteSchema).values(data);
    return;
}

async function runSeed() {
    console.log("Seeding Postgres...");
    await seedClientes();
    console.log("Seed complete.");
    process.exit(0);
}

runSeed()
    .then()
    .catch((e) => {
        console.log(e);
        process.exit(0);
    });
