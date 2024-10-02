import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import influencerMarketingImage1 from '../../../public/blog/influencer-marketing1.svg';

interface BlogCardProps {
  selectedCategory: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ selectedCategory }) => {
  const blogData = [
    { id: 1, date: '23 Sep', readTime: '13 min read', title: 'Unlocking success: A Guide TO Influencer Marketing', category: 'Digital Marketing', image: influencerMarketingImage1 },
    { id: 2, date: '24 Sep', readTime: '10 min read', title: 'The Rise of Influencer Marketing in 2023', category: 'Influencers', image: influencerMarketingImage1 },
    { id: 3, date: '25 Sep', readTime: '8 min read', title: 'How to Choose the Right Influencer', category: 'eCommerce Marketing', image: influencerMarketingImage1 },
    { id: 4, date: '23 Sep', readTime: '13 min read', title: 'Unlocking success: A Guide TO Influencer Marketing', category: 'Contentia Creator Masterclass', image: influencerMarketingImage1 },

    { id: 1, date: '23 Sep', readTime: '13 min read', title: 'Unlocking success: A Guide TO Influencer Marketing', category: 'Digital Marketing', image: influencerMarketingImage1 },
    { id: 2, date: '24 Sep', readTime: '10 min read', title: 'The Rise of Influencer Marketing in 2023', category: 'Influencers', image: influencerMarketingImage1 },
    { id: 3, date: '25 Sep', readTime: '8 min read', title: 'How to Choose the Right Influencer', category: 'eCommerce Marketing', image: influencerMarketingImage1 },
    { id: 4, date: '23 Sep', readTime: '13 min read', title: 'Unlocking success: A Guide TO Influencer Marketing', category: 'Contentia Creator Masterclass', image: influencerMarketingImage1 },

    { id: 1, date: '23 Sep', readTime: '13 min read', title: 'Unlocking success: A Guide TO Influencer Marketing', category: 'Digital Marketing', image: influencerMarketingImage1 },
    { id: 2, date: '24 Sep', readTime: '10 min read', title: 'The Rise of Influencer Marketing in 2023', category: 'Influencers', image: influencerMarketingImage1 },
    { id: 3, date: '25 Sep', readTime: '8 min read', title: 'How to Choose the Right Influencer', category: 'eCommerce Marketing', image: influencerMarketingImage1 },
    { id: 4, date: '23 Sep', readTime: '13 min read', title: 'Unlocking success: A Guide TO Influencer Marketing', category: 'Contentia Creator Masterclass', image: influencerMarketingImage1 },

    { id: 1, date: '23 Sep', readTime: '13 min read', title: 'Unlocking success: A Guide TO Influencer Marketing', category: 'Digital Marketing', image: influencerMarketingImage1 },
    { id: 2, date: '24 Sep', readTime: '10 min read', title: 'The Rise of Influencer Marketing in 2023', category: 'Influencers', image: influencerMarketingImage1 },
    { id: 3, date: '25 Sep', readTime: '8 min read', title: 'How to Choose the Right Influencer', category: 'eCommerce Marketing', image: influencerMarketingImage1 },
    { id: 4, date: '23 Sep', readTime: '13 min read', title: 'Unlocking success: A Guide TO Influencer Marketing', category: 'Contentia Creator Masterclass', image: influencerMarketingImage1 },

    { id: 1, date: '23 Sep', readTime: '13 min read', title: 'Unlocking success: A Guide TO Influencer Marketing', category: 'Digital Marketing', image: influencerMarketingImage1 },
    { id: 2, date: '24 Sep', readTime: '10 min read', title: 'The Rise of Influencer Marketing in 2023', category: 'Influencers', image: influencerMarketingImage1 },
    { id: 3, date: '25 Sep', readTime: '8 min read', title: 'How to Choose the Right Influencer', category: 'eCommerce Marketing', image: influencerMarketingImage1 },
    { id: 4, date: '23 Sep', readTime: '13 min read', title: 'Unlocking success: A Guide TO Influencer Marketing', category: 'Contentia Creator Masterclass', image: influencerMarketingImage1 },
    
  ];

  const filteredBlogs = selectedCategory === 'All'
    ? blogData
    : blogData.filter(blog => blog.category === selectedCategory);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 12;
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const currentBlogs = filteredBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const paginationButtons = [];
    const maxButtonsToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxButtonsToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const isStartPage = currentPage <= Math.ceil(maxButtonsToShow / 2);
      const isEndPage = currentPage + Math.floor(maxButtonsToShow / 2) >= totalPages;

      if (isStartPage) {
        startPage = 1;
        endPage = maxButtonsToShow;
      } else if (isEndPage) {
        startPage = totalPages - maxButtonsToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxButtonsToShow / 2);
        endPage = currentPage + Math.floor(maxButtonsToShow / 2);
      }
    }

    if (currentPage > 1) {
      paginationButtons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="mx-1 text-gray-600"
        >
          {'<'}
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i === startPage && i > 1) {
        paginationButtons.push(<span key="ellipsis-start">...</span>);
      }
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 ${currentPage === i ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          {i}
        </button>
      );
      if (i === endPage && i < totalPages) {
        paginationButtons.push(<span key="ellipsis-end">...</span>);
      }
    }

    if (currentPage < totalPages) {
      paginationButtons.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="mx-1 text-gray-600"
        >
          {'>'}
        </button>
      );
    }

    return paginationButtons;
  };

  return (
    <div className='px-4 lg:px-9   xl:mx-6 my-3 mt-28'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 gap-8 '>
        {currentBlogs.map((blog) => (
          <div key={blog.id} className='w-full rounded-md shadow-md p-4 flex flex-col items-center bg-white'>
            <Image 
              src={blog.image}  
              alt={blog.title} 
              priority 
              className='w-full  h-auto rounded-md' 
            />
            <div className='px-2 mt-2 text-center'>
              <p className='text-gray-600'>{blog.date} - {blog.readTime}</p>
              <p className='text-sm font-semibold mt-1'>{blog.title}</p>
              <Link href={`/Blog/blogdetail/${blog.id}`}>
                <button className='border w-full p-2 rounded-full text-blue-300 border-blue-300 mt-4 hover:bg-blue-300 hover:text-white transition'>
                  Devamini Oko
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-6'>
        {renderPagination()}
      </div>
    </div>
  );
};

export default BlogCard;
