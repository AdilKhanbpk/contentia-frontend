import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import influencerMarketingImage1 from '../../../../public/blog/influencer-marketing1.svg';
import Pagination from './pagination/Pagination';

interface BlogCardProps {
  selectedCategory: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ selectedCategory }) => {

  const blogData = [
    { id: 1, date: '23 Sep', readTime: '13 min read', title: 'Unlocking Success: A Guide to Influencer Marketing', category: 'Digital Marketing', image: influencerMarketingImage1 },
    { id: 2, date: '24 Sep', readTime: '10 min read', title: 'The Rise of Influencer Marketing in 2023', category: 'Influencers', image: influencerMarketingImage1 },
    { id: 3, date: '25 Sep', readTime: '8 min read', title: 'How to Choose the Right Influencer', category: 'eCommerce Marketing', image: influencerMarketingImage1 },
    { id: 4, date: '26 Sep', readTime: '13 min read', title: 'Content Creator Masterclass: Ultimate Guide', category: 'Content Creator Masterclass', image: influencerMarketingImage1 },
    { id: 5, date: '27 Sep', readTime: '7 min read', title: 'SEO for Influencers: Best Practices', category: 'SEO', image: influencerMarketingImage1 },
    { id: 6, date: '28 Sep', readTime: '6 min read', title: 'Top 10 Influencer Marketing Strategies', category: 'Digital Marketing', image: influencerMarketingImage1 },
    { id: 7, date: '29 Sep', readTime: '9 min read', title: 'Building Authentic Influencer Partnerships', category: 'Influencers', image: influencerMarketingImage1 },
    { id: 8, date: '30 Sep', readTime: '12 min read', title: 'Influencer Marketing Metrics to Track in 2023', category: 'Analytics', image: influencerMarketingImage1 },
    { id: 9, date: '1 Oct', readTime: '11 min read', title: 'How Social Media Platforms Impact Influencer Marketing', category: 'Social Media', image: influencerMarketingImage1 },
    { id: 10, date: '2 Oct', readTime: '10 min read', title: 'Influencer Marketing vs Traditional Advertising', category: 'Advertising', image: influencerMarketingImage1 },
    { id: 11, date: '3 Oct', readTime: '8 min read', title: 'How Micro-Influencers Are Changing the Industry', category: 'Influencers', image: influencerMarketingImage1 },
    { id: 12, date: '4 Oct', readTime: '14 min read', title: 'Influencer Marketing and Affiliate Marketing Synergy', category: 'Affiliate Marketing', image: influencerMarketingImage1 },
    { id: 13, date: '5 Oct', readTime: '7 min read', title: 'Engagement Rate vs Reach: What Matters More?', category: 'Digital Marketing', image: influencerMarketingImage1 },
    { id: 14, date: '6 Oct', readTime: '13 min read', title: 'Creating High-Quality Content with Influencers', category: 'Content Creation', image: influencerMarketingImage1 },
    { id: 15, date: '7 Oct', readTime: '9 min read', title: 'Best Tools for Managing Influencer Campaigns', category: 'Tools', image: influencerMarketingImage1 },
    { id: 16, date: '8 Oct', readTime: '8 min read', title: 'Influencer Marketing Ethics: What You Need to Know', category: 'Ethics', image: influencerMarketingImage1 },
    { id: 17, date: '9 Oct', readTime: '10 min read', title: 'Case Study: Successful Influencer Campaigns of 2023', category: 'Case Studies', image: influencerMarketingImage1 },
    { id: 18, date: '10 Oct', readTime: '11 min read', title: 'How to Measure ROI on Influencer Marketing', category: 'Analytics', image: influencerMarketingImage1 },
    { id: 19, date: '11 Oct', readTime: '12 min read', title: 'Emerging Trends in Influencer Marketing', category: 'Trends', image: influencerMarketingImage1 },
    { id: 20, date: '12 Oct', readTime: '8 min read', title: 'Influencer Marketing for Niche Industries', category: 'Niche Marketing', image: influencerMarketingImage1 },
    { id: 21, date: '13 Oct', readTime: '9 min read', title: 'The Importance of Authenticity in Influencer Marketing', category: 'Influencers', image: influencerMarketingImage1 },
    { id: 22, date: '14 Oct', readTime: '10 min read', title: 'How to Boost Engagement with Influencer Content', category: 'Engagement', image: influencerMarketingImage1 },
    { id: 23, date: '15 Oct', readTime: '12 min read', title: 'Understanding Influencer Agreements and Contracts', category: 'Legal', image: influencerMarketingImage1 },
    { id: 24, date: '16 Oct', readTime: '11 min read', title: 'How to Leverage User-Generated Content for Marketing', category: 'Content Creation', image: influencerMarketingImage1 },
    { id: 25, date: '17 Oct', readTime: '13 min read', title: 'The Impact of AI on Influencer Marketing', category: 'Technology', image: influencerMarketingImage1 },
    { id: 26, date: '18 Oct', readTime: '9 min read', title: 'How to Run a Successful Influencer Marketing Campaign', category: 'Campaigns', image: influencerMarketingImage1 },
    { id: 27, date: '19 Oct', readTime: '10 min read', title: 'Exploring the Best Influencer Marketing Platforms', category: 'Tools', image: influencerMarketingImage1 },
    { id: 28, date: '20 Oct', readTime: '14 min read', title: 'Influencer Marketing in the Travel Industry', category: 'Travel Marketing', image: influencerMarketingImage1 },
    { id: 29, date: '21 Oct', readTime: '11 min read', title: 'How Brands Can Collaborate with Influencers', category: 'Collaborations', image: influencerMarketingImage1 },
    { id: 30, date: '22 Oct', readTime: '12 min read', title: 'Influencer Marketing Challenges in 2023', category: 'Challenges', image: influencerMarketingImage1 }
  ];


  const filteredBlogs = selectedCategory === 'All'
    ? blogData
    : blogData.filter(blog => blog.category === selectedCategory);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const currentBlogs = filteredBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className=" my-3 mt-28">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 gap-8">
        {currentBlogs.map((blog) => (
          <div key={blog.id} className="w-full rounded-md shadow-md p-4 flex flex-col items-center bg-white">
            <Image
              src={blog.image}
              alt={blog.title}
              priority
              className="w-full h-auto rounded-md"
            />
            <div className="px-2 mt-2 text-center">
              <p className="text-gray-600">{blog.date} - {blog.readTime}</p>
              <p className="text-sm font-semibold mt-1">{blog.title}</p>
              <Link href={`/blog/blogdetails/${blog.id}`}>
                <button className="border w-full p-2 rounded-full BlueText BlueBorder mt-4 transition">
                  Devamini Oko
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BlogCard;
