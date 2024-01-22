import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IntStudyPlanCourse } from "./IntStudyPlanCourse.entity";
import { IntCorrelation } from "./IntCorrelation.entity";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column()
  name: string;

  @Column()
  org: string;
  
  @OneToMany(
    () => IntStudyPlanCourse,
    (intStudyPlanCourse) => intStudyPlanCourse.course
  )
  studyPlans: IntStudyPlanCourse[];

  @OneToMany(() => IntCorrelation, (intCorrelation) => intCorrelation.course)
  intCorrelation: IntCorrelation[];
}
