import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [PassportModule,ConfigModule,JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(configService:ConfigService) => ({
      secret: configService.get('jwt.secret'),
      signOptions: { expiresIn: configService.get('jwt.expiresIn') },
    }),
  })],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,RolesGuard]
})
export class AuthModule {}
