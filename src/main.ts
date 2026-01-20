import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cluster from 'cluster';
import os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('app.port') || 3000);
  console.log(`Server is running on port ${configService.get('app.port') || 3000}`);
}

if(cluster.isPrimary){
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  } 
}else{
  bootstrap();
}
