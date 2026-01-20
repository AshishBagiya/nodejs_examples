import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import * as path from 'path';

@Injectable()
export class WorkerService {

  runHeavyTask(number: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(
        path.join(__dirname, 'worker.js'),
        { workerData: number },
      );

      worker.on('message', resolve);
      worker.on('error', reject);
    });
  }
}
