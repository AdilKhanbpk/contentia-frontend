import React from "react";

interface BlogButtonProps {
    onCategoryChange: (category: string) => void;
    activeCategory: string;
}

const categories = [
    { label: "Tümü", value: "all" },
    { label: "Dijital Pazarlama", value: "digital_marketing" },
    { label: "Contentia Masterclass", value: "contentia_masterclass" },
    { label: "UGC", value: "ugc" },
    { label: "Pazarlama Stratejileri", value: "marketing_strategies" },
    { label: "Sosyal Medya Pazarlaması", value: "social_media_marketing" },
];

const BlogButton: React.FC<BlogButtonProps> = ({
    onCategoryChange,
    activeCategory,
}) => {
    return (
        <div>
            {/* Breadcrumb Navigation */}
            <div className='flex gap-2 flex-wrap'>
                <p className='BlueText'>Homepage</p>
                <span>/</span>
                <p className='BlueText'>Contentia Blog</p>
                <span>/</span>
                <p className='text-gray-400'>{activeCategory}</p>
            </div>

            <div className='mt-12'>
                <p className='text-lg font-semibold'>Browse by category</p>
                <div className='flex flex-wrap gap-3 xl:gap-7 mt-4'>
                    {categories.map(({ label, value }) => (
                        <button
                            key={value}
                            className={`p-2 px-3 rounded-full text-nowrap border transition duration-200 font-semibold ${
                                activeCategory === value
                                    ? "Button text-white"
                                    : ""
                            }`}
                            onClick={() => onCategoryChange(value)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogButton;
