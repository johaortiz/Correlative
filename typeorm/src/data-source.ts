import "reflect-metadata";
import { DataSource } from "typeorm";
import { Career } from "./entity/Career.entity";
import { Student } from "./entity/Student.entity";
import { StudyPlan } from "./entity/StudyPlan.entity";
import { Course } from "./entity/Course.entity";
import { IntStudyPlanStudent } from "./entity/IntStudyPlanStudent.entity";
import { IntStudyPlanCourse } from "./entity/IntStudyPlanCourse.entity";
import { IntCorrelation } from "./entity/IntCorrelation.entity";
import { IntStudentStatus } from "./entity/IntStudentStatus.entity";
require("dotenv").config();

const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT, 10),
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false, // Esto desactiva la verificación del certificado SSL. No es recomendado para producción.
  },
  entities: [
    Career,
    Student,
    StudyPlan,
    Course,
    IntStudyPlanStudent,
    IntStudentStatus,
    IntStudyPlanCourse,
    IntCorrelation,
  ],
  migrations: [],
  subscribers: [],
});
