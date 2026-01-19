import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private users: any[] = [];

    constructor(private readonly jwtService:JwtService){

    }

    async register(registerDto: any){
        const hashedPassword= await bcrypt.hash(registerDto.password, 10);

        const user = {
            id: Date.now().toString(),
            email: registerDto.email,
            password: hashedPassword,
            role: registerDto.role || 'user',
        };

        this.users.push(user);

        return {
            message: 'User registered successfully',
        };
    }

    async login(loginDto:any){
        const user = this.users.find(u => u.email === loginDto.email);
        if(!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return {access_token : this.jwtService.sign(payload)};

    }
}
