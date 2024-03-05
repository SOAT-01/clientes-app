import { uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { clienteSchema } from "./Cliente";

export const SolicitacaoRemocaoDadosSchema = clienteSchema.table(
    "solicitacao_remocao_dados",
    {
        id: uuid("id").defaultRandom().primaryKey().notNull(),
        nome: varchar("nome", { length: 256 }),
        endereco: varchar("endereco", { length: 256 }),
        numero_telefone: varchar("numero_telefone", { length: 256 }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
);
