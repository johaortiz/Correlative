import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from "express";
import { Subject } from "../entity/Subject";
import { Career } from '../entity/Career';
import { UserSubject } from '../entity/UserSubject';
require("dotenv").config();

const { ADMIN_USERNAME } = process.env;

export class SubjectController {

    private subjectRepository = AppDataSource.getRepository(Subject);
    private careerRepository = AppDataSource.getRepository(Career);
    private userSubjectRepository = AppDataSource.getRepository(UserSubject);

    async all(_request: Request, _response: Response, _next: NextFunction) {

        const { username } = _request.body;
        if (username !== ADMIN_USERNAME) {
            return "Este usuario no tiene permisos para acceder a estos datos";
        };

        const findedSubjects = await this.subjectRepository.find({ relations: ["career"] });
        try {
            const filterefSubjects = findedSubjects.sort((a, b) => a.id - b.id).map(item => {
                return {
                    ...item,
                    career: item.career.name
                };
            });
            return filterefSubjects;
        } catch (error) {
            throw new Error("Algo salió mal");
        };
    };

    async oneById(_request: Request, _response: Response, _next: NextFunction) {
        const id = parseInt(_request.params.id);

        const subject = await this.subjectRepository.findOne({
            where: { id }
        });

        if (!subject) {
            return ("subject not found");
        };
        return subject;
    };

    async oneByName(_request: Request, _response: Response, _next: NextFunction) {
        const { name } = _request.params;

        const subject = await this.subjectRepository.findOne({
            where: name
        });

        if (!subject) {
            return ("subject not found");
        };
        return subject;
    };

    async save(_request: Request, _response: Response, _next: NextFunction) {
        const { idFromUniversity, name, semester, org, correlatives, careerId, order } = _request.body;

        const careerSelected = await this.careerRepository.findOne({
            where: { id: careerId },
            relations: ["users"]
        });

        const subjectDb = Object.assign(new Subject, {
            idFromUniversity,
            name,
            semester,
            org,
            correlatives,
            career: careerSelected,
            order
        });

        await this.subjectRepository.save(subjectDb);

        const userSubjects = careerSelected.users.map(user => {
            const userSubject = new UserSubject();
            userSubject.user = user;
            userSubject.subject = subjectDb;
            return userSubject;
        });

        await this.userSubjectRepository.save(userSubjects);

        return subjectDb;
    };

};