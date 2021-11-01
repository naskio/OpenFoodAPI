import { PipeTransform, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  private readonly saltOrRounds: number = 12;

  async transform(value: CreateUserDto | UpdateUserDto) {
    if (!value.password) {
      return value;
    } else {
      return {
        ...value,
        password: await bcrypt.hash(value.password, this.saltOrRounds),
      };
    }
  }
}
