import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){

    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto){
        return this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

    @Get('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    async admin(){
        return {message: 'Admin route accessed successfully'};
    }
}
