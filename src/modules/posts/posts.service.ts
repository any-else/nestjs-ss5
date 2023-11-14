import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDTO } from './DTO/createPost.dto';
import { UpdatePostDTO } from './DTO/updatePostt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entity/Posts.entity';
import { Users } from '../users/entity/users.entity';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async getAllPostsService(): Promise<any> {
    try {
      // == cách lấy cả user_id
      // return await this.postsRepository.query('Select * from posts');

      // == Cách 2
      return await this.postsRepository.find({
        relations: ['user'],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException("Can't get posts", HttpStatus.BAD_REQUEST);
    }
  }
  async getPostByIdService(id: string): Promise<any> {
    try {
      // return this.postsRepository.findOneBy({ _id: id });
      return this.postsRepository.findOne({
        where: {
          id: Number(id),
        },
        relations: ['user'],
      });
    } catch (error) {}
  }

  async createPostService(post: CreatePostDTO) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: 1,
        },
      });
      const newPosts = {
        ...post,
        user: user,
      };

      await this.postsRepository.save(newPosts as any);
      return {
        message: 'thêm mới thành công',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException("Can't create post", HttpStatus.BAD_REQUEST);
    }
  }

  async updatePostService(id: string, post: UpdatePostDTO) {
    try {
      await this.postsRepository.update(id, post as any);

      return {
        message: 'Update thanh cong',
      };
    } catch (error) {
      throw new HttpException("Can't delete post", HttpStatus.BAD_REQUEST);
    }
  }

  async deletePostService(id: string) {
    try {
      await this.postsRepository.delete({ id: Number(id) });
      return {
        message: 'Xoa thanh cong',
      };
    } catch (error) {
      throw new HttpException("Can't delete post", HttpStatus.BAD_REQUEST);
    }
  }
}
