import { Cliente } from "entities/cliente";

export interface ClienteGateway {
    create(cliente: Cliente): Promise<Cliente>;
    getById(id: string): Promise<Cliente | undefined>;
    getByEmail(email: string): Promise<Cliente | undefined>;
    getByCpf(cpf: string): Promise<Cliente | undefined>;
    checkDuplicate(args: { email: string; cpf?: string }): Promise<boolean>;
    delete(id: string): Promise<void>;
}
