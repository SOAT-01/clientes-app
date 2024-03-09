import { ClienteController } from "./controller";
import { ClientePostgresGateway } from "gateways/clienteGateway";
import { PostgresDB } from "external/postgres";
import {
    ClienteSchema,
    SolicitacaoRemocaoDadosSchema,
} from "external/postgres/schemas";
import { ClienteUseCase } from "useCases";
import { QueueManager } from "external/queueService";
import { serverConfig } from "config";
import { SQSClient } from "external/queueService/client";
import { SolicitacaoRemocaoDadosPostgresGateway } from "gateways/solicitacaoRemocaoDadosGateway";

export class ClienteControllerFactory {
    public static create(): ClienteController {
        const clienteGateway = new ClientePostgresGateway(
            PostgresDB,
            ClienteSchema,
        );

        const solicitacaoRemocaoDadosGateway =
            new SolicitacaoRemocaoDadosPostgresGateway(
                PostgresDB,
                SolicitacaoRemocaoDadosSchema,
            );

        const clienteDataOnPedidosQueueManager = new QueueManager(
            serverConfig.queues.anonimizacaoCliente,
            SQSClient,
        );

        const clienteUseCase = new ClienteUseCase(
            clienteGateway,
            clienteDataOnPedidosQueueManager,
            solicitacaoRemocaoDadosGateway,
        );
        return new ClienteController(clienteUseCase);
    }
}
