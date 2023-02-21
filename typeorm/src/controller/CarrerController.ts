import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from "express";
import { Career } from '../entity/Career';

export class CareerController {
    private careerRepository = AppDataSource.getRepository(Career);

    async all(_request: Request, _response: Response, _next: NextFunction) {

        return this.careerRepository.find();
    };

    async oneById(_request: Request, _response: Response, _next: NextFunction) {
        const id = parseInt(_request.params.id);

        const career = await this.careerRepository.findOne({
            where: { id },
            relations: ["subjects"]
        });

        if (!career) {
            return ("Career not found");
        };
        return career;
    };

    async oneByName(_request: Request, _response: Response, _next: NextFunction) {
        const { name } = _request.params;

        const career = await this.careerRepository.findOne({
            where: name
        });

        if (!career) {
            return ("Career not found");
        };
        return career;
    };

    async save(_request: Request, _response: Response, _next: NextFunction) {
        const { name, semesters } = _request.body;
        const career = Object.assign(new Career(), {
            name,
            semesters
        });
        return this.careerRepository.save(career);
    };

};