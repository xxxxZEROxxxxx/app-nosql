import { Body, Controller, NotFoundException, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { Sign } from "crypto";
import { SignInDto, SignUpDto } from "src/users/dto/Auth/auth-user.dto";
import { Roles } from "src/users/guards/Roles.decorator";
import { UsersGuard } from "src/users/guards/users.guard";
import { UsersService } from "src/users/services/Admins/users.service";
import { AuthService } from "src/users/services/Auth/auth.service";
@Controller('sign-in')
export class AuthSignInController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  
  @Post()
  signIn(@Body(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true})) body:SignInDto) {

    return this.authService.signIn(body);
  }

 
}
@Controller('sign-up')
export class AuthSignUpController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signUp(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) body: SignUpDto) {
  
    return this.authService.signUp(body);
  }
}