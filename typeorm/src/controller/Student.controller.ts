import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Student } from "../entity/Student.entity";
import { StudyPlan } from "../entity/StudyPlan.entity";
import { IntStudyPlanStudent } from "../entity/IntStudyPlanStudent.entity";
import { IntStudyPlanCourse } from "../entity/IntStudyPlanCourse.entity";
import { IntStudentStatus } from "../entity/IntStudentStatus.entity";

export class StudentController {
  private studentRepository = AppDataSource.getRepository(Student);
  private studyPlanRepository = AppDataSource.getRepository(StudyPlan);
  private intStudyPlanStudent =
    AppDataSource.getRepository(IntStudyPlanStudent);
  private intStudyPlanCourse = AppDataSource.getRepository(IntStudyPlanCourse);
  private intStudentStatusRepository =
    AppDataSource.getRepository(IntStudentStatus);

  async all(_request: Request, response: Response) {
    try {
      const allStudents: Student[] | undefined =
        await this.studentRepository.find();
      allStudents.sort((a, b) => a.name.localeCompare(b.name));
      response.status(200);
      return allStudents;
    } catch (error) {
      console.log(error);
      response.status(500);
      return { error };
    }
  }

  async oneById(request: Request, response: Response) {
    try {
      const { studentId } = request.params;
      const student = await this.studentRepository
        .createQueryBuilder("student")
        .where("student.id = :studentId", { studentId })
        .leftJoinAndSelect(
          "student.intStudyPlanStudents",
          "intStudyPlanStudent"
        )
        .leftJoinAndSelect("intStudyPlanStudent.studyPlan", "studyPlan")
        .leftJoinAndSelect("studyPlan.career", "career")
        .leftJoinAndSelect("intStudyPlanStudent.coursesStatus", "coursesStatus")
        .leftJoinAndSelect("coursesStatus.studyPlanCourse", "studyPlanCourse")
        .leftJoinAndSelect("studyPlanCourse.course", "course")
        .addSelect([
          "intStudyPlanStudent.id",
          "studyPlan.id",
          "studyPlan.name",
          "career.id",
          "career.name",
          "coursesStatus.id",
          "coursesStatus.approved",
          "coursesStatus.regularized",
          "studyPlanCourse.id",
          "course.id",
          "course.name",
        ])
        .leftJoinAndSelect("studyPlanCourse.intCorrelations", "intCorrelations")
        .leftJoinAndSelect("intCorrelations.course", "correlationCourse")
        .addSelect(["correlationCourse.id", "correlationCourse.name"])
        .getOneOrFail();

      if (!student) {
        response.status(400);
        return { error: "No se ha encontrado el estudiante." };
      }
      response.status(200);
      return student;
    } catch (error) {
      response.status(500);
      console.log(error);
      return { error };
    }
  }

  async save(request: Request, response: Response) {
    try {
      const { name } = request.body;
      const existingStudent: Student | undefined =
        await this.studentRepository.findOne({
          where: { name },
        });
      if (existingStudent) {
        response.status(400);
        return { error: "El nombre de usuario ya está en uso." };
      }
      const newStudent = this.studentRepository.create({ name });
      await this.studentRepository.save(newStudent);
      response.status(200);
      return { success: "Se ha creado exitosamente el usuario." };
    } catch (error) {
      response.status(500);
      return { error };
    }
  }

  async assignUserToStudyPlan(request: Request, response: Response) {
    try {
      const { studyPlanId, studentId } = request.body;

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

      const existingStudent: Student =
        await this.studentRepository.findOneOrFail({
          where: { id: studentId },
        });

      const existingIntStudyPlanStudent = await this.intStudyPlanStudent.find({
        where: { student: existingStudent, studyPlan: existingStudyPlan },
      });

      const isStudentAlreadyAssigned: boolean =
        existingIntStudyPlanStudent.length > 0;

      if (isStudentAlreadyAssigned) {
        response.status(400);
        return {
          error:
            "El alumno ya se encuentra asociado al plan de estudio seleccionado.",
        };
      }

      const intStudyPlanStudent: IntStudyPlanStudent =
        new IntStudyPlanStudent();
      intStudyPlanStudent.studyPlan = existingStudyPlan;
      intStudyPlanStudent.student = existingStudent;

      existingStudyPlan.intStudyPlanStudents.push(intStudyPlanStudent);
      await this.studyPlanRepository.save(existingStudyPlan);

      const filteredCoursesInIntStudyPlanCourse = await this.intStudyPlanCourse
        .createQueryBuilder("intStudyPlanCourse")
        .leftJoinAndSelect("intStudyPlanCourse.studyPlan", "studyPlan")
        .leftJoinAndSelect("intStudyPlanCourse.course", "course")
        .where("studyPlan.id = :studyPlanId", { studyPlanId: studyPlanId })
        .getMany();

      const filteredIntStudyPlanStudents = await this.intStudyPlanStudent
        .createQueryBuilder("intStudyPlanStudent")
        .leftJoinAndSelect("intStudyPlanStudent.student", "student")
        .leftJoinAndSelect("intStudyPlanStudent.studyPlan", "studyPlan")
        .where("student.id = :studentId", { studentId: studentId })
        .andWhere("studyPlan.id = :studyPlanId", { studyPlanId: studyPlanId })
        .getOneOrFail();

      const intStudentStatuses: IntStudentStatus[] = [];
      for (const intStudyPlanCourse of filteredCoursesInIntStudyPlanCourse) {
        const intStudentStatus: IntStudentStatus = new IntStudentStatus();
        intStudentStatus.studyPlanStudent = filteredIntStudyPlanStudents;
        intStudentStatus.studyPlanCourse = intStudyPlanCourse;
        intStudentStatus.approved = false;
        intStudentStatus.regularized = false;

        intStudentStatuses.push(intStudentStatus);
      }

      await this.intStudentStatusRepository.save(intStudentStatuses);

      response.status(200);
      return {
        success:
          "El alumno se ha inscripto satisfactoriamente al plan de estudio.",
      };
    } catch (error) {
      console.error(error);
      response.status(500);
      return { error };
    }
  }
}
