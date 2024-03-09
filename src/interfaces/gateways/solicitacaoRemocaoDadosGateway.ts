import { SolicitacaoRemocaoDados } from "entities/solicitacaoRemocaoDados";

export interface SolicitacaoRemocaoDadosGateway {
    create(cliente: SolicitacaoRemocaoDados): Promise<void>;
}
