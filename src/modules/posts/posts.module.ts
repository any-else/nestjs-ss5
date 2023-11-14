import { Module } from '@nestjs/common';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { Posts } from './entity/Posts.entity';
import { Users } from '../users/entity/users.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Posts, Users]), UsersModule],
  controllers: [PostsController],
  providers: [
    {
      provide: 'PostService',
      useClass: PostsService, //tiện lợi cho việc viết test
    },
    // PostsService,
  ],
})
export class PostsModule {}
