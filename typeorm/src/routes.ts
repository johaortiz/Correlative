import { UserController } from "./controller/UserController";

export const Routes = [
    //Users Routes
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
    }

    //Careers Routes

];