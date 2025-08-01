import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from '../../services/Admins/users.service';
import { CreateUserDto } from '../../dto/Admins/create-user.dto';
import { UpdateUserDto } from '../../dto/Admins/update-user.dto';
import { Roles } from '../../guards/Roles.decorator';
import { UsersGuard } from 'src/users/guards/users.guard';

@Controller('users')
@UseGuards(UsersGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
@Roles(['admin'])
@Post()
  create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Roles(['admin','manager'])
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
@Roles(['admin','manager'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Roles(['admin','manager'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
@Roles(['admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
