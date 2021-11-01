import { Gender } from '../entities/user.entity';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  last_name: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password too weak, at least 1 uppercase, 1 lowercase and 1 number',
  })
  password: string;
}
