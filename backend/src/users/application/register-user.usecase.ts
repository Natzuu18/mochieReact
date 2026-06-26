import {
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import type { AuthRepository } from '../domain/repositories/auth.repository';
import type { UserRepository } from '../domain/repositories/user.repository';
import type { RegisterUserInput } from './inputs/register-user.input';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,

    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: RegisterUserInput) {

    const authUser =
      await this.authRepository.signUp(
        input.email,
        input.password,
      );

    await this.userRepository.createProfile({
      userId: authUser.id,
      fullName: input.fullName,
      orgName: input.orgName,
    });

    return authUser;
  }
}