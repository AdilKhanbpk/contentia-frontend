interface BlogButtonProps {
  onCategoryChange: (category: string) => void;
  activeCategory: string;  
}

const BlogButton: React.FC<BlogButtonProps> = ({ onCategoryChange, activeCategory }) => {
  return (
    <div className=''>
      <div className='flex gap-2 flex-wrap'>
        {/* Breadcrumb Navigation */}
        <p className='BlueText  '>Homepage</p>
        <span>/</span>
        <p className='BlueText  '>Contentia Blog</p>
        <span>/</span>
        <p className='text-gray-400 '>{activeCategory}</p>

      </div>

      <div className='mt-12'>
        <p className='text-lg font-semibold'>Browse by category</p>
        <div className='flex flex-wrap gap-3 xl:gap-7 mt-4 '>
          {/* All button */}
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 font-semibold ${activeCategory === 'All' ? 'ButtonBlue text-white' : ''}`}
            onClick={() => onCategoryChange('All')}
          >
            All
          </button>

          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 font-semibold ${activeCategory === 'Contentia Creator Masterclass' ? 'ButtonBlue text-white' : ''}`}
            onClick={() => onCategoryChange('Contentia Creator Masterclass')}
          >
            Contentia Creator Masterclass
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 font-semibold ${activeCategory === 'Digital Marketing' ? 'ButtonBlue text-white' : ''}`}
            onClick={() => onCategoryChange('Digital Marketing')}
          >
            Digital Marketing
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 font-semibold ${activeCategory === 'eCommerce Marketing' ? 'ButtonBlue text-white' : ''}`}
            onClick={() => onCategoryChange('eCommerce Marketing')}
          >
            eCommerce Marketing
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 font-semibold ${activeCategory === 'Influencers' ? 'ButtonBlue text-white' : ''}`}
            onClick={() => onCategoryChange('Influencers')}
          >
            Influencers
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 font-semibold ${activeCategory === 'Marketing Strategies' ? 'ButtonBlue text-white' : ''}`}
            onClick={() => onCategoryChange('Marketing Strategies')}
          >
            Marketing Strategies
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 font-semibold ${activeCategory === 'Social Media Marketing' ? 'ButtonBlue text-white' : ''}`}
            onClick={() => onCategoryChange('Social Media Marketing')}
          >
            Social Media Marketing
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 font-semibold ${activeCategory === 'User-Generated Content' ? 'ButtonBlue text-white' : ''}`}
            onClick={() => onCategoryChange('User-Generated Content')}
          >
            User-Generated Content
          </button>
          <button
            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 font-semibold ${activeCategory === 'Video Marketing' ? 'ButtonBlue text-white' : ''}`}
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
