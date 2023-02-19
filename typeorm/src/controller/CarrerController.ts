import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { Carrer } from '../entity/Career'

export class Career {
    private careerRepository = AppDataSource.getRepository(Carrer);

    async all(_request: Request, _response: Response, _next: NextFunction) {
        return this.careerRepository.find()
    };

    async oneById(_request: Request, _response: Response, _next: NextFunction) {
        const id = parseInt(_request.params.id)


        const career = await this.careerRepository.findOne({
            where: { id }
        })

        if (!career) {
            return ("unregistered user");
        }
        return career
    }

    async oneByName(_request: Request, _response: Response, _next: NextFunction) {
        const { name } = _request.params;

        const career = await this.careerRepository.findOne({
            where: name
        })

        if (!career) {
            return ("unregistered user");
        }
        return career
    }

    async save(_request: Request, _response: Response, _next: NextFunction) {
        const { name, semesters } = _request.body;



    };

};