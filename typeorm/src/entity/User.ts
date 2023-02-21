import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { Career } from "./Career";
import { Subject } from "./Subject";
import { UserSubject } from "./UserSubject";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hashedEmail: string;

    @Column()
    username: string;

    @Column()
    hashedPassword: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(type => Career, career => career.users)
    career: Career;

    @ManyToMany(() => Subject, subject => subject.users)
    subjects: Subject[]

};
