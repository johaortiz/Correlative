console.log("Inicializando.....");
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
require("dotenv").config();

const { PORT } = process.env;
const port: string | number = PORT || 3002;

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    const handleError = (err, _req, res, next) => {
        if (res.headersSent) {
            return next(err);
        }

        res.status(err.statusCode || 500).json({ error: err.message });
    };

    app.get("/", (req: Request, res: Response) => {
        res.send("Hola Mundo");
    });

    Routes.forEach(route => {
        app[route.method](route.route, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next);
                res.json(result);
            } catch (error) {
                next(error);
            }
        });
    });

    app.use(handleError);

    app.listen(port);

    console.log(`Express server has started on port ${PORT}.`);
}).catch(error => console.log(error));
