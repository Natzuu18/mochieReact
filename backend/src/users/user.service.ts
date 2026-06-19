import {
  BadRequestException,
  InternalServerErrorException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';


@Injectable()
export class UserService{
    constructor(
         @Inject('SUPABASE') private supabase:any,
    ){}

  async register(dto: any) {
    if (!dto.email || !dto.password || !dto.organizationName) {
      throw new BadRequestException(
        'Email, password, and organizationName are required',
      );
    }

    const { data, error } = await this.supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    const userId = data.user?.id;

    if (!userId) {
      throw new InternalServerErrorException('Supabase did not return a user id');
    }

    const { error: profileError } = await this.supabase.from('users').insert({
      user_id: userId,
      org_name: dto.organizationName,
    });

    if (profileError) {
      throw new BadRequestException(profileError.message);
    }

    return data.user;
  }

async login(dto:any) {
  if (!dto.email || !dto.password) {
    throw new BadRequestException('Email and password are required');
  }

  const { data, error } = await this.supabase.auth.signInWithPassword({
    email: dto.email,
    password: dto.password,
  });

  if (error) {
    throw new UnauthorizedException(error.message);
  }


  return data;
  
}

}
