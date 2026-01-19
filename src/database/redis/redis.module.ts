import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as redisStore from "cache-manager-ioredis";
@Module(
    {
        imports:[CacheModule.registerAsync({
            inject:[ConfigService],
            useFactory:(config:ConfigService)=>({
                stores:redisStore,
                host:config.get('REDIS_HOST'),
                port:config.get('REDIS_PORT'),
                ttl:60, //default TTL in seconds
            }),
            isGlobal:true

        })]
    }
)

export class RedisModule {}