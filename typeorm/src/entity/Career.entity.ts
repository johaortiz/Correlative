import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { StudyPlan } from "./StudyPlan.entity";

@Entity()
export class Career {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => StudyPlan, (studyPlan) => studyPlan.career)
  studyPlans: StudyPlan[];
}
