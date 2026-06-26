import {
  CreateUserProfileData,
  User,

} from '../entities/user.types';

export interface UserRepository {
  createProfile(
    data: CreateUserProfileData,
  ): Promise<void>;


  findById(
    id: string,
  ): Promise<User | null>;

getCurrentProfile(): Promise<User>;
}