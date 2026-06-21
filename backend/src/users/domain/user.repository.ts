import {
  CreateUserProfileData,
  User,
} from './user.types';

export interface UserRepository {
  createProfile(
    data: CreateUserProfileData,
  ): Promise<void>;

  findById(
    id: string,
  ): Promise<User | null>;
}