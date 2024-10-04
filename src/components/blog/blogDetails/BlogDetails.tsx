"use client";
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import influencerMarketingImage from "../../../../public/blog/influencer-marketing1.svg";
import Image from 'next/image';

// Sample post data
const posts = [
    {
        id: 1,
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
        id: 2,
        title: "The Rise of Influencer Marketing in 2023",
        date: "September 24, 2024",
        readTime: "10 min read",
        author: "John Doe",
        authorImage: "https://example.com/author2.jpg",
        category: "Influencers",
        image: influencerMarketingImage,
        content: `
            Influencer marketing has become a powerful tool in the digital marketing landscape.
            As brands continue to seek authentic connections with consumers, influencers
            offer a unique way to engage audiences on a personal level.
      
            This blog post explores the growth of influencer marketing, key statistics, and
            strategies for brands looking to leverage this trend effectively.
          `,
    },
    {
        id: 3,
        title: "How to Choose the Right Influencer",
        date: "September 25, 2024",
        readTime: "8 min read",
        author: "Jane Smith",
        authorImage: "https://example.com/author3.jpg",
        category: "Influencer Strategy",
        image: influencerMarketingImage,
        content: `
            Choosing the right influencer can be challenging. Brands must consider several factors,
            including audience demographics, engagement rates, and content alignment.
      
            In this post, we provide a step-by-step guide on how to select the best influencers
            for your marketing campaigns.
          `,
    },
    {
        id: 4,
        title: "Content Creator Masterclass: Ultimate Guide",
        date: "September 26, 2024",
        readTime: "13 min read",
        author: "Emily Johnson",
        authorImage: "https://example.com/author4.jpg",
        category: "Content Creation",
        image: influencerMarketingImage,
        content: `
            Content creation is at the heart of successful influencer marketing. This ultimate guide
            covers the essential skills, tools, and techniques needed to create compelling content
            that resonates with audiences.
      
            From understanding different content formats to mastering storytelling, this blog
            will equip you with the knowledge to elevate your influencer marketing strategy.
          `,
    },
    {
        id: 5,
        title: "SEO for Influencers: Best Practices",
        date: "September 27, 2024",
        readTime: "7 min read",
        author: "Chris Brown",
        authorImage: "https://example.com/author5.jpg",
        category: "SEO",
        image: influencerMarketingImage,
        content: `
            SEO is crucial for influencers who want to grow their online presence. This article
            outlines the best practices for optimizing content, building backlinks, and improving
            search visibility.
      
            Whether you're a seasoned influencer or just starting, these SEO strategies will help
            you reach a wider audience.
          `,
    },
    {
        id: 6,
        title: "Top 10 Influencer Marketing Strategies",
        date: "September 28, 2024",
        readTime: "6 min read",
        author: "Sarah Connor",
        authorImage: "https://example.com/author6.jpg",
        category: "Marketing Strategies",
        image: influencerMarketingImage,
        content: `
            In this post, we compile the top 10 influencer marketing strategies that brands can
            implement to maximize their campaigns. From leveraging user-generated content to
            utilizing live video, discover the tactics that can lead to greater engagement
            and conversion rates.
          `,
    },
    {
        id: 7,
        title: "Building Authentic Influencer Partnerships",
        date: "September 29, 2024",
        readTime: "9 min read",
        author: "Michael Thompson",
        authorImage: "https://example.com/author7.jpg",
        category: "Influencer Relationships",
        image: influencerMarketingImage,
        content: `
            Authenticity is key in influencer marketing. This blog discusses how brands can
            build genuine partnerships with influencers, fostering trust and loyalty.
      
            Learn how to identify influencers who align with your brand values and create
            collaborations that resonate with audiences.
          `,
    },
    {
        id: 8,
        title: "Influencer Marketing Metrics to Track in 2023",
        date: "September 30, 2024",
        readTime: "12 min read",
        author: "Olivia Wilson",
        authorImage: "https://example.com/author8.jpg",
        category: "Analytics",
        image: influencerMarketingImage,
        content: `
            Measuring the success of influencer marketing campaigns is crucial. In this article,
            we highlight the key metrics brands should track, including engagement rate,
            reach, and return on investment.
      
            By understanding these metrics, brands can refine their strategies and achieve
            better results.
          `,
    },
    {
        id: 9,
        title: "How Social Media Platforms Impact Influencer Marketing",
        date: "October 1, 2024",
        readTime: "11 min read",
        author: "Emma Green",
        authorImage: "https://example.com/author9.jpg",
        category: "Social Media",
        image: influencerMarketingImage,
        content: `
            Social media platforms play a significant role in shaping influencer marketing. This
            post explores how different platforms like Instagram, TikTok, and YouTube affect
            influencer strategies and audience engagement.
      
            Discover how to tailor your approach based on platform-specific trends and
            algorithms.
          `,
    },
    {
        id: 10,
        title: "Influencer Marketing vs Traditional Advertising",
        date: "October 2, 2024",
        readTime: "10 min read",
        author: "Sophia Lee",
        authorImage: "https://example.com/author10.jpg",
        category: "Marketing Comparison",
        image: influencerMarketingImage,
        content: `
            In this article, we compare influencer marketing with traditional advertising methods.
            Explore the benefits and drawbacks of each approach and learn why influencer
            marketing is becoming a preferred choice for brands.
      
            This blog aims to help marketers make informed decisions about their advertising
            strategies.
          `,
    },
    {
        id: 11,
        title: "How Micro-Influencers Are Changing the Industry",
        date: "October 3, 2024",
        readTime: "8 min read",
        author: "Liam Brown",
        authorImage: "https://example.com/author11.jpg",
        category: "Micro-Influencers",
        image: influencerMarketingImage,
        content: `
            Micro-influencers are gaining traction in the marketing world. This post discusses
            their unique advantages, including higher engagement rates and more authentic
            connections with their audience.
      
            Learn how brands can effectively collaborate with micro-influencers to drive
            results.
          `,
    },
    {
        id: 12,
        title: "Influencer Marketing and Affiliate Marketing Synergy",
        date: "October 4, 2024",
        readTime: "14 min read",
        author: "Isabella Martinez",
        authorImage: "https://example.com/author12.jpg",
        category: "Affiliate Marketing",
        image: influencerMarketingImage,
        content: `
            This blog explores the synergy between influencer marketing and affiliate marketing.
            Learn how brands can leverage both strategies to maximize their reach and
            profitability.
      
            Discover successful case studies and actionable tips for integrating these two
            marketing approaches.
          `,
    },
    {
        id: 13,
        title: "Engagement Rate vs Reach: What Matters More?",
        date: "October 5, 2024",
        readTime: "7 min read",
        author: "Ava Taylor",
        authorImage: "https://example.com/author13.jpg",
        category: "Analytics",
        image: influencerMarketingImage,
        content: `
            When it comes to influencer marketing, engagement rate and reach are two critical
            metrics. This article discusses the importance of each metric and how they
            impact campaign success.
      
            Learn how to balance engagement and reach in your marketing strategies.
          `,
    },
    {
        id: 14,
        title: "Creating High-Quality Content with Influencers",
        date: "October 6, 2024",
        readTime: "13 min read",
        author: "Mia Clark",
        authorImage: "https://example.com/author14.jpg",
        category: "Content Creation",
        image: influencerMarketingImage,
        content: `
            Quality content is key in influencer marketing. This blog provides tips and
            best practices for collaborating with influencers to create compelling content
            that aligns with your brand.
      
            From brainstorming ideas to final production, this guide covers it all.
          `,
    },
    {
        id: 15,
        title: "The Future of Influencer Marketing in 2025",
        date: "October 7, 2024",
        readTime: "9 min read",
        author: "Noah Johnson",
        authorImage: "https://example.com/author15.jpg",
        category: "Future Trends",
        image: influencerMarketingImage,
        content: `
            As we look ahead to 2025, what can we expect from the influencer marketing landscape?
            This article examines emerging trends and technologies that will shape the future
            of influencer marketing.
      
            Stay ahead of the curve by understanding what’s coming next.
          `,
    },
    {
        id: 16,
        title: "Using User-Generated Content in Influencer Campaigns",
        date: "October 8, 2024",
        readTime: "10 min read",
        author: "James Wilson",
        authorImage: "https://example.com/author16.jpg",
        category: "User-Generated Content",
        image: influencerMarketingImage,
        content: `
            User-generated content (UGC) can significantly enhance influencer marketing campaigns.
            This blog explains how to incorporate UGC into your strategies effectively.
      
            Learn about the benefits of UGC and how to encourage your audience to create
            content for your brand.
          `,
    },
    {
        id: 17,
        title: "Influencer Marketing: Do's and Don'ts",
        date: "October 9, 2024",
        readTime: "12 min read",
        author: "Charlotte Garcia",
        authorImage: "https://example.com/author17.jpg",
        category: "Best Practices",
        image: influencerMarketingImage,
        content: `
            Navigating influencer marketing can be tricky. In this article, we outline the
            essential do's and don'ts for brands working with influencers.
      
            From establishing clear guidelines to measuring success, ensure your campaigns
            run smoothly and effectively.
          `,
    },
    {
        id: 18,
        title: "Influencer Marketing Campaign Case Studies",
        date: "October 10, 2024",
        readTime: "15 min read",
        author: "Benjamin Smith",
        authorImage: "https://example.com/author18.jpg",
        category: "Case Studies",
        image: influencerMarketingImage,
        content: `
            Learn from successful influencer marketing campaigns in this in-depth case study.
            We analyze different brands' strategies, execution, and outcomes.
      
            Gain insights that can inform your own marketing efforts.
          `,
    },
    {
        id: 19,
        title: "Influencer Marketing for Small Businesses",
        date: "October 11, 2024",
        readTime: "11 min read",
        author: "Ava White",
        authorImage: "https://example.com/author19.jpg",
        category: "Small Business",
        image: influencerMarketingImage,
        content: `
            Small businesses can benefit immensely from influencer marketing. This article
            discusses practical strategies for small brands to leverage influencers
            effectively.
      
            Discover cost-effective ways to partner with influencers and boost your visibility.
          `,
    },
    {
        id: 20,
        title: "Creating a Successful Influencer Marketing Brief",
        date: "October 12, 2024",
        readTime: "8 min read",
        author: "Henry Davis",
        authorImage: "https://example.com/author20.jpg",
        category: "Campaign Planning",
        image: influencerMarketingImage,
        content: `
            A well-crafted influencer marketing brief is essential for campaign success. This
            blog outlines the key elements to include in your brief to ensure clarity and
            alignment with your influencers.
      
            Learn how to set clear objectives and expectations for your campaigns.
          `,
    },
    {
        id: 21,
        title: "Navigating Legal Issues in Influencer Marketing",
        date: "October 13, 2024",
        readTime: "14 min read",
        author: "Oliver Taylor",
        authorImage: "https://example.com/author21.jpg",
        category: "Legal",
        image: influencerMarketingImage,
        content: `
            Legal issues can arise in influencer marketing. This article discusses common
            pitfalls and how to navigate regulations effectively.
      
            Stay compliant and protect your brand by understanding the legal landscape.
          `,
    },
    {
        id: 22,
        title: "Best Influencer Marketing Tools to Use",
        date: "October 14, 2024",
        readTime: "9 min read",
        author: "Amelia White",
        authorImage: "https://example.com/author22.jpg",
        category: "Tools",
        image: influencerMarketingImage,
        content: `
            Discover the best tools for influencer marketing in this comprehensive guide.
            We evaluate various software solutions that can streamline your campaigns
            and improve your results.
      
            From analytics platforms to influencer discovery tools, find the right solutions
            for your brand.
          `,
    },
    {
        id: 23,
        title: "Influencer Marketing Trends to Watch in 2024",
        date: "October 15, 2024",
        readTime: "11 min read",
        author: "Mason King",
        authorImage: "https://example.com/author23.jpg",
        category: "Trends",
        image: influencerMarketingImage,
        content: `
            Stay ahead of the curve by exploring the influencer marketing trends that
            are expected to shape 2024. This article highlights emerging patterns and
            strategies to consider.
      
            Equip your brand with the knowledge to adapt to changing landscapes.
          `,
    },
    {
        id: 24,
        title: "The Importance of Authenticity in Influencer Marketing",
        date: "October 16, 2024",
        readTime: "10 min read",
        author: "Ella Martinez",
        authorImage: "https://example.com/author24.jpg",
        category: "Authenticity",
        image: influencerMarketingImage,
        content: `
            Authenticity is a key factor in successful influencer marketing. This blog discusses
            why brands should prioritize genuine connections with their influencers and
            audiences.
      
            Learn how to foster authenticity in your influencer partnerships.
          `,
    },
    {
        id: 25,
        title: "Measuring the ROI of Influencer Marketing",
        date: "October 17, 2024",
        readTime: "12 min read",
        author: "Lucas Anderson",
        authorImage: "https://example.com/author25.jpg",
        category: "ROI",
        image: influencerMarketingImage,
        content: `
            Understanding the return on investment (ROI) from influencer marketing is crucial
            for brands. This article outlines how to measure ROI effectively and make data-driven
            decisions.
      
            Learn to assess your influencer marketing efforts and optimize future campaigns.
          `,
    },
    {
        id: 26,
        title: "Tips for Influencer Collaboration Success",
        date: "October 18, 2024",
        readTime: "10 min read",
        author: "Zoe Miller",
        authorImage: "https://example.com/author26.jpg",
        category: "Collaboration",
        image: influencerMarketingImage,
        content: `
            Collaborating with influencers can lead to great success. This blog provides
            practical tips for brands to ensure successful partnerships and outcomes.
      
            From communication to setting expectations, discover the keys to effective
            collaboration.
          `,
    },
    {
        id: 27,
        title: "Social Listening for Influencer Marketing",
        date: "October 19, 2024",
        readTime: "9 min read",
        author: "Daniel Harris",
        authorImage: "https://example.com/author27.jpg",
        category: "Social Listening",
        image: influencerMarketingImage,
        content: `
            Social listening is a powerful tool for influencer marketing. This article explains
            how brands can leverage social listening to identify influencers and understand
            audience sentiments.
      
            Learn how to use social insights to inform your marketing strategies.
          `,
    },
    {
        id: 28,
        title: "The Psychology Behind Influencer Marketing",
        date: "October 20, 2024",
        readTime: "11 min read",
        author: "Grace Thompson",
        authorImage: "https://example.com/author28.jpg",
        category: "Psychology",
        image: influencerMarketingImage,
        content: `
            Understanding the psychology behind influencer marketing can enhance your
            campaigns. This blog explores the cognitive biases and motivations that drive
            audience engagement with influencers.
      
            Apply psychological principles to create more impactful marketing strategies.
          `,
    },
    {
        id: 29,
        title: "Creating a Cohesive Influencer Marketing Strategy",
        date: "October 21, 2024",
        readTime: "13 min read",
        author: "Henry Lewis",
        authorImage: "https://example.com/author29.jpg",
        category: "Strategy",
        image: influencerMarketingImage,
        content: `
            A cohesive influencer marketing strategy is vital for success. This blog discusses
            how to align your influencer campaigns with your overall marketing goals.
      
            Discover steps to integrate influencer marketing into your brand strategy.
          `,
    },
    {
        id: 30,
        title: "How to Handle Influencer Crises",
        date: "October 22, 2024",
        readTime: "12 min read",
        author: "Natalie King",
        authorImage: "https://example.com/author30.jpg",
        category: "Crisis Management",
        image: influencerMarketingImage,
        content: `
            Influencer crises can arise unexpectedly. This blog provides guidance on how to
            manage and mitigate crises in influencer marketing.
      
            Learn strategies to protect your brand’s reputation during difficult times.
          `,
    }
];

interface DetailPostProps {
    params: {
        id: string;
    };
}

const BlogDetails: React.FC<DetailPostProps> = ({ params }) => {
    const { id } = params;


    const post = posts.find((p) => p.id === Number(id));

    if (!post) {
        return <div className='text-center font-bold text-3xl mx-auto'>Post not found.</div>;
    }

    return (
        <div className="pt-28 lg:mx-28 mx-4">
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
            <div className="mt-9 ">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                    {post.title}
                </h1>
            </div>

            {/* Post Meta Info */}
            <div className="mt-6 text-sm sm:text-base">
                <span className="font-bold">Updated:</span>
                <span> {post.date}</span>
                <span className="font-bold mx-2">•</span>
                <span className='font-semibold'>{post.readTime}</span>
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
                    <p className="BlueText">{post.author}</p>
                    <button className="border blogPink text-white text-sm rounded-full px-4 py-1">
                        Editor
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto mt-9 max-w-full">
                {/* Image Section */}
                <div className="w-full lg:w-[650px] ">
                    <Image src={post.image} alt="Post Image" width={650} height={400} layout="responsive" />
                </div>

                {/* Content Text */}
                <div className="text-sm my-6 ">
                    <p>{post.content}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
