"use client";
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import influencerMarketingImage from "../../../../../public/blog/influencer-marketing1.svg";
import Image from 'next/image';

// Sample post data
const posts = [
  {
    id:1,
    title: "Unlocking Success: A Guide To Influencer Marketing Tools",
    date: "September 23, 2024",
    readTime: "13 min read",
    author: "Agnė Pelešinaitė-Čeledinė",
    authorImage: "https://avatar.iran.liara.run/public/24",
    category: "Influencers",
    image: influencerMarketingImage,
    content: `
      Brands use digital tools for almost everything in today’s economy, from monitoring
      their social media accounts to organizing staff rotas. As such, it stands to reason
      that they would also use software for their influencer marketing efforts.
      
      Proper influencer marketing management is becoming more vital to company success.
      Brands that get it right can benefit from incredible returns on investment (up to $7.65
      in revenue for every dollar spent according to some statistics).

      But what tools should your company be using? That’s the topic of this guide. We look at
      various software categories and how specific solutions can help you dominate influencer
      discovery, relationship management, campaign management, and reporting.
    `,
  },
  {
    id:2,
    title: "The Rise of Video Marketing in 2024",
    date: "October 1, 2024",
    readTime: "10 min read",
    author: "John Doe",
    authorImage: "https://avatar.iran.liara.run/public/25",
    category: "Video Marketing",
    image: influencerMarketingImage,
    content: `
      Video marketing continues to dominate in 2024, with brands using visual content to
      engage and captivate their audiences. The question is no longer whether to invest in
      video marketing, but how to optimize your efforts to stand out.
      
      This guide will cover the top strategies for making your video content more effective
      and how to measure its success in terms of audience engagement and ROI.
    `,
  },
  {
    id:3,
    title: "How to Choose the Right Influencer",
    date: "September 15, 2024",
    readTime: "8 min read",
    author: "Emily Johnson",
    authorImage: "https://avatar.iran.liara.run/public/26",
    category: "Influencers",
    image: influencerMarketingImage,
    content: `
      Choosing the right influencer for your brand can be tricky. You need someone who aligns
      with your company values, resonates with your target audience, and can deliver the kind
      of content that promotes your products effectively.
      
      In this article, we explore how to identify influencers that will elevate your marketing
      campaigns and build strong relationships with your brand.
    `,
  },
  // other posts...
];

interface DetailPostProps {
  params: {
    id: string; 
  };
}

const DetailPost: React.FC<DetailPostProps> = ({ params }) => {
  const { id } = params;

  
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <div className='text-center font-bold text-3xl mx-auto'>Post not found.</div>; 
  }

  return (
    <div className="p-4 max-w-full lg:max-w-[750px] mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm text-gray-500 flex-wrap">
        <h4>Blog</h4>
        <span className="mx-2">
          <IoIosArrowForward />
        </span>
        <h4>{post.category}</h4>
        <span className="mx-2">
          <IoIosArrowForward />
        </span>
        <h4 className="truncate">{post.title}</h4>
      </div>

      {/* Title Section */}
      <div className="mt-9 max-w-full">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
          {post.title}
        </h1>
      </div>

      {/* Post Meta Info */}
      <div className="mt-6 text-gray-600 text-sm sm:text-base">
        <span className="font-bold">Updated:</span>
        <span> {post.date}</span>
        <span className="font-bold mx-2">•</span>
        <span>{post.readTime}</span>
      </div>

      {/* Author Section */}
      <div className="mt-6 flex items-center gap-3 flex-wrap">
        <div className="flex-shrink-0">
          <img
            className="w-16 mt-4 rounded-full"
            src={post.authorImage}
            alt="Author Image"
          />
        </div>
        <div className="flex-grow">
          <p className="text-purple-500">{post.author}</p>
          <button className="border bg-purple-500 text-white text-sm rounded-full px-4 py-1">
            Editor
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto mt-9 max-w-full">
        {/* Image Section */}
        <div className="w-full lg:w-[650px] mx-auto">
          <Image src={post.image} alt="Post Image" width={650} height={400} layout="responsive" />
        </div>

        {/* Content Text */}
        <div className="text-sm mt-6 lg:mx-8">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
