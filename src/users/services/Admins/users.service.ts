import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../dto/Admins/create-user.dto';
import { UpdateUserDto } from '../../dto/Admins/update-user.dto';
import { UsersModule } from '../../users.module';
import { isValidObjectId, Model } from 'mongoose';
import { User } from '../../interfaces/interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('User_MODEL')
    private userModel: Model<User>,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdCat = new this.userModel(createUserDto);
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    return createdCat.save();
  }

  async findAll(): Promise<{ data: User[], count: number, status: number }> {
    const users = await this.userModel.find().select(' -__v ');
    if (!users.length) {
      throw new ConflictException('No users found');
    }
    return { data: users, count: users.length, status: 200 };
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    const user = await this.userModel.findById(id).select('-_id -__v ').exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<{ message: string, user: User }> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    }).select('_id -__v ').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'User updated successfully', user: user
    };
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return 'User deleted successfully';
  }
}
