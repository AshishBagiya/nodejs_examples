import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:User.name,schema:UserSchema}
    ]),QueueModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
