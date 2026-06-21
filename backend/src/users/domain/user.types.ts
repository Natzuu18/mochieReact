export interface User {
  id: string;
  email: string;
  fullName: string;
  orgName: string;
  role: string;
  createdDate: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface CreateUserProfileData {
  userId: string;
  fullName: string;
  role: string;
  orgName: string;
}