import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDTO } from './createPost.dto';

export class UpdatePostDTO extends PartialType(CreatePostDTO) {}
