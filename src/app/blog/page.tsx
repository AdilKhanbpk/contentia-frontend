"use client"
import BlogButton from '@/components/blog/BlogButton'
import BlogCard from '@/components/blog/BlogCard'
import Feed from '@/components/blog/Feed'
import Navbar from '@/components/navbar/Navbar'
import React, { useState } from 'react'

const blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
    // State to track selected category
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Function to handle category change
    const handleCategoryChange = (category: string) => {
      setSelectedCategory(category);
      setActiveCategory(category)
    };
  
  return (
    <>
    <Navbar/>
    <div>
    <div className='pt-28 lg:mx-28 mx-4'>
      <div>
      <BlogButton onCategoryChange={handleCategoryChange} activeCategory={activeCategory} />
      <Feed/>
      <BlogCard selectedCategory={selectedCategory} />
      </div>
    </div>

    </div>
    </>
  )
}

export default blog