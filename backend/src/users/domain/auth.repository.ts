import { AuthUser } from './user.types';

export interface AuthRepository {
  signUp(
    email: string,
    password: string,
  ): Promise<AuthUser>;

  login(
    email: string,
    password: string,
  ): Promise<AuthUser>;
}