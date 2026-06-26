import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

import type { Request, Response } from 'express';

import { RegisterUserUseCase } from '../application/register-user.usecase';
import { LoginUserUseCase } from '../application/login-user.usecase';
import { GetUserUseCase } from '../application/get-user.usecase';

import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {

  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly getUserUseCase : GetUserUseCase,
  ) {}

  @Post('register')
  async register(
    @Body() dto: RegisterUserDto,
  ) {

    return this.registerUserUseCase.execute({
      email: dto.email,
      password: dto.password,
      fullName: dto.fullName,
      role: dto.role,
      orgName: dto.orgName,
    });

  }

  @Post('login')
  async login(
    @Body() dto: LoginUserDto,
     @Res({ passthrough: true }) res: Response,
  ){
     const auth = await this.loginUserUseCase.execute({
    email: dto.email,
    password: dto.password,
  });

  res.cookie('access_token', auth.access_token, {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60, // 1 hour
  });

  res.cookie('refresh_token', auth.refresh_token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  return {
    id: auth.id,
    email: auth.email,
  };
  }

  @Get('me')
  async getCurrentUser(
    @Req() req: Request,
  ){
    const user =await this.getUserUseCase.execute(
      req.cookies.id
    );

  return user;
  }


}
