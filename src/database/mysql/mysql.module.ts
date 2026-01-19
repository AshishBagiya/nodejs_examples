import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
        inject:[ConfigService],
        useFactory:(config:ConfigService)=>({
            type:'mysql',
            host:config.get('mysql.host'),
            port:config.get<number>('mysql.port'),
            username:config.get('mysql.username'),
            password:config.get('mysql.password'),
            database:config.get('mysql.database'),
            synchronize:true,
            autoLoadEntities:true
        })
    })]
})

export class MySqlModule{}