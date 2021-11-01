import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Create or update a User
   * @param userData
   */
  private async save(userData: User): Promise<User> {
    try {
      return await this.usersRepository.save(userData);
    } catch (e) {
      if (e.message.includes(`Duplicate entry '${userData.email}'`)) {
        throw new BadRequestException(
          `The email '${userData.email}' has been already used.`,
        );
      }
      throw e;
    }
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.save(plainToClass(User, createUserDto));
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.save(plainToClass(User, { id, ...updateUserDto }));
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }
}
