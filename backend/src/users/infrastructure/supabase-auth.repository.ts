import { Inject, Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from '../domain/repositories/auth.repository';

@Injectable()
export class SupabaseAuthRepository
  implements AuthRepository {

  constructor(
    @Inject('SUPABASE')
    private readonly supabase: any,
    private readonly configService: ConfigService,
  ) {}

  async signUp(
    email: string,
    password: string,
  ) {
    const { data, error } =
      await this.supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      throw new BadRequestException(
        error.message,
      );
    }

    return {
      id: data.user.id,
      email: data.user.email,
    };
  }

  async login(
    email: string,
    password: string,
  ) {
    const { data, error } =
      await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw new UnauthorizedException(
        error.message,
      );
    }

    if (!data.session) {
      throw new UnauthorizedException(
        'Missing authentication session',
      );
    }

    return {
      id: data.user.id,
      email: data.user.email,
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    };
  }


}
