import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  token: string;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (
      // request.headers.authorization ||
      request.headers.authorization?.startsWith('Bearer')
    ) {
      // "Bearer ldafhasjfhlsahflkasjflkasjfs;jdssf"
      this.token = request.headers.authorization.split(' ')[1] || '';
    }

    if (!this.token || this.token === '') {
      //check token bi rong hoac khong co
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    //verify token

    const decode = await this.jwtService.verifyAsync(this.token, {
      secret: this.configService.get('JWT_SECRET'),
    });

    //kiểm tra trong db xem có tồn tại hay không
    const userCurrent = await this.userService.getUserByEmail(decode.email);
    if (!userCurrent) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    // req 1 object => thêm mới key - value => object.key moi = value mới
    /**
     * const object = {
     * id: 1
     * }
     * object.name = "Vu"
     *
     * => {
     *  id: 1,
     *  name: "Vu"
     * }
     * => req['user'] = value
     * user abc
     */

    request['user'] = userCurrent;
    return true;
  }
}
