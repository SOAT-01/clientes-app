export interface PedidoGateway {
    deleteClientesFromPedidos(id: string): Promise<void>;
}
