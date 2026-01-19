import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type {Cache} from 'cache-manager';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel:Model<UserDocument>,
        @Inject(CACHE_MANAGER) private cacheManager:Cache,
    ){}

    async create(dto:CreateUserDto){
        return this.userModel.create(dto);
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
