import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudyPlan } from "./StudyPlan.entity";
import { Course } from "./Course.entity";
import { IntCorrelation } from "./IntCorrelation.entity";
import { IntStudentStatus } from "./IntStudentStatus.entity";

@Entity()
export class IntStudyPlanCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.intStudyPlanCourses)
  studyPlan: StudyPlan;

  @ManyToOne(() => Course, (course) => course.studyPlans, { cascade: true })
  course: Course;

  @OneToMany(() => IntCorrelation, (intCorrelation) => intCorrelation.intStudyPlanCourse)
  intCorrelations: IntCorrelation[];

  @OneToMany(
    () => IntStudentStatus,
    (intStudentStatus) => intStudentStatus.studyPlanCourse
  )
  studentsStatus: IntStudentStatus;
}
