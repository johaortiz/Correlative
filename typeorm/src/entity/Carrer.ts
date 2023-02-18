import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Carrer {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    semesters: number
};
