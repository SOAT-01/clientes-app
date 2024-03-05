import { Cliente } from "entities/cliente";
import { SolicitacaoRemocaoDados } from "entities/solicitacaoRemocaoDados";
import { QueueManager } from "external/queueService";
import { SQSClient } from "external/queueService/client";
import { ClienteGateway } from "interfaces/gateways/clienteGateway.interface";
import { SolicitacaoRemocaoDadosGateway } from "interfaces/gateways/solicitacaoRemocaoDadosGateway";

import { ClienteUseCase } from "useCases";
import { ResourceNotFoundError } from "utils/errors/resourceNotFoundError";
import { Email, Cpf } from "valueObjects";

jest.mock("external/queueService/client", () => {
    return {
        SQSClient: jest.fn().mockImplementation(() => {
            return {
                sendMessage: jest.fn().mockReturnValue({
                    promise: jest.fn(),
                }),
            };
        }),
    };
});

describe("ClienteUseCases", () => {
    let gatewayStub: ClienteGateway;
    let solicitacaoRemocaoDadosGatewayStub: SolicitacaoRemocaoDadosGateway;
    let queueMock: QueueManager;
    let sut: ClienteUseCase;

    const mockId = "001";
    const mockEmail = "jdoe1@email.com";
    const mockCpf = "111.111.111-11";

    const mockEmail2 = "jdoe2@email.com";
    const mockCpf2 = "222.222.222-22";

    const mockDTO = {
        nome: "John Doe",
        email: mockEmail,
        cpf: mockCpf,
    };

    const mockCliente = new Cliente({
        nome: mockDTO.nome,
        email: Email.create(mockDTO.email),
        cpf: Cpf.create(mockDTO.cpf),
    });

    class ClienteGatewayStub implements ClienteGateway {
        create(cliente: Cliente): Promise<Cliente> {
            return Promise.resolve(mockCliente);
        }
        delete(id: string): Promise<void> {
            return Promise.resolve();
        }
        getById(id: string): Promise<Cliente> {
            return Promise.resolve(mockCliente);
        }
        getByCpf(cpf: string): Promise<Cliente> {
            return Promise.resolve(mockCliente);
        }
        getByEmail(email: string): Promise<Cliente> {
            return Promise.resolve(mockCliente);
        }
        checkDuplicate(args: {
            email: string;
            cpf?: string;
        }): Promise<boolean> {
            if (args.email === mockEmail2 || args.cpf === mockCpf2) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        }
    }

    class SolicitacaoRemocaoDadosGatewayStub
        implements SolicitacaoRemocaoDadosGateway
    {
        create(cliente: SolicitacaoRemocaoDados): Promise<void> {
            return Promise.resolve();
        }
    }

    beforeAll(() => {
        gatewayStub = new ClienteGatewayStub();
        solicitacaoRemocaoDadosGatewayStub =
            new SolicitacaoRemocaoDadosGatewayStub();
        queueMock = new QueueManager("test", SQSClient);
        sut = new ClienteUseCase(
            gatewayStub,
            queueMock,
            solicitacaoRemocaoDadosGatewayStub,
        );
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("Given create method is called", () => {
        describe("When all the data is correct and no problems are found", () => {
            it("should call create on the gateway and return the created cliente", async () => {
                const create = jest.spyOn(gatewayStub, "create");

                const cliente = await sut.create(mockDTO);

                expect(cliente.nome).toEqual(mockDTO.nome);
                expect(cliente.cpf).toEqual(mockDTO.cpf);
                expect(create).toHaveBeenCalledWith(mockCliente);
            });
        });

        describe("When the Cliente already exists", () => {
            it("should throw Cliente já existe error", async () => {
                await expect(
                    sut.create({
                        nome: "John Doe",
                        email: mockEmail2,
                        cpf: mockCpf2,
                    }),
                ).rejects.toThrow("Cliente já existe");
            });
        });
    });

    describe("Given getByCpf method is called", () => {
        describe("When all the data is correct and no problems are found", () => {
            it("should call getByCpf on the gateway and return cliente for a correct cpf", async () => {
                const getByCpf = jest.spyOn(gatewayStub, "getByCpf");

                const cliente = await sut.getByCpf(mockCpf);
                expect(getByCpf).toHaveBeenCalledWith(mockCpf);
                expect(cliente).toEqual(mockDTO);
            });
        });
        describe("When the Cliente is not found", () => {
            it("should throw an ResourceNotFoundError", async () => {
                jest.spyOn(gatewayStub, "getByCpf").mockResolvedValueOnce(
                    undefined,
                );
                await expect(sut.getByCpf(mockCpf)).rejects.toThrow(
                    new ResourceNotFoundError("Cliente não encontrado"),
                );
            });
        });
    });

    describe("Given getByEmail method is called", () => {
        describe("When all the data is correct and no problems are found", () => {
            it("should call getByEmail on the gateway and return cliente for a correct email", async () => {
                const getByEmail = jest.spyOn(gatewayStub, "getByEmail");

                const cliente = await sut.getByEmail(mockEmail);
                expect(getByEmail).toHaveBeenCalledWith(mockEmail);
                expect(cliente).toEqual(mockDTO);
            });
        });

        describe("When the Cliente is not found", () => {
            it("should throw an ResourceNotFoundError", async () => {
                jest.spyOn(gatewayStub, "getByEmail").mockResolvedValueOnce(
                    undefined,
                );
                await expect(sut.getByEmail(mockEmail)).rejects.toThrow(
                    new ResourceNotFoundError("Cliente não encontrado"),
                );
            });
        });
    });
    describe("Given getById method is called", () => {
        describe("When all the data is correct and no problems are found", () => {
            it("should return cliente for a correct id", async () => {
                const getById = jest.spyOn(gatewayStub, "getById");

                const cliente = await sut.getById(mockId);
                expect(getById).toHaveBeenCalledWith(mockId);
                expect(cliente).toEqual(mockDTO);
            });
        });

        describe("When the cliente is not found", () => {
            it("should throw an ResourceNotFoundError", async () => {
                jest.spyOn(gatewayStub, "getById").mockResolvedValueOnce(
                    undefined,
                );
                await expect(sut.getById(mockId)).rejects.toThrow(
                    new ResourceNotFoundError("Cliente não encontrado"),
                );
            });
        });
    });
    describe("Given delete method is called", () => {
        describe("When the cliente requires for their data to be deleted", () => {
            it("should update clientes table and notify pedidos to also do it", async () => {
                const deleteCliente = jest.spyOn(gatewayStub, "delete");
                jest.spyOn(gatewayStub, "getByCpf").mockResolvedValueOnce(
                    new Cliente({
                        id: mockId,
                        nome: "John Doe",
                        email: Email.create(mockEmail),
                        cpf: Cpf.create(mockCpf),
                    }),
                );
                jest.spyOn(queueMock, "enqueueMessage").mockResolvedValueOnce();

                await sut.delete({
                    cpf: mockDTO.cpf,
                    endereco: "Rua 2, 0",
                    nome: "John Doe",
                    numero_telefone: "123456789",
                });
                expect(deleteCliente).toHaveBeenCalledWith(mockId);
                expect(queueMock.enqueueMessage).toHaveBeenCalledWith(
                    JSON.stringify({
                        clienteId: mockId,
                    }),
                );
            });
        });
    });
});
