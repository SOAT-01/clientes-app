import { ClienteController } from "./controller";
import { ClientePostgresGateway } from "gateways/clienteGateway";
import { PostgresDB } from "external/postgres";
import { ClienteSchema } from "external/postgres/schemas";
import { ClienteUseCase } from "useCases";
import { PedidoServiceGateway } from "gateways/pedidoGateway";
import { pedidoServiceApi } from "external/pedidoService/api";

export class ClienteControllerFactory {
    public static create(): ClienteController {
        const clienteGateway = new ClientePostgresGateway(
            PostgresDB,
            ClienteSchema,
        );
        const pedidoGateway = new PedidoServiceGateway(pedidoServiceApi);

        const clienteUseCase = new ClienteUseCase(
            clienteGateway,
            pedidoGateway,
        );
        return new ClienteController(clienteUseCase);
    }
}
