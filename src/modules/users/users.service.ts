import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './DTO/createUser.dto';
import { UpdateUserDTO } from './DTO/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  // lấy tất cả user
  async getAllUserService(): Promise<any> {
    return await this.usersRepository.find();
  }
  // lấy theo id user

  async getUserById(id: number): Promise<any> {
    return await this.usersRepository.findOne({
      where: {
        id: id,
      },
      relations: ['posts'],
    });
  }

  // tạo mới user
  async createUserService(user: CreateUserDTO): Promise<any> {
    return await this.usersRepository.save(user);
  }

  //update user
  async updateUserService(id: number, user: UpdateUserDTO): Promise<any> {
    return await this.usersRepository.update(id, user);
  }

  //delete user
  async deleteUserService(id: number): Promise<any> {
    return await this.usersRepository.delete(id);
  }

  // get user by email
  async getUserByEmail(email: string): Promise<any> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
