import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() user: RegisterUserDto) {
    if (user.password !== user.confirmPassword) {
      throw new HttpException(
        'Password and confirm password are not match',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.authService.registerService(user);
  }

  @Post('/login')
  login(@Body() user: LoginDto) {
    return this.authService.loginService(user);
  }
}
