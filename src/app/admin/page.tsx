"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode'; // Ensure this is imported correctly
import AdminComponent from '@/components/admin/admin/AdminComponent';

export default function Admin() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log('Checking for access token in localStorage...');
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      console.log('Access token found:', token);
      try {
        // Decode the token
        console.log('Decoding the token...');
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded token:', decodedToken);

        // Check if the role is 'admin'
        if (decodedToken.role === 'admin') {
          console.log('User is authorized as admin.');
          setIsAuthorized(true);
        } else {
          console.warn('User is not authorized. Redirecting to /unauthorized...');
          // router.push('/unauthorized'); // Redirect if not an admin
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        console.warn('Invalid token. Redirecting to /contentiaio/authentication...');
        router.push('/contentiaio/authentication'); // Redirect to login if token is invalid
      }
    } else {
      console.warn('No access token found. Redirecting to /contentiaio/authentication...');
      router.push('/contentiaio/authentication'); // Redirect to login if no token
    }
  }, [router]);

  if (!isAuthorized) {
    console.log('Authorization check in progress...');
    return null; // Optionally show a loading spinner while checking
  }

  console.log('Rendering AdminComponent...');
  return (
    <>
      <AdminComponent />
    </>
  );
}
