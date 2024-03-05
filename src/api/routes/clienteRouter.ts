import { clienteController } from "controllers";
import { Router } from "express";

export function makeClienteRouter(): Router {
    const clienteRouter = Router();

    clienteRouter.post("/", async (req, res, next) =>
        clienteController.post(req, res, next),
    );

    clienteRouter.get("/:id", async (req, res, next) =>
        clienteController.getById(req, res, next),
    );

    clienteRouter.get("/by-email/:email", async (req, res, next) =>
        clienteController.getByEmail(req, res, next),
    );

    clienteRouter.get("/by-cpf/:cpf", async (req, res, next) =>
        clienteController.getByCpf(req, res, next),
    );

    clienteRouter.delete("/:cpf", async (req, res, next) =>
        clienteController.delete(req, res, next),
    );

    return clienteRouter;
}
