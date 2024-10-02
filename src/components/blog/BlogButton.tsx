import React from 'react';

interface BlogButtonProps {
  onCategoryChange: (category: string) => void;
  activeCategory: string;  
}

const BlogButton: React.FC<BlogButtonProps> = ({ onCategoryChange, activeCategory }) => {
  return (
    <div className='px-4 md:px-8 lg:px-16'>
      <div className='flex gap-2 flex-wrap'>
        {/* Breadcrumb Navigation */}
        <p className='text-blue-600  font-semibold'>Homepage</p>
        <span>/</span>
        <p className='text-blue-600 font-semibold '>Contentia Blog</p>
        <span>/</span>
        <p className='text-gray-600 '>{activeCategory}</p>

      </div>

      <div className='mt-12'>
        <p className='text-lg font-semibold'>Browse by category</p>
        <div className='flex flex-wrap gap-3 xl:gap-7 mt-4 '>
          {/* All button */}
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 ${activeCategory === 'All' ? 'bg-blue-800 text-white' : 'hover:bg-gray-200'}`}
            onClick={() => onCategoryChange('All')}
          >
            All
          </button>

          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 ${activeCategory === 'Contentia Creator Masterclass' ? 'bg-blue-800 text-white' : 'hover:bg-gray-200'}`}
            onClick={() => onCategoryChange('Contentia Creator Masterclass')}
          >
            Contentia Creator Masterclass
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 ${activeCategory === 'Digital Marketing' ? 'bg-blue-800 text-white' : 'hover:bg-gray-200'}`}
            onClick={() => onCategoryChange('Digital Marketing')}
          >
            Digital Marketing
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 ${activeCategory === 'eCommerce Marketing' ? 'bg-blue-800 text-white' : 'hover:bg-gray-200'}`}
            onClick={() => onCategoryChange('eCommerce Marketing')}
          >
            eCommerce Marketing
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 ${activeCategory === 'Influencers' ? 'bg-blue-800 text-white' : 'hover:bg-gray-200'}`}
            onClick={() => onCategoryChange('Influencers')}
          >
            Influencers
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 ${activeCategory === 'Marketing Strategies' ? 'bg-blue-800 text-white' : 'hover:bg-gray-200'}`}
            onClick={() => onCategoryChange('Marketing Strategies')}
          >
            Marketing Strategies
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 ${activeCategory === 'Social Media Marketing' ? 'bg-blue-800 text-white' : 'hover:bg-gray-200'}`}
            onClick={() => onCategoryChange('Social Media Marketing')}
          >
            Social Media Marketing
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 ${activeCategory === 'User-Generated Content' ? 'bg-blue-800 text-white' : 'hover:bg-gray-200'}`}
            onClick={() => onCategoryChange('User-Generated Content')}
          >
            User-Generated Content
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 ${activeCategory === 'Video Marketing' ? 'bg-blue-800 text-white' : 'hover:bg-gray-200'}`}
            onClick={() => onCategoryChange('Video Marketing')}
          >
            Video Marketing
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogButton;
