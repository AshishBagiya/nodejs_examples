import KeyvRedis from "@keyv/redis";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
@Module(
    {
        imports:[CacheModule.registerAsync({
            inject:[ConfigService],
            useFactory:(config:ConfigService)=>{
                const host = config.get<string>('REDIS_HOST');
                const port = config.get<number>('REDIS_PORT');

                const url = `redis://${host ?? '127.0.0.1'}:${port ?? 6379}`;

                return {
                    // CacheModule expects a single store, not "stores"
                    store: new KeyvRedis(url),
                    ttl:60*1000,
                };
            },
            isGlobal:true
        })]
    }
)

export class RedisModule {}