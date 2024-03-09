CREATE SCHEMA "cliente";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cliente"."solicitacao_remocao_dados" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(256),
	"endereco" varchar(256),
	"numero_telefone" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "clientes" SET SCHEMA "cliente";
