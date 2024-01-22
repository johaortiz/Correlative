import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Course } from "../entity/Course.entity";
import { StudyPlan } from "../entity/StudyPlan.entity";
import { IntStudyPlanCourse } from "../entity/IntStudyPlanCourse.entity";
import { IntStudyPlanStudent } from "../entity/IntStudyPlanStudent.entity";
import { Student } from "../entity/Student.entity";
import { IntStudentStatus } from "../entity/IntStudentStatus.entity";
import { IntCorrelation } from "../entity/IntCorrelation.entity";

export class CoursetController {
  private courseRepository = AppDataSource.getRepository(Course);
  private studyPlanRepository = AppDataSource.getRepository(StudyPlan);
  private intStudyPlanCourse = AppDataSource.getRepository(IntStudyPlanCourse);
  private intStudentStatus = AppDataSource.getRepository(IntStudentStatus);
  private intCorrelationRepository =
    AppDataSource.getRepository(IntCorrelation);

  async all(_request: Request, response: Response) {
    try {
      const courses: Course[] | undefined = await this.courseRepository.find({
        relations: ["studyPlans", "correlationsOf"],
      });
      response.status(200);
      return courses;
    } catch (error) {
      response.status(500);
      return { error };
    }
  }

  async save(request: Request, response: Response) {
    try {
      const { name } = request.body;
      const existingCourse: Course | undefined =
        await this.courseRepository.findOne({
          where: { name },
        });
      if (existingCourse) {
        response.status(400);
        return { error: "Ya existe una asignatura con ese nombre." };
      }
      const newCourse: Course | undefined = this.courseRepository.create({
        name,
      });
      await this.courseRepository.save(newCourse);
      response.status(200);
      return { success: "Asignatura creada correctamente." };
    } catch (error) {
      response.status(500);
      return { error };
    }
  }

  async assignCourseToStudyPlan(request: Request, response: Response) {
    try {
      const { studyPlanId, courseId } = request.body;

      const existingStudyPlan: StudyPlan = await this.studyPlanRepository
        .createQueryBuilder("studyPlan")
        .leftJoinAndSelect(
          "studyPlan.intStudyPlanStudents",
          "intStudyPlanStudents"
        )
        .leftJoinAndSelect("intStudyPlanStudents.student", "student")
        .leftJoinAndSelect(
          "studyPlan.intStudyPlanCourses",
          "intStudyPlanCourses"
        )
        .leftJoinAndSelect("intStudyPlanCourses.course", "course")
        .where("studyPlan.id = :studyPlanId", { studyPlanId: studyPlanId })
        .getOneOrFail();

      const existingCourse: Course = await this.courseRepository.findOneOrFail({
        where: { id: courseId },
      });

      const existingIntStudyPlanCourse = await this.intStudyPlanCourse.find({
        where: { course: existingCourse, studyPlan: existingStudyPlan },
      });

      const isCourseAlreadyAssigned: boolean =
        existingIntStudyPlanCourse.length > 0;

      if (isCourseAlreadyAssigned) {
        response.status(400);
        return {
          error:
            "La asignatura ya se encuentra asociada al plan de estudio seleccionado.",
        };
      }

      const intStudyPlanCourse: IntStudyPlanCourse = new IntStudyPlanCourse();
      intStudyPlanCourse.studyPlan = existingStudyPlan;
      intStudyPlanCourse.course = existingCourse;

      existingStudyPlan.intStudyPlanCourses.push(intStudyPlanCourse);
      await this.studyPlanRepository.save(existingStudyPlan);

      const intStudentStatuses: IntStudentStatus[] =
        existingStudyPlan.intStudyPlanStudents.map((student) => {
          const intStudentStatus: IntStudentStatus = new IntStudentStatus();
          intStudentStatus.studyPlanStudent = student;
          intStudentStatus.studyPlanCourse = intStudyPlanCourse;
          intStudentStatus.approved = false;
          intStudentStatus.regularized = false;
          return intStudentStatus;
        });
      await this.intStudentStatus.save(intStudentStatuses);

      response.status(200);
      return {
        success:
          "Se ha añadido la asignatura al plan de estudio correctamente.",
      };
    } catch (error) {
      response.status(500);
      return { error };
    }
  }

  async assignCorrelations(request: Request, response: Response) {
    try {
      const { idIntStudyPlanCourse, arrayIdsCourses } = request.body;
      const intStudyPlanCourse = await this.intStudyPlanCourse.findOne({
        where: { id: idIntStudyPlanCourse },
        relations: ["intCorrelations", "intCorrelations.course"],
      });

      if (!intStudyPlanCourse) {
        response.status(404);
        return { error: "Curso de plan de estudio no encontrado." };
      }

      // Obtener instancias de los cursos correlativos
      const correlatedCourses = await this.courseRepository
        .createQueryBuilder("course")
        .where("course.id IN (:...ids)", { ids: arrayIdsCourses })
        .getMany();

      // Verificar si alguno de los cursos correlativos ya está correlacionado
      const isAnyCorrelated = correlatedCourses.some((correlatedCourse) =>
        intStudyPlanCourse.intCorrelations.some(
          (existingCorrelation) =>
            existingCorrelation.course.id === correlatedCourse.id
        )
      );

      if (isAnyCorrelated) {
        response.status(400);
        return {
          error:
            "Al menos una de las asignaturas correlativas ya está correlacionada.",
        };
      }

      const isTheSameCourse = correlatedCourses.some(
        (correlatedCourse) => correlatedCourse.id === idIntStudyPlanCourse
      );
      if (isTheSameCourse) {
        response.status(400);
        return {
          error: "Una asignatura no puede ser correlativa de sí misma.",
        };
      }

      if (correlatedCourses.length < 1) {
        response.status(400);
        return {
          error:
            "No puede correlacionar materias inexistentes o intentar correlacionar \"nada\".",
        };
      }
      // Crear instancias de correlatividades
      const correlations = correlatedCourses
        .map((correlatedCourse) => {
          const correlation = new IntCorrelation();
          correlation.intStudyPlanCourse = intStudyPlanCourse;
          correlation.course = correlatedCourse;
          return correlation;
        })
        .filter((correlation) => correlation !== null);

      console.log(correlations);

      await this.intCorrelationRepository.save(correlations);

      response.status(200);
      return {
        success: "Correlatividades asignadas correctamente al curso.",
      };
    } catch (error) {
      console.log(error);
      response.status(500);
      return { error };
    }
  }
}
