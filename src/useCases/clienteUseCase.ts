import { ResourceNotFoundError } from "utils/errors/resourceNotFoundError";
import { Cpf, Email } from "valueObjects";
import { IClienteUseCase } from "./cliente.interface";
import { ClienteDTO } from "./dto";
import { ClienteGateway } from "interfaces/gateways/clienteGateway.interface";
import { ClienteMapper } from "adapters/mappers/clienteMapper";
import { QueueManager } from "external/queueService";
import { BadError } from "utils/errors/badError";
import { SolicitacaoRemocaoDadosGateway } from "interfaces/gateways/solicitacaoRemocaoDadosGateway";
import { SolicitacaoRemocaoDados } from "entities/solicitacaoRemocaoDados";

export class ClienteUseCase implements IClienteUseCase {
    constructor(
        private readonly clienteGateway: ClienteGateway,
        private readonly clienteDataOnPedidosQueueManager: QueueManager,
        private readonly solicitacaoRemocaoDadosGateway: SolicitacaoRemocaoDadosGateway,
    ) {}

    public async create(data: ClienteDTO): Promise<ClienteDTO> {
        const newCliente = ClienteMapper.toDomain(data);

        const alreadyExists = await this.clienteGateway.checkDuplicate({
            cpf: newCliente.cpf.value,
            email: newCliente.email.value,
        });

        if (alreadyExists) throw new Error("Cliente já existe");

        const result = await this.clienteGateway.create(newCliente);
        return ClienteMapper.toDTO(result);
    }

    public async getByCpf(cpf: string): Promise<ClienteDTO | undefined> {
        const result = await this.clienteGateway.getByCpf(
            Cpf.create(cpf).value,
        );

        if (!result) throw new ResourceNotFoundError("Cliente não encontrado");

        return ClienteMapper.toDTO(result);
    }

    public async getByEmail(email: string): Promise<ClienteDTO | undefined> {
        const result = await this.clienteGateway.getByEmail(
            Email.create(email).value,
        );

        if (!result) throw new ResourceNotFoundError("Cliente não encontrado");

        return ClienteMapper.toDTO(result);
    }

    public async getById(id: string): Promise<ClienteDTO | undefined> {
        const result = await this.clienteGateway.getById(id);

        if (!result) throw new ResourceNotFoundError("Cliente não encontrado");

        return ClienteMapper.toDTO(result);
    }

    public async delete(clienteData: {
        cpf: string;
        endereco: string;
        nome: string;
        numero_telefone: string;
    }): Promise<void> {
        try {
            const cliente = await this.clienteGateway.getByCpf(clienteData.cpf);

            if (!cliente)
                throw new ResourceNotFoundError("Cliente não encontrado");

            await this.clienteGateway.delete(cliente.id);

            await this.solicitacaoRemocaoDadosGateway.create({
                endereco: clienteData.endereco,
                nome: clienteData.nome,
                numero_telefone: clienteData.numero_telefone,
            } as SolicitacaoRemocaoDados);

            await this.clienteDataOnPedidosQueueManager.enqueueMessage(
                JSON.stringify({
                    clienteId: cliente.id,
                }),
            );
        } catch (error) {
            throw new BadError(error);
        }
    }
}
