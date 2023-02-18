import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Carrer {

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

    @Column()
    correlatives: number[];
};
