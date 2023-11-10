import { Process } from "../../interfaces/process";
import { Service } from "../../interfaces/service";
import Api from "./api";

const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { Queue: QueueMQ, Worker, QueueScheduler } = require('bullmq');

export default class Queue implements Service {
    name: string;
    parent: Process;
    redisOptions: {};
    serverAdapter: any;

    constructor(parent: Process) {
        this.name = "Queue";
        this.parent = parent;
    }

    async init(): Promise<void> {
        console.log(`Initializing ${this.name} service`);
        this.redisOptions = {
            port: 6379,
            host: process.env.REDIS_HOST ?? 'redis',
            tls: false,
        };
        this.serverAdapter = new ExpressAdapter();
        this.serverAdapter.setBasePath('/ui');
    }

    createQueues = (): void => {
        const defaultQueue = this.createQueueMQ('default');
        const ordersQueue = this.createQueueMQ('orders');
        const emailsQueue = this.createQueueMQ('emails');
        const serverAdapter = this.serverAdapter;
        createBullBoard({
            queues: [
                new BullMQAdapter(defaultQueue), 
                new BullMQAdapter(ordersQueue),
                new BullMQAdapter(emailsQueue),
            ],
            serverAdapter,
        });
        (this.parent.services["api"] as Api).app.use('/ui', serverAdapter.getRouter());
    }

    start(): void {
        this.createQueues();
        console.log(`Service ${this.name} started`)
    }

    stop(): void {
        throw new Error("Method not implemented.");
    }

    createQueueMQ = (name: any) => new QueueMQ(name, { connection: this.redisOptions });
}