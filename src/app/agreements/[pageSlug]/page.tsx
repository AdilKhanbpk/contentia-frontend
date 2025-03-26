"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/store/axiosInstance";

interface PageProps {
    params: {
        pageSlug: string;
    };
}

export default function Page({ params }: PageProps) {
    const [pageData, setPageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await axiosInstance.get(
                    `/admin/terms/${params.pageSlug}`
                );
                setPageData(res.data);
            } catch (err) {
                console.error("❌ Error fetching page:", err);
                setError("Page not found");
            } finally {
                setLoading(false);
            }
        };

        fetchPageData();
    }, [params.pageSlug, router]);

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
                    className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition'
                >
                    Go to Home
                </button>
            </div>
        );

    return (
        <div className='min-h-screen bg-gray-100 flex justify-center p-6'>
            <div className='bg-white max-w-5xl w-full p-8 rounded-2xl shadow-lg'>
                <h1 className='text-4xl font-bold text-gray-800 border-b pb-4'>
                    {pageData?.data?.pageTitle}
                </h1>
                <div
                    className='mt-6 text-gray-700 leading-relaxed'
                    dangerouslySetInnerHTML={{
                        __html: pageData?.data?.pageContent,
                    }}
                />
            </div>
        </div>
    );
}
