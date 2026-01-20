import { WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

export class EmailProcessor extends WorkerHost{
    async process(job: Job, token?: string) {
        console.log('Processing Email Job :',job.data);
          // Simulate email sending
        await new Promise(res => setTimeout(res, 2000));
        return {status:'EMAIL_SENT'}
    }
    
}