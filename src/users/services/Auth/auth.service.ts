import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { isValidObjectId, Model } from "mongoose";
import { SignInDto, SignUpDto } from "src/users/dto/Auth/auth-user.dto";
import { User } from "src/users/interfaces/interface";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('User_MODEL')
    private userModel: Model<User>,
  ) {}

  async signIn(body:SignInDto) {
        const { email, password } = body;

   
const user = await this.userModel.findOne({ email }).select('+password');
      if (!user) {
      throw new NotFoundException('Email not found');
    }
    const hashPassword = user.password;
    const isMatch = await bcrypt.compare(password,hashPassword );
    if (!isMatch) {
      throw new NotFoundException(' password is incorrect');
    }
    return { user, message: 'Sign in successful' };
  
  }
  async signUp(body:SignUpDto):Promise<{user: User, message: string}> {
      const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      throw new NotFoundException('All fields are required');
    }
   
    const existingUser = await this.userModel.find({email: email});
    // console.log(existingUser);
    if (existingUser.length > 0) {
      throw new NotFoundException('Email already exists');
    }
     const saltOrRounds = 10;
     const hashPassword = await bcrypt.hash(password, saltOrRounds);
     
    const user =await this.userModel.create({firstName, lastName, email, password:hashPassword});
    return {user, message: 'Sign up successful'};
  }
}