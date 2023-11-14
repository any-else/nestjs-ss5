/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerService(newUser: RegisterUserDto): Promise<any> {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    try {
      //test xem email đã có ở server hay chưa

      // lưu vào db
      const user = await this.usersService.createUserService({
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword,
      });
      return {
        message: 'Tạo mới thành công',
        data: user,
      };
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') {
        throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Tạo mới không thành công ',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async loginService(user: LoginDto): Promise<any> {
    try {
      //bước 1: kiểm tra db và so sánh password
      const userCurrent = await this.usersService.getUserByEmail(user.email);
      console.log('User', userCurrent);
      const comparePassword = await bcrypt.compare(
        user.password,
        userCurrent.password,
      );

      console.log(comparePassword);
      if (!userCurrent || !comparePassword) {
        throw new HttpException(
          'Sai email hoặc password',
          HttpStatus.BAD_REQUEST,
        );
      }
      //bước 2 tạo token

      const token = await this.generateJwtToken(
        userCurrent.id,
        userCurrent.email,
      );
      console.log('token', token);

      const { password, ...rest } = userCurrent;

      return {
        user: rest,
        accessToken: token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Sai email hoặc password 2',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async generateJwtToken(id: number, email: string) {
    return await this.jwtService.signAsync({
      id: id,
      email: email,
    });
  }
}
