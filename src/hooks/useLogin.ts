import { useState } from 'react';  
import { loginUser } from '../infrastructure/api/user.service';
import type { LoginUserDto } from '../infrastructure/api/types/types';


export const useLoginUser = ()=>{
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 

    const login = async (data: LoginUserDto) => {
      try {
        setLoading(true);
        setError(null);
  
        const result = await loginUser(data);
        
        return result;
      } catch (err: any) {
        setError(err.response?.data?.message || 'Something went wrong');
        throw err;
      } finally {
        setLoading(false);
      }
    };
  
    return { login, loading, error };

}