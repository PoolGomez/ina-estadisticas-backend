import { envs } from "../config";

import { Pool } from 'pg';

const postgresDB = new Pool({
    
    host: envs.POSTGRES_HOST,   // Cambia si tu base de datos está en otro host
    database: envs.POSTGRES_DATABASE, // Reemplaza con el nombre de tu base de datos
    user: envs.POSTGRES_USER, // Reemplaza con tu usuario de PostgreSQL
    password: envs.POSTGRES_PASSWORD, // Reemplaza con tu contraseña
    port: envs.POSTGRES_PORT, // El puerto por defecto de PostgreSQL
});

export default postgresDB;