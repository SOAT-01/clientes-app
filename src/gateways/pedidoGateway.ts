import { PedidoServiceApi } from "external/pedidoService/api";
import { PedidoGateway } from "interfaces/gateways/pedidoGateway.interface";

export class PedidoServiceGateway implements PedidoGateway {
    constructor(private readonly pedidoService: PedidoServiceApi) {}

    public async deleteClientesFromPedidos(id: string): Promise<void> {
        const response = await this.pedidoService.delete<void>(
            `/cliente/${id}`,
        );

        return response.data;
    }
}
