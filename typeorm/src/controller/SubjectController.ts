import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from "express";
import { Subject } from "../entity/Subject";
import { Career } from '../entity/Career';


export class SubjectController {

    private subjectRepository = AppDataSource.getRepository(Subject);
    private careerRepository = AppDataSource.getRepository(Career);

    async all(_request: Request, _response: Response, _next: NextFunction) {
        return this.subjectRepository.find({ relations: ["career"] });
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
        const { idFromUniversity, name, semester, org, correlatives, careerId } = _request.body;

        const career = await this.careerRepository.findOne({
            where: { id: careerId }
        });

        const subject = Object.assign(new Subject, {
            idFromUniversity,
            name,
            semester,
            org,
            correlatives,
            career
        });

        return this.subjectRepository.save(subject);

    };

};