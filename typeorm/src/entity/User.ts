import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { Career } from "./Career";
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

    @Column({ default: false })
    isActive: boolean;

    @ManyToOne(type => Career, career => career.users)
    career: Career;

    @OneToMany(() => UserSubject, userSubject => userSubject.user, { cascade: true })
    subjects: UserSubject[];

};
