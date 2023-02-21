import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Subject } from "./Subject";
import { User } from "./User";

@Entity()
export class Career {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    semesters: number;

    @OneToMany(type => Subject, subject => subject.career)
    subjects: Subject[];

    @OneToMany(type => User, user => user.career)
    users: User[];

};
