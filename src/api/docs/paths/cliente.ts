import { serverError, notFound, unprocessableEntity } from "../defaults";

export const ClientePaths = {
    "/cliente/{id}": {
        get: {
            tags: ["cliente"],
            summary: "Rota para encontrar um cliente por id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "id do cliente a ser encontrado",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Cliente encontrado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    nome: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    cpf: {
                                        type: "string",
                                    },
                                },
                                required: ["nome", "email"],
                            },
                        },
                    },
                },
                404: {
                    ...notFound,
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
    "/cliente/{cpf}": {
        delete: {
            tags: ["cliente"],
            summary:
                "Rota para remover os dados de um cliente quando solicitado",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                nome: {
                                    type: "string",
                                },
                                endereco: {
                                    type: "string",
                                },
                                numero_telefone: {
                                    type: "string",
                                },
                            },
                            example: {
                                nome: "John Doe",
                                endereco: "Rua X, número 2",
                                numero_telefone: "+5511123456789",
                            },
                            required: ["nome", "endereco", "numero_telefone"],
                        },
                    },
                },
            },
            parameters: [
                {
                    in: "path",
                    name: "cpf",
                    description: "cpf do cliente a ser removido",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Cliente encontrado",
                    content: {
                        "application/json": {
                            message: "User removed with success",
                        },
                    },
                },
                404: {
                    ...notFound,
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
    "/cliente/by-email/{email}": {
        get: {
            tags: ["cliente"],
            summary: "Rota para encontrar um cliente por email",
            parameters: [
                {
                    in: "path",
                    name: "email",
                    description: "email do cliente a ser encontrado",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Cliente encontrado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    nome: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    cpf: {
                                        type: "string",
                                    },
                                },
                                required: ["nome", "email"],
                            },
                        },
                    },
                },
                404: {
                    ...notFound,
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
    "/cliente/by-cpf/{cpf}": {
        get: {
            tags: ["cliente"],
            summary: "Rota para encontrar um cliente por cpf",
            parameters: [
                {
                    in: "path",
                    name: "cpf",
                    description:
                        "cpf do cliente a ser encontrado, para testes utilizar: https://www.geradorcpf.com/",
                    required: true,
                    schema: {
                        type: "string",
                    },
                    example: "000.000.000-00",
                },
            ],
            responses: {
                200: {
                    description: "Cliente encontrado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    nome: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    cpf: {
                                        type: "string",
                                    },
                                },
                                required: ["nome", "email"],
                            },
                        },
                    },
                },
                404: {
                    ...notFound,
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
    "/cliente": {
        post: {
            tags: ["cliente"],
            summary: "Rota para cadastrar um cliente",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                nome: {
                                    type: "string",
                                },
                                email: {
                                    type: "string",
                                },
                                cpf: {
                                    type: "string",
                                    description:
                                        "cpf para cadastro, para testes utilizar: https://www.geradorcpf.com/",
                                },
                            },
                            example: {
                                nome: "John Doe",
                                email: "doe@email.com",
                                cpf: "371.259.377-56",
                            },
                            required: ["nome", "email"],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Cliente cadastrado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    nome: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    cpf: {
                                        type: "string",
                                    },
                                },
                                required: ["nome", "email"],
                            },
                        },
                    },
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
};
