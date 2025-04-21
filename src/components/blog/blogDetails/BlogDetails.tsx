"use client";
import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import influencerMarketingImage from "../../../../public/blog/influencer-marketing1.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchBlogs } from "@/store/features/admin/blogSlice";
import { BlogInterface } from "@/types/interfaces";

interface DetailPostProps {
    params: {
        id: string;
    };
}

const BlogDetails: React.FC<DetailPostProps> = ({ params }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { blogs } = useSelector((state: RootState) => state.blog);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    const { id } = params;
    const post = blogs?.find((blog: BlogInterface) => blog._id === id);

    if (!post) {
        return (
            <div className='text-center font-bold text-3xl mx-auto pt-28'>
                Post not found.
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    const estimateReadTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return `${readTime} min read`;
    };

    return (
        <div className='py-28 px-4'>
            <div className='max-w-[800px] mx-auto text-left'>
                {/* Breadcrumb Navigation */}
                <div className='flex items-center text-sm text-gray-500 flex-wrap'>
                    <h4>Blog</h4>
                    <span className='mx-2'>
                        <IoIosArrowForward />
                    </span>
                    <h4>{post.category}</h4>
                    <span className='mx-2'>
                        <IoIosArrowForward />
                    </span>
                    <h4 className='truncate max-w-[200px] sm:max-w-xs lg:max-w-sm overflow-hidden text-ellipsis'>
                        {post.title}
                    </h4>
                </div>

                {/* Title */}
                <div className='mt-9'>
                    <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold leading-tight'>
                        {post.title}
                    </h1>
                </div>

                {/* Meta Info */}
                <div className='mt-6 text-sm sm:text-base'>
                    <span className='font-bold'>Updated:</span>
                    <span> {formatDate(post.updatedAt)}</span>
                    <span className='font-bold mx-2'>•</span>
                    <span className='font-semibold'>
                        {estimateReadTime(post.content)}
                    </span>
                </div>

                {/* Author */}
                <div className='mt-6 flex items-center gap-3 flex-wrap'>
                    <div className='flex-shrink-0'>
                        <Image
                            className='w-16 mt-4 rounded-full'
                            src={
                                post.author?.profilePic ||
                                influencerMarketingImage
                            }
                            alt='Author Image'
                            width={64}
                            height={64}
                        />
                    </div>
                    <div className='flex-grow'>
                        <p className='BlueText'>
                            {post.author?.fullName || "Anonymous"}
                        </p>
                        <button className='border blogPink text-white text-sm rounded-full px-4 py-1'>
                            Editor
                        </button>
                    </div>
                </div>

                {/* Banner Image */}
                <div className='w-full mt-9'>
                    <Image
                        src={post.bannerImage || influencerMarketingImage}
                        alt='Post Image'
                        className='rounded-lg w-full max-h-[500px] object-cover'
                        width={1000}
                        height={500}
                    />
                </div>

                {/* Blog Content */}
                <div
                    className='prose prose-sm sm:prose lg:prose-lg max-w-none mt-6 text-gray-700 text-left'
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </div>
    );
};

export default BlogDetails;
