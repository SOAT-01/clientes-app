import axios from "axios";
import { serverConfig } from "config";

export const pedidoServiceApi = axios.create({
    baseURL: serverConfig.pedidoService.url,
});

export type PedidoServiceApi = typeof pedidoServiceApi;
