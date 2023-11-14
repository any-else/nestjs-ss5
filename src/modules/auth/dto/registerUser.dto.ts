import {
  IsString,
  MinLength,
  IsNotEmpty,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { IsGmailEmail } from '../../../decorators/email.decorator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsGmailEmail({
    message: 'Email không hợp lệ',
  })
  email: string;

  @MaxLength(255)
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password is too short',
  })
  password: string;

  @MaxLength(255)
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password is too short',
  })
  confirmPassword: string;
}
