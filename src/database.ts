import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    DB_HOST,
    DB_NAME_TEST,
    DB_NAME_DEV,
    DB_USER,
    DB_PASSWORD,
    ENV,
    DB_PORT
} = process.env;

const client = new Pool({
    host: DB_HOST,
    database: ENV === 'dev' ? DB_NAME_DEV : DB_NAME_TEST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT as unknown as number
})

export default client;