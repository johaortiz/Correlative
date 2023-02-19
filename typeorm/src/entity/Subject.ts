import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Career } from "./Career";

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

    @ManyToOne(type => Career, career => career.subjects)
    career: Career;

};
