"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresDB = void 0;
const config_1 = require("../config");
const pg_1 = require("pg");
exports.postgresDB = new pg_1.Pool({
    host: config_1.envs.POSTGRES_HOST, // Cambia si tu base de datos está en otro host
    database: config_1.envs.POSTGRES_DATABASE, // Reemplaza con el nombre de tu base de datos
    user: config_1.envs.POSTGRES_USER, // Reemplaza con tu usuario de PostgreSQL
    password: config_1.envs.POSTGRES_PASSWORD, // Reemplaza con tu contraseña
    port: config_1.envs.POSTGRES_PORT, // El puerto por defecto de PostgreSQL
});
exports.default = exports.postgresDB;
