import KeyvRedis from "@keyv/redis";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
@Module(
    {
        imports:[CacheModule.registerAsync({
            inject:[ConfigService],
            useFactory:(config:ConfigService)=>({
                stores:new KeyvRedis({
                    host:config.get('REDIS_HOST'),
                    port:config.get('REDIS_PORT'),
                }),
                ttl:60*1000,
            }),
            isGlobal:true
        })]
    }
)

export class RedisModule {}