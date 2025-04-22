import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchBlogs } from "@/store/features/admin/blogSlice";
import Link from "next/link";
import defaultImage from "../../../../public/blog/influencer-marketing.svg";

const Feed: React.FC = () => {
    const { blogs } = useSelector((state: RootState) => state.blog);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBlogs() as any);
    }, [dispatch]);

    const latestBlog = blogs.length
        ? [...blogs].sort(
              (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
          )[0]
        : null;

    return (
        <div className='mt-14'>
            <div className='text-3xl md:text-4xl font-bold BlueText text-center md:text-left'>
                Contentia Blog
            </div>

            {latestBlog && (
                <div className='flex flex-col md:flex-row justify-between items-center gap-5 mt-6'>
                    {/* Left Text Section */}
                    <div className='flex-1'>
                        <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold leading-snug'>
                            {latestBlog.title}
                        </h2>
                        <p
                            className='font-semibold mt-2 text-sm md:text-base lg:text-lg line-clamp-3'
                            dangerouslySetInnerHTML={{
                                __html: latestBlog?.content || "",
                            }}
                        />
                        <Link href={`/blog/details/${latestBlog._id}`}>
                            <button className='Button text-white py-2 px-4 rounded-full mt-4 text-sm md:text-base lg:text-lg'>
                                Devamını Oku
                            </button>
                        </Link>
                    </div>

                    {/* Right Image Section */}
                    <div className='flex-1 flex justify-center '>
                        <Image
                            src={latestBlog.bannerImage || defaultImage}
                            alt={latestBlog.title}
                            width={500}
                            height={300}
                            priority
                            className='w-full h-auto lg:max-w-[600px] object-cover rounded-md'
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Feed;
