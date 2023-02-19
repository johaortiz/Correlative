import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({ unique: true })
    hashedEmail: string;

    @Column()
    @Index({ unique: true })
    username: string;

    @Column()
    hashedPassword: string;

    @Column("int", { array: true, default: [] })
    aprobedSubjects: number[];

    @Column("int", { array: true, default: [] })
    regularizatedSubjects: number[];

    @Column({ default: false })
    isActive: boolean;
};
