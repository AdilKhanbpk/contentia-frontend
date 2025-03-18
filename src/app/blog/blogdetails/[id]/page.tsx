"use client";
import React from "react";
import BlogDetails from "@/components/blog/blogDetails/BlogDetails";
import { useParams } from "next/navigation"; // For Next.js 13

const DetailPost: React.FC = () => {
    const params = useParams();
    const { id } = params;

    // Ensure `id` is always a string
    const postId = Array.isArray(id) ? id[0] : id;

    if (!postId) {
        return <div>Loading...</div>;
    }

    return <BlogDetails params={{ id: postId }} />;
};

export default DetailPost;
