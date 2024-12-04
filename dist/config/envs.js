"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    // POSTGRES_HOST: get('POSTGRES_HOST').default('localhost').asString(),
    // POSTGRES_USER: get('POSTGRES_USER').required().asString(),
    POSTGRES_HOST: (0, env_var_1.get)('POSTGRES_HOST').asString(),
    POSTGRES_DATABASE: (0, env_var_1.get)('POSTGRES_DATABASE').asString(),
    POSTGRES_USER: (0, env_var_1.get)('POSTGRES_USER').asString(),
    POSTGRES_PASSWORD: (0, env_var_1.get)('POSTGRES_PASSWORD').asString(),
    POSTGRES_PORT: (0, env_var_1.get)('POSTGRES_PORT').asPortNumber(),
    SERVER_PORT: (0, env_var_1.get)('SERVER_PORT').default('3100').asPortNumber(),
    GOOGLE_APLICATION_CREDENTIALS: (0, env_var_1.get)('GOOGLE_APLICATION_CREDENTIALS').asString(),
    JWT_SECRET_KEY: (0, env_var_1.get)('JWT_SECRET_KEY').asString(),
    ACCESS_TOKEN_SECRET: (0, env_var_1.get)('ACCESS_TOKEN_SECRET').asString(),
    REFRESH_TOKEN_SECRET: (0, env_var_1.get)('REFRESH_TOKEN_SECRET').asString(),
    MODO: (0, env_var_1.get)('MODO').asString(),
};
