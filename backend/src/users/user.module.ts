import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './application/register-user.usecase';
import { GetUserUseCase } from './application/get-user.usecase';
import { SupabaseAuthRepository } from './infrastructure/supabase-auth.repository';
import { SupabaseUserRepository } from './infrastructure/supabase-user.repository';
import { UserController } from './presentation/user.controller';
import { LoginUserUseCase } from './application/login-user.usecase';

@Module({
  controllers: [UserController],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    GetUserUseCase,
    {
      provide: 'AuthRepository',
      useClass: SupabaseAuthRepository,
    },

    {
      provide: 'UserRepository',
      useClass: SupabaseUserRepository,
    },
  ],
})
export class UserModule {}
