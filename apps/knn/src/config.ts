import { config } from "@app/database";

export const databaseConfig: config = {
    type: "postgres",
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    synchronize: true
};