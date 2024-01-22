import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { StudyPlan } from "../entity/StudyPlan.entity";
import { Career } from "../entity/Career.entity";

export class StudyPlanController {
  private studyPlanRepository = AppDataSource.getRepository(StudyPlan);
  private careerRepository = AppDataSource.getRepository(Career);

  async all(_request: Request, response: Response) {
    try {
      const studyPlans = await this.studyPlanRepository.find({
        relations: ["courses", "students"],
      });
      studyPlans.sort((a, b) => a.name.localeCompare(b.name));
      response.status(200);
      return studyPlans;
    } catch (error) {
      response.status(500);
      return { error: "Error al obtener los planes de estudio." };
    }
  }

  async save(request: Request, response: Response) {
    try {
      const { name } = request.body;
      const existingCareer = await this.studyPlanRepository.findOne({
        where: { name },
      });
      if (existingCareer) {
        response.status(400);
        return { error: "Ya existe una carrera con ese nombre." };
      }
      const newCareer = this.studyPlanRepository.create({ name });
      await this.studyPlanRepository.save(newCareer);
      return { success: "Plan de estudio añadido correctamente." };
    } catch (error) {
      console.error(error);
      response.status(500);
      return { error };
    }
  }

  async assignStudyPlanToCareer(request: Request, response: Response) {
    try {
      const { careerId, studyPlanId } = request.body;
      const existingCareer: Career | undefined =
        await this.careerRepository.findOne({
          where: { id: careerId },
          relations: ["studyPlans"],
        });
      const existingStudyPlan: StudyPlan | undefined =
        await this.studyPlanRepository.findOne({
          where: { id: studyPlanId },
        });
      if (!existingCareer || !existingStudyPlan) {
        response.status(400);
        return {
          error:
            "No se ha encontrado la carrera o el plan de estudio seleccionado.",
        };
      }
      const isStudyPlanAlreadyAssigned: boolean =
        existingCareer.studyPlans.some(
          (plan) => plan.id === existingStudyPlan.id
        );
      if (isStudyPlanAlreadyAssigned) {
        response.status(400);
        return {
          error:
            "El plan de estudio ya está asignado a la carrera seleccionada.",
        };
      }
      existingCareer.studyPlans.push(existingStudyPlan);
      await this.careerRepository.save(existingCareer);
      response.status(200);
      return {
        success: "Se asignó el plan de estudio a la carrera existosamente.",
      };
    } catch (error) {
      response.status(500);
      return { error };
    }
  }
}
