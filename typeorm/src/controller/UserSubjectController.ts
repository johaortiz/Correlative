import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from "express";
import { UserSubject } from '../entity/UserSubject';

export class UserSubjectController {

    private userSubjectRepository = AppDataSource.getRepository(UserSubject);

    async subjectsFromStudent(_request: Request, _response: Response, _next: NextFunction) {
        const { userId } = _request.body;

        const allSubjects = await this.userSubjectRepository.find({
            relations: ["user", "subject"]
        });

        const findedSubjects = allSubjects.filter(table => table.user.id === userId).map(table => {
            return {
                tableId: table.id,
                idFromUniversity: table.subject.idFromUniversity,
                approved: table.approved,
                regularized: table.regularized,

            };
        });

        if (findedSubjects.length < 1) {
            return "No se encontraron registros del Usuario"
        };

        return findedSubjects;

    };

    async update(_request: Request, _response: Response, _next: NextFunction) {

        const updates = _request.body; // Array of objects with `tableId`, `approved`, and `regularized` properties

        const promises = updates.data.map(({ tableId, approved, regularized }) =>
            this.userSubjectRepository.update(tableId, { approved, regularized })
        );
        await Promise.all(promises);

        return "Materias Actualizadas Correctamente";

    };

};