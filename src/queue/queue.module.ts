import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { redisConnection } from "./redis.connection";
import { EmailProcessor } from "./processor/email.processor";

@Module({
    imports:[BullModule.forRoot({
        connection:redisConnection
    }),
BullModule.registerQueue({
    name:'email-queue'
})],
providers:[EmailProcessor],
exports:[BullModule]
})

export class QueueModule {}