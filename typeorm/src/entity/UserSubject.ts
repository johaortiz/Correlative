import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Subject } from "./Subject";
import { User } from "./User";


@Entity()
export class UserSubject {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.subjects)
    user: User;

    @ManyToOne(() => Subject, subject => subject.userSubjects)
    subject: Subject;

    @Column({ default: false })
    approved: boolean;

    @Column({ default: false })
    regularized: boolean;

};