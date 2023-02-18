import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
// import { config } from "dotenv";
// const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT } = config();


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "2207",
    database: "ucpcorrelatives",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
