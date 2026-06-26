import {
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import type { UserRepository } from '../domain/repositories/user.repository';

import { GetUserInput } from './inputs/get-user.input';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ){}
  async execute(input: GetUserInput){
    const getUserData = await this.userRepository.getCurrentProfile();

    return getUserData;
  }
 
}