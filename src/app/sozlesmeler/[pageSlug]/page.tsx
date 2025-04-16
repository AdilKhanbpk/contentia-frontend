"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchTermBySlug } from "@/store/features/admin/termsSlice";

interface PageProps {
    params: {
        pageSlug: string;
    };
}

export default function Page({ params }: PageProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { currentTerm, loading, error } = useSelector(
        (state: RootState) => state.terms
    );
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchTermBySlug({ pageSlug: params.pageSlug })).catch(
            () => {}
        );
    }, [params.pageSlug]);

    if (loading)
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500'></div>
            </div>
        );

    if (error)
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

    return (
        <div className='min-h-screen bg-gray-100 flex justify-center p-6 mt-16'>
            <div className='bg-white max-w-5xl w-full p-8 rounded-2xl shadow-lg'>
                <h1 className='text-4xl font-bold text-gray-800 border-b pb-4'>
                    {currentTerm?.pageTitle}
                </h1>
                <div
                    className='prose prose-sm sm:prose lg:prose-lg max-w-none mt-6 text-gray-700'
                    dangerouslySetInnerHTML={{
                        __html: currentTerm?.pageContent || "",
                    }}
                />
            </div>
        </div>
    );
}
