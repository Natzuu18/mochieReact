import { Inject,Injectable,BadRequestException,UnauthorizedException } from "@nestjs/common";
import { AuthRepository } from "../domain/auth.repository";

@Injectable()
export class SupabaseAuthRepository
  implements AuthRepository {

  constructor(
    @Inject('SUPABASE')
    private readonly supabase: any,
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

    return {
      id: data.user.id,
      email: data.user.email,
    };
  }
}