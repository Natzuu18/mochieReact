import api from './axios';
import type { RegisterUserDto,LoginUserDto } from '../api/types/types';

export const registerUser = async (data: RegisterUserDto) => {
  const response = await api.post('/users/register', data);
  return response.data;
};

export const loginUser= async(data: LoginUserDto)=>{
  const response = await api.post('/users/login',data);
  console.log("Response of LogingIn", response.data)
  return response.data;
}