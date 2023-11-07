import { Service } from "../../interfaces/service";
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import task from "../../routes/task";
import users from "../../routes/users";
import { AppDataSource } from "../../data-source";
import auth from "../../routes/auth";
import authenticateJWT from "../../middlewares/auth";

export default class Api implements Service {
    name: string;
    app: ReturnType<typeof express>;
    port: number;
    constructor() {
        this.name = "Api";
    }

    init(): void {
        this.port = process.env.NODE_PORT ? Number(process.env.NODE_PORT) : 3000;
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors())
        this.registerRoutes();
        console.log("Api initialized");
    }

    start(): void {
        AppDataSource.initialize().then(async () => {
            this.app.listen(this.port, () => {
                console.log(`Server running at http://localhost:${this.port}`);
            });
        }).catch(error => {
            console.log(error);
        });
        
    }

    stop(): void {
        throw new Error("Method not implemented.");
    }

    registerRoutes(): void {
        this.app.use('/auth', auth)
        this.app.use('/tasks', task);
        this.app.use('/users', users);

        this.app.use((err: Error, req: Request, res: Response, next: NextFunction): any => {
            console.error(err.stack);
            res.status(500).send('Something went wrong');
        });
    }
}