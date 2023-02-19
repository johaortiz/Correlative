import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { config } from "dotenv";

const { PORT } = config().parsed;


AppDataSource.initialize().then(async () => {

    const handleError = (err, req, res, next) => {
        res.status(err.statusCode || 500).send({ message: err.message });
    };

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next)
                res.json(result)
            } catch (error) {
                next(error)
            }
        })
    })
    const port: string | number = PORT || 3002;
    app.use(handleError);
    app.listen(port)


    console.log(`Express server has started on port ${PORT}.`)

}).catch(error => console.log(error))
