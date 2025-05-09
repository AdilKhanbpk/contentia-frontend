"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
    fetchHelpSupportById,
    fetchHelpSupports,
    HelpSupport,
} from "@/store/features/admin/helpSlice";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

interface HelpSupportDetailProps {
    helpSupportId: string;
}

const HelpSupportDetail: React.FC<HelpSupportDetailProps> = ({ helpSupportId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { helpSupports: helpSupportData } = useSelector(
        (state: any) => state.helpSupport
    );

    useEffect(() => {
        dispatch(fetchHelpSupports());
    }, [dispatch]);

    const { currentHelpSupport, loading, error } = useSelector(
        (state: RootState) => state.helpSupport
    );
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        if (helpSupportId) {
            dispatch(
                fetchHelpSupportById({ helpSupportId })
            );
        }
    }, [dispatch, helpSupportId]);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500'></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <p className='text-xl text-red-500'>{error}</p>
                <button
                    onClick={() => router.push("/")}
                    className='mt-4 px-4 py-2 Button text-white rounded-lg shadow-md hover:bg-blue-600 transition'
                >
                    Go to Home
                </button>
            </div>
        );
    }

    // Filter help supports to show only those from the current category
    const categoryHelpSupports = helpSupportData.filter(
        (support: HelpSupport) =>
            support.category === currentHelpSupport?.category
    );

    // Then apply search filter if there's a search query
    const filteredHelpSupports = categoryHelpSupports.filter(
        (support: HelpSupport) =>
            searchQuery.trim() === ""
                ? true
                : support.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
    );

    return (
        <div className='px-4 sm:px-6 md:px-8 lg:px-32 '>
            <div className=' py-24 sm:py-24 md:py-24 lg:py-[100px]'>
                <div className=' p-2 sm:p-4 md:p-8 lg:px-12 lg:py-8'>
                    <div>
                        <h4 className='text-gray-600'>
                            {currentHelpSupport?.category}
                        </h4>
                        <h1 className='mt-2 text-3xl font-bold text-gray-800'>
                            {currentHelpSupport?.title}
                        </h1>
                        <div className='flex gap-3 p-2 items-center rounded-md mt-9 mb-4 bg-gray-200'>
                            <CiSearch size={20} />
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder='Destek almak istediğiniz konu nedir?'
                                className='outline-none w-full py-1 bg-gray-200'
                                aria-label='Search'
                            />
                        </div>
                    </div>

                    <div className='flex text-sm mt-6 space-x-3 flex-wrap pb-2'>
                        <div className='flex items-center'>
                            <Link href='/destek-merkezi'>
                                <span className='cursor-pointer hover:underline'>
                                    Destek Merkezi
                                </span>
                            </Link>
                            <span className='text-xl'>
                                <MdOutlineKeyboardArrowRight />
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <Link
                                href={`/destek-merkezi?category=${currentHelpSupport?.category}`}
                            >
                                <span className='cursor-pointer hover:underline'>
                                    {currentHelpSupport?.category}
                                </span>
                            </Link>{" "}
                            <span className='text-xl'>
                                <MdOutlineKeyboardArrowRight />
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <span>{currentHelpSupport?.title}</span>
                            <span className='text-xl'>
                                <MdOutlineKeyboardArrowRight />
                            </span>
                        </div>
                    </div>

                    <div className='flex md:flex-row flex-col items-start justify-start mt-6 '>
                        <div
                            className='prose prose-sm sm:prose lg:prose-lg max-w-none mt-6 text-gray-700'
                            dangerouslySetInnerHTML={{
                                __html: currentHelpSupport?.content || "",
                            }}
                        />

                        <div className='flex flex-col gap-6 border-l-2 pl-5 md:ml-9 mt-8 md:mt-0'>
                            {filteredHelpSupports.map(
                                (support: HelpSupport) => (
                                    <Link
                                        key={support._id}
                                        href={`/destek-merkezi/detail/${support._id}`}
                                    >
                                        <p
                                            className={`whitespace-nowrap cursor-pointer hover:text-blue-600 ${
                                                currentHelpSupport?._id ===
                                                support._id
                                                    ? "text-blue-600 font-medium"
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            {support.title}
                                        </p>
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpSupportDetail;
