"use client"
import React from 'react';
import BlogDetails from '@/components/blog/blogDetails/BlogDetails';
import { useParams } from 'next/navigation'; // For Next.js 13

const DetailPost: React.FC = () => {
  const params = useParams(); // Extract the `id` from the URL
  const { id } = params;

  // Ensure `id` is always a string
  const postId = Array.isArray(id) ? id[0] : id;
  console.log(postId);

  if (!postId) {
    return <div>Loading...</div>; // Handle loading or error state
  }

  return (
    <BlogDetails params={{ id: postId }} />
  );
};

export default DetailPost;
