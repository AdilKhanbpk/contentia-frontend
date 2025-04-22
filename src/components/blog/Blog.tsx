"use client";
import BlogButton from "@/components/blog/subBlog/BlogButton";
import BlogCard from "@/components/blog/subBlog/BlogCard";
import Feed from "@/components/blog/subBlog/Feed";
import { useState, useEffect } from "react";

const Blogs = () => {
    const [activeCategory, setActiveCategory] = useState("all");

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
    };

    return (
        <>
            <div>
                <div className='pt-28 lg:mx-28 mx-4'>
                    <div>
                        <BlogButton
                            onCategoryChange={handleCategoryChange}
                            activeCategory={activeCategory}
                        />
                        <Feed />
                        <BlogCard activeCategory={activeCategory} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blogs;
