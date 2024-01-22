import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Career } from "./Career.entity";
import { IntStudyPlanStudent } from "./IntStudyPlanStudent.entity";
import { IntStudyPlanCourse } from "./IntStudyPlanCourse.entity";

@Entity()
export class StudyPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Career, (career) => career.studyPlans)
  career: Career;

  @OneToMany(
    () => IntStudyPlanStudent,
    (intStudyPlanStudent) => intStudyPlanStudent.studyPlan,
    { cascade: true }
  )
  intStudyPlanStudents: IntStudyPlanStudent[];

  @OneToMany(
    () => IntStudyPlanCourse,
    (intStudyPlanCourse) => intStudyPlanCourse.studyPlan,
    { cascade: true }
  )
  intStudyPlanCourses: IntStudyPlanCourse[];
}
