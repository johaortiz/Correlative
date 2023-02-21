import { CareerController } from "./controller/CarrerController";
import { SubjectController } from "./controller/SubjectController";
import { UserController } from "./controller/UserController";
import { UserSubjectController } from "./controller/UserSubjectController";

export const Routes = [
    //User's Routes
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all"
    }, {
        method: "get",
        route: "/users/findId/:id",
        controller: UserController,
        action: "oneById"
    }, {
        method: "get",
        route: "/users/findName/:username",
        controller: UserController,
        action: "oneByName"
    },
    {
        method: "post",
        route: "/users/save",
        controller: UserController,
        action: "save"
    }, {
        method: "get",
        route: "/users/validate",
        controller: UserController,
        action: "validate"
    }, {
        method: "post",
        route: "/users/login",
        controller: UserController,
        action: "login"
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "remove"
    },

    //Career's Routes
    {
        method: "get",
        route: "/careers",
        controller: CareerController,
        action: "all"
    }, {
        method: "get",
        route: "/careers/findId/:id",
        controller: CareerController,
        action: "oneById"
    }, {
        method: "get",
        route: "/careers/findName/:username",
        controller: CareerController,
        action: "oneByName"
    },
    {
        method: "post",
        route: "/careers/save",
        controller: CareerController,
        action: "save"
    },
    {
        method: "delete",
        route: "/careers/:id",
        controller: CareerController,
        action: "remove"
    },

    //Subject's Routes
    {
        method: "get",
        route: "/subjects",
        controller: SubjectController,
        action: "all"
    }, {
        method: "get",
        route: "/subjects/findId/:id",
        controller: SubjectController,
        action: "oneById"
    }, {
        method: "get",
        route: "/subjects/findName/:username",
        controller: SubjectController,
        action: "oneByName"
    },
    {
        method: "post",
        route: "/subjects/save",
        controller: SubjectController,
        action: "save"
    },
    {
        method: "delete",
        route: "/subjects/:id",
        controller: SubjectController,
        action: "remove"
    },

    //Table UserSubjects Route
    {
        method: "post",
        route: "/usersubject",
        controller: UserSubjectController,
        action: "subjectsFromStudent"
    }, {
        method: "post",
        route: "/usersubject/update",
        controller: UserSubjectController,
        action: "update"
    },

];