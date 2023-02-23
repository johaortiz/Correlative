import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Career } from "./entity/Career";
import { Subject } from "./entity/Subject";
import { UserSubject } from "./entity/UserSubject";
require("dotenv").config();
const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT } = process.env;


export const AppDataSource = new DataSource({
    type: "postgres",
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT),
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Career, Subject, UserSubject],
    migrations: [],
    subscribers: [],
});