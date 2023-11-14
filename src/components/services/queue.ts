import { Process } from "../../interfaces/process";
import { Service } from "../../interfaces/service";
import Api from "./api";
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Job, Queue, Worker } from 'bullmq';
import path from "path";
import CustomWorker from "../../queues/customWorker";
import { DefaultQueue, EmailsQueue, OrdersQueue } from "../../interfaces/generic";

export default class QueueWorker implements Service {
    name: string;
    parent: Process;
    redisOptions: {};
    serverAdapter: ExpressAdapter;
    defaultWorker: CustomWorker;
    emailsWorker: CustomWorker;
    ordersWorker: CustomWorker;
    emailsQueue: Queue;
    ordersQueue: Queue;
    defaultQueue: Queue;

    constructor(parent: Process) {
        this.name = "Queue";
        this.parent = parent;
    }

    getEmailsQueue = (): Queue => this.emailsQueue;
    getOrdersQueue = (): Queue => this.ordersQueue;
    getDefaultQueue = (): Queue => this.defaultQueue;

    init(): void {
        console.log(`Initializing ${this.name} service`);
        this.redisOptions = {
            port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
            host: process.env.REDIS_HOST || 'localhost',
            password: '',
            tls: false,
        };
        this.serverAdapter = new ExpressAdapter();
        this.serverAdapter.setBasePath('/ui');
    }

    createQueues = (): void => {
        const serverAdapter = this.serverAdapter;
        this.defaultQueue = this.createQueueMQ(DefaultQueue);
        this.ordersQueue = this.createQueueMQ(OrdersQueue);
        this.emailsQueue = this.createQueueMQ(EmailsQueue);

        createBullBoard({
            queues: [
                new BullMQAdapter(this.defaultQueue),
                new BullMQAdapter(this.ordersQueue),
                new BullMQAdapter(this.emailsQueue),
            ],
            serverAdapter,
        });
        (this.parent.services["api"] as Api).app.use('/ui', serverAdapter.getRouter());
    }

    attachWorkerTpQueues = (): void => {
        this.defaultWorker = new CustomWorker(
            this, 
            DefaultQueue,
            path.join(__dirname, "..", "..", "queues/jobs/defaultJob.ts")
        );
        this.defaultWorker.init();

        this.ordersWorker = new CustomWorker(
            this, 
            OrdersQueue,
            path.join(__dirname, "..", "..", "queues/jobs/orderJob.ts")
        );
        this.ordersWorker.init();

        this.emailsWorker = new CustomWorker(
            this, 
            EmailsQueue,
            path.join(__dirname, "..", "..", "queues/jobs/emailJob.ts")
        );
        this.emailsWorker.init();
    }

    start(): void {
        this.createQueues();
        this.attachWorkerTpQueues()
        console.log(`Service ${this.name} started`)
    }

    stop(): void {
        throw new Error("Method not implemented.");
    }

    createQueueMQ = (name: any) => new Queue(name, { connection: this.redisOptions });
}