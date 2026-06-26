import { Inject,Injectable,BadRequestException,InternalServerErrorException } from "@nestjs/common";
import { extname } from "path";
import { UserRepository } from "../domain/repositories/user.repository";
import { CreateUserProfileData } from "../domain/entities/user.types";

@Injectable()
export class SupabaseUserRepository
  implements UserRepository {

  constructor(
    @Inject('SUPABASE')
    private readonly supabase: any,
  ) {}

  async createProfile(
    data: CreateUserProfileData,
  ) {

    const { error } =
      await this.supabase
        .from('users')
        .insert({
          user_id: data.userId,
          full_name: data.fullName,
          org_name: data.orgName,
        });

    if (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  async findById(id: string) {
    const { data } =
      await this.supabase
        .from('users')
        .select('*')
        .eq('user_id', id)
        .single();

    return data;
  }

  async getCurrentProfile(){
    const {data}=
    await this.supabase
      .from('users')
      .select('*')
      .single();

      return data;

  }
}