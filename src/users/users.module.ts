import { Module } from '@nestjs/common';
import { UsersService } from './services/Admins/users.service';
import { UsersController } from './controllers/Admins/users.controller';
import { usersProviders } from './providers/users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthSignInController, AuthSignUpController } from './controllers/Auth/auth.controller';
import { AuthService } from './services/Auth/auth.service';

@Module({
    imports: [DatabaseModule ,JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1d' },
    }),],
  
  controllers: [UsersController,AuthSignInController,AuthSignUpController],
  providers: [...usersProviders,UsersService,AuthService],
})
export class UsersModule {}
