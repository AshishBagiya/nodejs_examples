import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}

    @Post()
    async createUser(@Body() data:CreateUserDto){
        return this.userService.create(data);
    }

    @Get()
    async findAll(@Query() query:QueryUserDto){
        return this.userService.findAll(query);
    }

    @Delete(':id')
    async softDelete(@Param(':id') id:string){
        return this.userService.softDelete(id);
    }
}
