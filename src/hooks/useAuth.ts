// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/utils/checkToken';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = getAccessToken();
      if (!token) {
        setIsLoading(false);
        router.push('/contentiaio/authentication');
        return;
      };
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  return { isLoading };
};