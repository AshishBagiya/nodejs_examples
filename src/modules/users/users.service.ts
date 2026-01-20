import { InjectQueue } from '@nestjs/bullmq';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bullmq';
import type { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel:Model<UserDocument>,
        @Inject(CACHE_MANAGER) private cacheManager:Cache,
        @InjectQueue('email-queue') private readonly emailQueue:Queue,
    ){}

    async create(dto:CreateUserDto){
        const result = this.userModel.create(dto);
        await this.emailQueue.add('send-welcome-email',{email:dto.email,role:dto?.role},{attempts:3,backoff:{type:'exponential',delay:2000}});
        return result;
    }

    async findAll(query:QueryUserDto){

        const page = (query.page) || 1;
        const limit = (query.limit) || 20;
        const skip = (page - 1) * limit ;

        const filter:any = {isDeleted : false};
        if(query.role) filter.role = query.role;
 
        // const cacheKey = `user:${JSON.stringify(query)}`;
        // const result = await this.cacheManager.get(cacheKey);
        // if(result) return result;

        const [data, total] = await Promise.all([
            this.userModel.find(filter).limit(limit).skip(skip),
            this.userModel.countDocuments(filter),
        ]);

        // await this.cacheManager.set(cacheKey,data,60);
        return {
            data,
            pagination:{
                total, page, limit,
            }
        }
    }

    async softDelete(id:string){
        const result = this.userModel.findByIdAndUpdate(id,{isDeleted:true},{new:true});

        // invalidate cache user data
        await this.cacheManager.del(`user:${id}`);
        return result;
    }
    async getUserStat(){
        return this.userModel.aggregate(
            [
                {$match:{isDeleted:false}},
                {$project:{_id:'$role',count:{$sum:1}}}
            ]
        )
    }

    async findById(id:string){
        const cacheKey = `user:${id}`;

        // check cache
        const cacheUser = await this.cacheManager.get(cacheKey);

        if(cacheUser) return cacheUser;

        // fetch from db
        const user = await this.userModel.findById(id).lean();
        if(!user) throw new Error('user data does not exist');
        // cache user in redis
        await this.cacheManager.set(cacheKey,user,60);
        return user;
    }
}
