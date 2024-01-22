import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IntStudyPlanStudent } from "./IntStudyPlanStudent.entity";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => IntStudyPlanStudent,
    (intStudyPlanStudent) => intStudyPlanStudent.student
  )
  intStudyPlanStudents: IntStudyPlanStudent[];
}
