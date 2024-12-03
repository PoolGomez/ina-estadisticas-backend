import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
    // POSTGRES_HOST: get('POSTGRES_HOST').default('localhost').asString(),
    // POSTGRES_USER: get('POSTGRES_USER').required().asString(),
    POSTGRES_HOST: get('POSTGRES_HOST').asString(),
    POSTGRES_DATABASE: get('POSTGRES_DATABASE').asString(),
    POSTGRES_USER: get('POSTGRES_USER').asString(),
    POSTGRES_PASSWORD: get('POSTGRES_PASSWORD').asString(),
    POSTGRES_PORT: get('POSTGRES_PORT').asPortNumber(),
    SERVER_PORT: get('SERVER_PORT').default('3100').asPortNumber(),
    GOOGLE_APLICATION_CREDENTIALS: get('GOOGLE_APLICATION_CREDENTIALS').asString(),
    JWT_SECRET_KEY: get('JWT_SECRET_KEY').asString(),
    ACCESS_TOKEN_SECRET: get('ACCESS_TOKEN_SECRET').asString(),
    REFRESH_TOKEN_SECRET: get('REFRESH_TOKEN_SECRET').asString(),
    MODO: get('MODO').asString(),
}