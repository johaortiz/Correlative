import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { config } from "dotenv";
const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT } = config().parsed;


export const AppDataSource = new DataSource({
    type: "postgres",
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT),
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
