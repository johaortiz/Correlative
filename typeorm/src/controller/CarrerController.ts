import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from "express";
import { Career } from '../entity/Career';

export class CareerController {
    private careerRepository = AppDataSource.getRepository(Career);

    async all(_request: Request, _response: Response, _next: NextFunction) {

        const carrers = await this.careerRepository.find();
        carrers.sort((a, b) => a.id - b.id);

        return carrers;
    };

    async oneById(_request: Request, _response: Response, _next: NextFunction) {
        const id = parseInt(_request.params.id);

        const career = await this.careerRepository.findOne({
            where: { id },
            relations: ["subjects"]
        });

        if (!career) {
            return "Carrera no Encontrada";
        };

        career.subjects.sort((a, b) => a.order - b.order);
        return career;
    };

    async oneByName(_request: Request, _response: Response, _next: NextFunction) {
        const { name } = _request.params;

        const career = await this.careerRepository.findOne({
            where: name
        });

        if (!career) {
            return ("Carrera no Encontrada");
        };
        career.subjects.sort((a, b) => a.order - b.order);
        return career;
    };

    async save(_request: Request, _response: Response, _next: NextFunction) {
        const { name, semesters } = _request.body;
        try {
            const career = Object.assign(new Career(), {
                name,
                semesters
            });
            await this.careerRepository.save(career);
            return "Carrera Añadida Correctamente";
        } catch (error) {
            throw new Error(error);
        };
    };
};