import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel:Model<UserDocument>,
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
 
        const [data, total] = await Promise.all([
            this.userModel.find(filter).limit(limit).skip(skip),
            this.userModel.countDocuments(filter),
        ]);

        return {
            data,
            pagination:{
                total, page, limit,
            }
        }
    }

    async softDelete(id:string){
        return this.userModel.findByIdAndUpdate(id,{isDeleted:true},{new:true});
    }
    async getUserStat(){
        return this.userModel.aggregate(
            [
                {$match:{isDeleted:false}},
                {$project:{_id:'$role',count:{$sum:1}}}
            ]
        )
    }
}
