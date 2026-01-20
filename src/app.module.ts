import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { AuthModule } from './auth/auth.module';
import { MongoModule } from './database/mongo/mongo.module';
import { UsersModule } from './modules/users/users.module';
import { MySqlModule } from './database/mysql/mysql.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { RedisModule } from './database/redis/redis.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }), AuthModule, MongoModule, UsersModule, MySqlModule, ProductModule, OrderModule, RedisModule, QueueModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
