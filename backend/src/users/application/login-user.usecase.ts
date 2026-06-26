import {
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { LoginUserInput } from './inputs/login-user.input';
import type { AuthRepository } from '../domain/repositories/auth.repository';

@Injectable()
export class LoginUserUseCase{
    constructor(
    
        @Inject('AuthRepository') private readonly authRepository: AuthRepository,
    ){}

    async execute(input : LoginUserInput){
        const authUser = await this.authRepository.login(
        input.email,
        input.password,
        );

        
     return authUser;
    }
   
}