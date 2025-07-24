import { Module } from '@nestjs/common';
import { UsersService } from './services/Admins/users.service';
import { UsersController } from './controllers/Admins/users.controller';
import { usersProviders } from './providers/users.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule ],
  
  controllers: [UsersController],
  providers: [...usersProviders,UsersService],
})
export class UsersModule {}
