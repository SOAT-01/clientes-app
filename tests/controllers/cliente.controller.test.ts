import { ClienteController } from "controllers/controller";
import { ClienteUseCase } from "useCases";
import { StatusCode } from "utils/statusCode";

describe("ClienteController", () => {
    let clienteUseCaseMock: jest.Mocked<ClienteUseCase>;
    let clienteController: ClienteController;

    beforeEach(() => {
        clienteUseCaseMock = {} as jest.Mocked<ClienteUseCase>;
        clienteController = new ClienteController(clienteUseCaseMock);
    });

    describe("Given post method is called", () => {
        describe("When all the data is correct and no problems are found", () => {
            it("should create a new cliente and return it", async () => {
                const mockRequest = {
                    body: {
                        nome: "John Doe",
                        email: "john@example.com",
                        cpf: "123.456.789-00",
                    },
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                const expectedResult = { id: "someId", ...mockRequest.body };
                clienteUseCaseMock.create = jest
                    .fn()
                    .mockResolvedValue(expectedResult);

                await clienteController.post(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(
                    StatusCode.created,
                );
                expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When an error happens", () => {
            it("should handle errors by calling the next function with the error", async () => {
                const mockRequest = {
                    body: {},
                } as any;
                const mockResponse = {} as any;
                const mockNextFunction = jest.fn();

                clienteUseCaseMock.create = jest
                    .fn()
                    .mockRejectedValue(new Error("Failed to create"));

                await clienteController.post(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockNextFunction).toHaveBeenCalledWith(
                    expect.any(Error),
                );
            });
        });
    });
    describe("Given getByCPF method is called", () => {
        describe("When all the data is correct and no problems are found", () => {
            it("should search the cliente and return it", async () => {
                const mockRequest = {
                    params: {
                        cpf: "123.456.789-00",
                    },
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                const expectedResult = {
                    id: "someId",
                    ...mockRequest.params,
                    nome: "John Doe",
                    email: "john@example.com",
                };

                clienteUseCaseMock.getByCpf = jest
                    .fn()
                    .mockResolvedValue(expectedResult);

                await clienteController.getByCpf(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.ok);
                expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When the cpf is not sent through the params", () => {
            it("it should return unprocessableEntity(422) response error", async () => {
                const mockRequest = {
                    params: {},
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                await clienteController.getByCpf(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(
                    StatusCode.unprocessableEntity,
                );
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: "Missing identifier cpf",
                });
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When the useCase return an empty value", () => {
            it("it should return notFound(404) response error", async () => {
                const mockRequest = {
                    params: {
                        cpf: "123.456.789-00",
                    },
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                    end: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                clienteUseCaseMock.getByCpf = jest
                    .fn()
                    .mockResolvedValue(undefined);

                await clienteController.getByCpf(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(
                    StatusCode.notFound,
                );
                expect(mockResponse.end).toHaveBeenCalled();
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When an error happens", () => {
            it("should handle errors by calling the next function with the error", async () => {
                const mockRequest = {
                    body: {},
                } as any;
                const mockResponse = {} as any;
                const mockNextFunction = jest.fn();

                clienteUseCaseMock.getByCpf = jest
                    .fn()
                    .mockRejectedValue(new Error("Failed to create"));

                await clienteController.getByCpf(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockNextFunction).toHaveBeenCalledWith(
                    expect.any(Error),
                );
            });
        });
    });
    describe("Given getByEmail method is called", () => {
        describe("When all the data is correct and no problems are found", () => {
            it("should search the cliente and return it", async () => {
                const mockRequest = {
                    params: {
                        email: "john@example.com",
                    },
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                const expectedResult = {
                    id: "someId",
                    cpf: "123.456.789-00",
                    nome: "John Doe",
                    email: "john@example.com",
                };

                clienteUseCaseMock.getByEmail = jest
                    .fn()
                    .mockResolvedValue(expectedResult);

                await clienteController.getByEmail(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.ok);
                expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When the email is not sent through the params", () => {
            it("it should return unprocessableEntity(422) response error", async () => {
                const mockRequest = {
                    params: {},
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                await clienteController.getByEmail(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(
                    StatusCode.unprocessableEntity,
                );
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: "Missing identifier email",
                });
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When the useCase return an empty value", () => {
            it("it should return notFound(404) response error", async () => {
                const mockRequest = {
                    params: {
                        email: "email@email.com",
                    },
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                    end: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                clienteUseCaseMock.getByEmail = jest
                    .fn()
                    .mockResolvedValue(undefined);

                await clienteController.getByEmail(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(
                    StatusCode.notFound,
                );
                expect(mockResponse.end).toHaveBeenCalled();
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When an error happens", () => {
            it("should handle errors by calling the next function with the error", async () => {
                const mockRequest = {
                    body: {},
                } as any;
                const mockResponse = {} as any;
                const mockNextFunction = jest.fn();

                clienteUseCaseMock.getByEmail = jest
                    .fn()
                    .mockRejectedValue(new Error("Failed to create"));

                await clienteController.getByEmail(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockNextFunction).toHaveBeenCalledWith(
                    expect.any(Error),
                );
            });
        });
    });
    describe("Given getById method is called", () => {
        describe("When all the data is correct and no problems are found", () => {
            it("should search the cliente and return it", async () => {
                const mockRequest = {
                    params: {
                        id: "001",
                    },
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                const expectedResult = {
                    id: "001",
                    nome: "John Doe",
                    email: "john@example.com",
                };

                clienteUseCaseMock.getById = jest
                    .fn()
                    .mockResolvedValue(expectedResult);

                await clienteController.getById(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.ok);
                expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When the id param is not present", () => {
            it("it should return unprocessableEntity(422) response error", async () => {
                const mockRequest = {
                    params: {},
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                await clienteController.getById(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(
                    StatusCode.unprocessableEntity,
                );
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: "Missing identifier id",
                });
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When the useCase return an empty value", () => {
            it("it should return notFound(404) response error", async () => {
                const mockRequest = {
                    params: {
                        id: "005",
                    },
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                    end: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                clienteUseCaseMock.getById = jest
                    .fn()
                    .mockResolvedValue(undefined);

                await clienteController.getById(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(
                    StatusCode.notFound,
                );
                expect(mockResponse.end).toHaveBeenCalled();
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When an error happens", () => {
            it("should handle errors by calling the next function with the error", async () => {
                const mockRequest = {
                    body: {},
                } as any;
                const mockResponse = {} as any;
                const mockNextFunction = jest.fn();

                clienteUseCaseMock.getById = jest
                    .fn()
                    .mockRejectedValue(new Error("Server error"));

                await clienteController.getById(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockNextFunction).toHaveBeenCalledWith(
                    expect.any(Error),
                );
            });
        });
    });
});
