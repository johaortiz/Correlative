import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Career } from "./Career";
import { UserSubject } from "./UserSubject";

@Entity()
export class Subject {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idFromUniversity: number;

    @Column()
    name: string;

    @Column()
    semester: number;

    @Column()
    org: string;

    @Column("int", { array: true, default: [] })
    correlatives: number[];

    @Column()
    order: number;

    @ManyToOne(type => Career, career => career.subjects)
    career: Career;

    @OneToMany(type => UserSubject, userSubject => userSubject.subject, { cascade: true })
    userSubjects: UserSubject[];


};
