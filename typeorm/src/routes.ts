import { UserController } from "./controller/UserController"

export const Routes = [
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
        method: "post",
        route: "/users/login",
        controller: UserController,
        action: "login"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "remove"
    }
]