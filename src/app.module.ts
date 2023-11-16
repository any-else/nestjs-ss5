import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './modules/posts/entity/Posts.entity';
import { Users } from './modules/users/entity/users.entity';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'vuvanbui@18',
      database: 'learn-nestjs',
      entities: [Posts, Users],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
