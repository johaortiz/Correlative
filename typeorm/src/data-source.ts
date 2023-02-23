import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Career } from "./entity/Career";
import { Subject } from "./entity/Subject";
import { config } from "dotenv";
import { UserSubject } from "./entity/UserSubject";
const env = config().parsed;

console.log(env);



export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.DATABASE_HOST,
    port: parseInt(env.DATABASE_PORT),
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Career, Subject, UserSubject],
    migrations: [],
    subscribers: [],
});