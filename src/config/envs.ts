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
}