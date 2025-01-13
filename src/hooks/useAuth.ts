// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setIsLoading(false);
        router.push('/contentiaio/authentication');
        return;
      }

      try {
        const decoded: any = jwtDecode(token);
        setIsAdmin(decoded.role === 'admin');
        setIsUser(['user', 'admin'].includes(decoded.role));
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAdmin(false);
        setIsUser(false);
        router.push('/contentiaio/authentication');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  return { isAdmin, isUser, isLoading };
};