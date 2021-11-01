import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return user;
      }
    }
    return null;
  }

  /**
   * return all fields except password and a new accessToken (encoding all fields except password)
   * @param user
   */
  login(user: User) {
    // removing excluded fields and keeping only exposed fields
    const userData = classToPlain(user);
    // generating token
    const token = this.jwtService.sign(userData);
    return { ...userData, token };
  }
}
