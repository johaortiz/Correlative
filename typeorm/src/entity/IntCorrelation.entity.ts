import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { IntStudyPlanCourse } from "./IntStudyPlanCourse.entity";
import { Course } from "./Course.entity";

@Entity()
export class IntCorrelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => IntStudyPlanCourse,
    (intStudyPlanCourse) => intStudyPlanCourse.intCorrelations,
    { cascade: true }
  )
  intStudyPlanCourse: IntStudyPlanCourse;

  @ManyToOne(() => Course, (course) => course.intCorrelation, { cascade: true })
  course: Course;
}
