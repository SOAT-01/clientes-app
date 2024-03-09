import { Entity } from "../interfaces/entity.interface";
import { AssertionConcern } from "utils/assertionConcern";

interface SolicitacaoRemocaoDadosProperties
    extends Omit<SolicitacaoRemocaoDados, "id"> {
    id?: string;
}

export class SolicitacaoRemocaoDados implements Entity {
    id: string;
    nome: string;
    endereco: string;
    numero_telefone: string;

    constructor(fields: SolicitacaoRemocaoDadosProperties) {
        this.id = fields?.id;
        this.nome = fields.nome;
        this.endereco = fields.endereco;
        this.numero_telefone = fields.numero_telefone;

        this.validateEntity();
    }

    public validateEntity(): void {
        AssertionConcern.assertArgumentNotEmpty(this.nome, "Nome is required");
        AssertionConcern.assertArgumentNotEmpty(
            this.numero_telefone,
            "numero_telefone is required",
        );
        AssertionConcern.assertArgumentNotEmpty(
            this.endereco,
            "Endereco is required",
        );
    }
}
