CREATE TABLE IF NOT EXISTS "clientes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(256),
	"email" varchar(256),
	"cpf" varchar(256),
	"deleted" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
