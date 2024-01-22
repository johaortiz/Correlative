import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IntStudyPlanStudent } from "./IntStudyPlanStudent.entity";
import { IntStudyPlanCourse } from "./IntStudyPlanCourse.entity";

@Entity()
export class IntStudentStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => IntStudyPlanStudent,
    (intStudyPlanStudent) => intStudyPlanStudent.coursesStatus,
    { cascade: true }
  )
  studyPlanStudent: IntStudyPlanStudent;

  @ManyToOne(
    () => IntStudyPlanCourse,
    (intStudyPlanCourse) => intStudyPlanCourse.studentsStatus,
    { cascade: true }
  )
  studyPlanCourse: IntStudyPlanCourse;

  @Column()
  approved: boolean;

  @Column()
  regularized: boolean;
}
