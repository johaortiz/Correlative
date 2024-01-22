import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudyPlan } from "./StudyPlan.entity";
import { Student } from "./Student.entity";
import { IntStudentStatus } from "./IntStudentStatus.entity";

@Entity()
export class IntStudyPlanStudent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.intStudyPlanStudents)
  studyPlan: StudyPlan;

  @ManyToOne(() => Student, (student) => student.intStudyPlanStudents)
  student: Student;

  @OneToMany(
    () => IntStudentStatus,
    (intStudentStatus) => intStudentStatus.studyPlanStudent
  )
  coursesStatus: IntStudentStatus[];
}
