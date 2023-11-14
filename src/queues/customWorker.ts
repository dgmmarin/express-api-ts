/* eslint-disable @typescript-eslint/no-explicit-any */
import { Worker } from "bullmq";
import QueueWorker from "../components/services/queue";
export default class CustomWorker {
  queueName: string;
  workerPath: string;
  parent: QueueWorker;
  worker: Worker<any, any, string>;
  constructor(parent: QueueWorker, queueName: string, workerPath: string) {
    this.queueName = queueName;
    this.workerPath = workerPath;
    this.parent = parent;
  }

  init(): void {
    this.worker = new Worker(this.queueName, this.workerPath, {
      connection: this.parent.redisOptions,
      concurrency: 1,
    });

    this.worker.on("completed", (job) => {
      console.log(`Job with id ${job.id} has been completed`);
    });

    this.worker.on("failed", (job, err) => {
      console.log(`Job with id ${job?.id} has been failed`);
      console.log(err);
    });

    this.worker.on("error", (err) => {
      console.log(`Error: ${err}`);
    });

    this.worker.on("active", (job) => {
      console.log(`Job with id ${job.id} is active`);
    });

    this.worker.on("stalled", (jobId, prev) => {
      console.log(`Job with id ${jobId} is stalled`);
      console.log(`Previous status: ${prev}`);
    });

    this.worker.on("progress", (job, progress) => {
      console.log(`Job with id ${job.id} is ${progress}% ready!`);
    });
  }

  async stop(): Promise<void> {
    await this.worker.close();
  }
}
