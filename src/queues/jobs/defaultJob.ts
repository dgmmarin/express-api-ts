import { Job } from "bullmq";

/**
 * Default worker
*/
export default async (job: Job) => {
    await job.log("Default worker started");
    await job.updateProgress(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await job.updateProgress(50);
    await job.log("Default worker in progress");
    await job.updateProgress(100);
    await job.log("Default worker completed");
}