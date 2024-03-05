import { SolicitacaoRemocaoDados } from "entities/solicitacaoRemocaoDados";
import { PostgresDB } from "external/postgres";
import { SolicitacaoRemocaoDadosSchema } from "external/postgres/schemas";

import { SolicitacaoRemocaoDadosGateway } from "interfaces/gateways/solicitacaoRemocaoDadosGateway";

export class SolicitacaoRemocaoDadosPostgresGateway
    implements SolicitacaoRemocaoDadosGateway
{
    constructor(
        private readonly postgresDB: typeof PostgresDB,
        private readonly clienteSchema: typeof SolicitacaoRemocaoDadosSchema,
    ) {}

    public async create(clienteData: SolicitacaoRemocaoDados): Promise<void> {
        await this.postgresDB
            .insert(this.clienteSchema)
            .values(clienteData)
            .returning();
    }
}
