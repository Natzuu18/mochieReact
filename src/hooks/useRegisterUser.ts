import { useState } from 'react';
import { registerUser } from '../infrastructure/api/user.service';
import type { RegisterUserDto } from '../infrastructure/api/types/types';

export const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterUserDto) => {
    try {
      setLoading(true);
      setError(null);

      const result = await registerUser(data);
      
      return result;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};