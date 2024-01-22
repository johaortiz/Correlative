import { CareerController } from "./controller/Career.controller";
import { CoursetController } from "./controller/Course.controller";
import { StudentController } from "./controller/Student.controller";
import { StudyPlanController } from "./controller/StudyPlan.controller";

export const Routes = [
  //Career Routes
  {
    method: "get",
    route: "/careers",
    controller: CareerController,
    action: "all",
  },
  {
    method: "post",
    route: "/careers/save",
    controller: CareerController,
    action: "save",
  },
  //StudyPlan Routes
  {
    method: "get",
    route: "/studyplans",
    controller: StudyPlanController,
    action: "all",
  },
  {
    method: "post",
    route: "/studyplans/save",
    controller: StudyPlanController,
    action: "save",
  },
  {
    method: "post",
    route: "/studyplans/assignsptc",
    controller: StudyPlanController,
    action: "assignStudyPlanToCareer",
  },
  //Student Routes
  {
    method: "get",
    route: "/students",
    controller: StudentController,
    action: "all",
  },
  {
    method: "get",
    route: "/students/findById/:studentId",
    controller: StudentController,
    action: "oneById",
  },
  {
    method: "post",
    route: "/students/save",
    controller: StudentController,
    action: "save",
  },
  {
    method: "post",
    route: "/students/assignstsp",
    controller: StudentController,
    action: "assignUserToStudyPlan",
  },
  //Course Routes
  {
    method: "get",
    route: "/courses",
    controller: CoursetController,
    action: "all",
  },
  {
    method: "post",
    route: "/courses/save",
    controller: CoursetController,
    action: "save",
  },
  {
    method: "post",
    route: "/courses/assignctsp",
    controller: CoursetController,
    action: "assignCourseToStudyPlan",
  },
  {
    method: "post",
    route: "/courses/assigncorrelations",
    controller: CoursetController,
    action: "assignCorrelations",
  },
];
