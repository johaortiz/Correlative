import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity()
export class UserSubject {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    approved: boolean;

    @Column({ default: false })
    regularized: boolean;

};