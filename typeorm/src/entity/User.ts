import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
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

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(type => Career, career => career.users)
    career: Career;

    @OneToMany(() => UserSubject, userSubject => userSubject.user, { cascade: true })
    subjects: UserSubject[];

};
