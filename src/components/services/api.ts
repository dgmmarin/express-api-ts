import { Service } from "../../interfaces/service";
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import task from "../../routes/task";
import users from "../../routes/users";
import { AppDataSource } from "../../data-source";
import auth from "../../routes/auth";
import authenticateJWT from "../../middlewares/auth";

const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { Queue: QueueMQ, Worker, QueueScheduler } = require('bullmq');

export default class Api implements Service {
    name: string;
    app: ReturnType<typeof express>;
    port: number;
    constructor() {
        this.name = "Api";
    }

    init(): void {
        const redisOptions = {
            port: 6379,
            host: process.env.REDIS_HOST ?? 'redis',
            // password: '',
            tls: false,
        };

        const createQueueMQ = (name: any) => new QueueMQ(name, { connection: redisOptions });
        const serverAdapter = new ExpressAdapter();
        serverAdapter.setBasePath('/ui');
        const exampleBullMq = createQueueMQ('BullMQ');
        createBullBoard({
            queues: [new BullMQAdapter(exampleBullMq)],
            serverAdapter,
        });

        createBullBoard({
            queues: [new BullMQAdapter(exampleBullMq)],
            serverAdapter,
        });


        this.port = process.env.NODE_PORT ? Number(process.env.NODE_PORT) : 3000;
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors())
        this.app.use('/ui', serverAdapter.getRouter());
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
        this.app.use('/users', authenticateJWT, users);

        this.app.use((err: Error, req: Request, res: Response, next: NextFunction): any => {
            console.error(err.stack);
            res.status(500).send('Something went wrong');
        });
    }
}