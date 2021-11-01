import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { HashPasswordPipe } from './users/pipes/hash-password.pipe';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { User } from './users/entities/user.entity';
import { classToPlain, plainToClass } from 'class-transformer';
import * as _ from 'lodash';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('test-auth')
  getHelloAuth(): string {
    return this.appService.getHello();
  }

  @Post('register')
  async register(@Body(HashPasswordPipe) createUserDto: CreateUserDto) {
    const createdUser: User = await this.usersService.create(createUserDto);
    return this.authService.login(createdUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(
      plainToClass(User, req.user, { excludeExtraneousValues: true }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return plainToClass(User, req.user, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(
    @Request() req,
    @Body(HashPasswordPipe) updateUserDto: UpdateUserDto,
  ) {
    const updatedUser: User = await this.usersService.update(
      req.user.id,
      updateUserDto,
    );
    const user: User = plainToClass(
      User,
      {
        ...req.user,
        ..._.omitBy(classToPlain(updatedUser), _.isNil),
      },
      {
        excludeExtraneousValues: true,
      },
    );
    return this.authService.login(user);
  }
}
