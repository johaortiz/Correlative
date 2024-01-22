import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Career } from "../entity/Career.entity";

export class CareerController {
  private careerRepository = AppDataSource.getRepository(Career);

  async all(_request: Request, response: Response) {
    try {
      const careers = await this.careerRepository.find({
        relations: ["studyPlans", "studyPlans.intStudyPlanStudents", "studyPlans.intStudyPlanCourse"],
      });
      careers.sort((a, b) => a.name.localeCompare(b.name));
      response.status(200);
      return careers;
    } catch (error) {
      response.status(500);
      return { error };
    }
  }

  async save(request: Request, response: Response) {
    try {
      const { name } = request.body;
      const existingCareer = await this.careerRepository.findOne({
        where: { name },
      });
      if (existingCareer) {
        response.status(400);
        return { error: "Ya existe una carrera con ese nombre." };
      }
      const newCareer = this.careerRepository.create({ name });
      await this.careerRepository.save(newCareer);
      return { success: "Carrera añadida correctamente." };
    } catch (error) {
      console.error(error);
      response.status(500);
      return { error: "Error al añadir la carrera." };
    }
  }
}
