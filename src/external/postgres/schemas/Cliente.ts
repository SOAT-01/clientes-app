import {
    pgSchema,
    uuid,
    varchar,
    timestamp,
    boolean,
} from "drizzle-orm/pg-core";
export const clienteSchema = pgSchema("cliente");

export const ClienteSchema = clienteSchema.table("clientes", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    nome: varchar("nome", { length: 256 }),
    email: varchar("email", { length: 256 }),
    cpf: varchar("cpf", { length: 256 }),
    deleted: boolean("deleted").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
