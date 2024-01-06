import { Router } from "express";
import { makeClienteRouter } from "./clienteRouter";

export function makeServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/cliente", makeClienteRouter());

    return serverRouter;
}
