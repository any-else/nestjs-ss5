import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './DTO/createUser.dto';
import { UpdateUserDTO } from './DTO/updateUser.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllUsers(@Req() req) {
    console.log('req user', req.user);
    console.log('test get all user');
    return this.usersService.getAllUserService();
  }

  @Get('/:id')
  getByIdUser(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.usersService.createUserService(body);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.usersService.updateUserService(Number(id), body);
  }
}
