import { Service } from "../../interfaces/service";
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import task from "../../routes/task";
import users from "../../routes/users";
import auth from "../../routes/auth";
import authenticateJWT from "../../middlewares/auth";
import getRequestedUser from "../../middlewares/getUserOnRequest";
import { Process } from "../../interfaces/process";

export default class Api implements Service {
    name: string;
    app: ReturnType<typeof express>;
    port: number;
    parent: Process;
    constructor(parent: Process) {
        this.name = "Api";
        this.parent = parent;
    }

    init(): void {
        this.port = process.env.NODE_PORT ? Number(process.env.NODE_PORT) : 3000;
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors())
        this.registerRoutes();
        console.log(`Initializing ${this.name} service`);
    }

    start(): void {
        this.app.listen(this.port, () => {
            console.log(`Service ${this.name} at http://localhost:${this.port}`);
        });
    }

    stop(): void {
        throw new Error("Method not implemented.");
    }

    registerRoutes(): void {
        this.app.use('/auth', auth)
        this.app.use('/users',authenticateJWT, users);
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction): any => {
            console.error(err.stack);
            res.status(500).send('Something went wrong');
        });
    }
}