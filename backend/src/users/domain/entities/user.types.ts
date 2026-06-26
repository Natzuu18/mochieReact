export interface User {
  id: string;
  email: string;
  fullName: string;
  orgName: string;
  role: string;
  createdDate: string;
}

export interface AuthUser{
    id:string,
    email: string,
}

export interface AuthSession {
  id: string;
  email: string;
  access_token: string;
  refresh_token: string;
}

export interface CreateUserProfileData {
  userId: string;
  fullName: string;
  orgName: string;
}


