import { Job } from "bullmq";

/**
 * Email worker
*/
export default async (job: Job) => {
    await job.log("Email worker started");
    await job.updateProgress(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await job.updateProgress(50);
    await job.log("Email worker in progress");
    await job.updateProgress(100);
    await job.log("Email worker completed");
}