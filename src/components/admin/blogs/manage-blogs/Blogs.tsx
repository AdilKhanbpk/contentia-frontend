"use client";

import React, {
    useEffect,
    useState,
    useCallback,
    memo,
    useDeferredValue,
    useMemo,
} from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
    fetchBlogs,
    deleteBlog,
    createBlog,
    updateBlog,
    fetchBlogById,
} from "@/store/features/admin/blogSlice";
import CustomModelAdmin from "../../../modal/CustomModelAdmin";
import Modal from "./sub-blogs/ModalNew";
import { ModalEdit } from "./sub-blogs/ModalEdit";
import { ModalView } from "./sub-blogs/ModalView";
import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";
import { toast } from "react-toastify";
import { BlogInterface } from "@/types/interfaces";
import { getAccessToken } from "@/utils/checkToken";

const SearchBar = memo(
    ({ onSearch }: { onSearch: (value: string) => void }) => (
        <input
            type='text'
            placeholder='Search blogs...'
            onChange={(e) => onSearch(e.target.value)}
            className='p-2 border border-gray-300 rounded-lg'
        />
    )
);

SearchBar.displayName = "SearchBar";

const TableActions = memo(
    ({
        onDelete,
        onEdit,
        onView,
        id,
    }: {
        onDelete: (id: string) => void;
        onEdit: (id: string) => void;
        onView: (id: string) => void;
        id: string;
    }) => (
        <div className='flex space-x-3'>
            <button
                className='text-gray-500 hover:text-gray-700'
                onClick={() => onView(id)}
            >
                <FaEye className='text-lg' />
            </button>
            <button
                className='text-blue-500 hover:text-blue-700'
                onClick={() => onEdit(id)}
            >
                <FaEdit className='text-lg' />
            </button>
            <button
                className='text-red-500 hover:text-red-700'
                onClick={() => onDelete(id)}
            >
                <FaTrashAlt className='text-md' />
            </button>
        </div>
    )
);

TableActions.displayName = "TableActions";

const ManageBlogs: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        blogs = [],
        currentBlog,
        loading,
    } = useSelector((state: RootState) => state.blog);

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);

    const handleDelete = useCallback(
        (id: string) => {
            const token = getAccessToken();
            if (!token) return;

            dispatch(deleteBlog({ blogId: id, token }))
                .unwrap()
                .then(() => {
                    toast.success("Blog deleted successfully");
                    dispatch(fetchBlogs(token));
                })
                .catch((error: any) => {
                    toast.error("Delete failed");
                    console.error("Delete failed:", error);
                });
        },
        [dispatch]
    );

    const handleView = async (id: string) => {
        const token = getAccessToken();
        if (!token) return;
        await dispatch(fetchBlogById({ blogId: id, token })).unwrap();
        setIsModalViewOpen(true);
    };

    const handleUpdate = async (blogData: BlogInterface) => {
        const token = getAccessToken();
        if (!token) return;
        if (!blogData._id) {
            toast.error("Blog ID is missing!");
            return;
        }

        const formData = new FormData();

        Object.entries(blogData).forEach(([key, value]) => {
            if (
                key === "bannerImage" &&
                value instanceof FileList &&
                value.length > 0
            ) {
                formData.append(key, value[0]); // Append only if new file is selected
            } else if (key === "metaKeywords" && typeof value === "string") {
                formData.append(key, value); // Send as a simple comma-separated string
            } else if (value !== null && value !== undefined) {
                formData.append(key, value.toString());
            }
        });

        try {
            await dispatch(
                updateBlog({ blogId: blogData._id, blogData: formData, token })
            ).unwrap();
            toast.success("Blog updated successfully");
            await dispatch(fetchBlogs(token));
            setIsModalEditOpen(false);
        } catch (error: any) {
            toast.error(
                `Blog update failed: ${
                    error?.message || "Something went wrong"
                }`
            );
            console.error("Blog update failed:", error);
        }
    };

    const handleCreate = async (blogData: BlogInterface) => {
        const token = getAccessToken();
        if (!token) return;

        if (!blogData || Object.keys(blogData).length === 0) {
            toast.error("Blog data is empty");
            return;
        }

        const formData = new FormData();

        Object.entries(blogData).forEach(([key, value]) => {
            if (
                key === "bannerImage" &&
                value instanceof FileList &&
                value.length > 0
            ) {
                formData.append(key, value[0]); // Append only if a file is selected
            } else if (key === "metaKeywords" && typeof value === "string") {
                formData.append(key, value); // Send as a simple comma-separated string
            } else if (value !== null && value !== undefined) {
                formData.append(key, value.toString());
            }
        });

        try {
            await dispatch(createBlog({ blog: formData, token })).unwrap();
            toast.success("Blog created successfully");
            setIsModalOpen(false);
            await dispatch(fetchBlogs(token));
        } catch (error: any) {
            toast.error(
                `Blog creation failed: ${
                    error?.message || "Something went wrong"
                }`
            );
            console.error("Blog creation error:", error);
        }
    };

    const handleEdit = async (id: string) => {
        const token = getAccessToken();
        if (!token) return;
        await dispatch(fetchBlogById({ blogId: id, token })).unwrap();
        setIsModalEditOpen(true);
    };

    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    const handleExport = useCallback(() => {
        if (!blogs) {
            console.error("No blogs available to export");
            return;
        }

        const headers = ["ID", "Title", "Category", "Author", "Status"];
        const data = blogs.map((blog) => ({
            ID: blog._id,
            Title: blog.title,
            Category: blog.category,
            Author: blog.author.fullName || "Not Specified",
            Status: blog.status,
        }));

        exportCsvFile({ data, headers, filename: "blogs.csv" });
    }, [blogs]);

    useEffect(() => {
        const token = getAccessToken();
        if (!token) return;
        dispatch(fetchBlogs(token));
    }, [dispatch]);

    const columns = React.useMemo(
        () => [
            {
                name: "#",
                selector: (row: BlogInterface) => row._id,
                sortable: true,
            },
            {
                name: "Blog Info",
                cell: (row: BlogInterface) => (
                    <div className='flex items-center space-x-2'>
                        <Image
                            width={40}
                            height={40}
                            src={
                                typeof row.bannerImage === "string"
                                    ? row.bannerImage
                                    : "/icons/default-blog.png"
                            }
                            alt='blog banner'
                            className='w-10 h-10 rounded-full object-cover'
                        />
                        <div>
                            <p className='font-semibold'>{row.title}</p>
                            <p className='text-sm whitespace-nowrap text-gray-500'>
                                {row.category.length > 12
                                    ? `${row.category.substring(0, 20)}...`
                                    : row.category}
                            </p>
                        </div>
                    </div>
                ),
                sortable: false,
                grow: 2,
                width: "280px",
            },
            {
                name: "Author",
                selector: (row: BlogInterface) =>
                    row.author.fullName || "Not Specified",
                sortable: true,
            },
            {
                name: "Status",
                cell: (row: BlogInterface) => (
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            row.status === "Published"
                                ? "text-green-700 bg-green-100"
                                : row.status === "Draft"
                                ? "text-yellow-700 bg-yellow-100"
                                : "text-red-700 bg-red-100"
                        }`}
                    >
                        {row.status}
                    </span>
                ),
                sortable: true,
                width: "150px",
            },
            {
                name: "Actions",
                cell: (row: BlogInterface) => (
                    <TableActions
                        onDelete={() => handleDelete(row._id)}
                        onEdit={() => handleEdit(row._id)}
                        onView={() => handleView(row._id)}
                        id={row._id}
                    />
                ),
                width: "150px",
            },
        ],
        [handleDelete]
    );

    const deferredSearchTerm = useDeferredValue(searchTerm);
    const filteredBlogs = useMemo(() => {
        if (!blogs) return [];
        const lowerCaseSearchTerm = deferredSearchTerm.toLowerCase().trim();
        return blogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                blog.author.fullName
                    ?.toLowerCase()
                    .includes(lowerCaseSearchTerm) ||
                blog.category.toLowerCase().includes(lowerCaseSearchTerm) ||
                blog.status.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [blogs, deferredSearchTerm]);

    return (
        <div className='bg-white rounded-lg'>
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <div className='flex flex-row justify-between items-center mb-4 space-x-2'>
                    <div className='flex justify-center items-center'>
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    <div className='flex flex-row space-x-2'>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='px-4 py-2 Button text-white rounded-md'
                        >
                            Add Blog
                        </button>
                        <button
                            onClick={handleExport}
                            className='px-4 py-2 bg-green-500 text-white rounded-md'
                        >
                            Export CSV
                        </button>
                    </div>
                </div>
                <CustomTable
                    columns={columns}
                    data={filteredBlogs}
                    noDataComponent='No blogs found'
                    loading={loading}
                />
            </div>

            <CustomModelAdmin
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                title=''
            >
                <Modal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreate}
                />
            </CustomModelAdmin>

            {currentBlog && (
                <CustomModelAdmin
                    isOpen={isModalEditOpen}
                    closeModal={() => setIsModalEditOpen(false)}
                    title=''
                >
                    <ModalEdit
                        onClose={() => setIsModalEditOpen(false)}
                        blogData={currentBlog}
                        onSubmit={handleUpdate}
                    />
                </CustomModelAdmin>
            )}

            {currentBlog && (
                <CustomModelAdmin
                    isOpen={isModalViewOpen}
                    closeModal={() => setIsModalViewOpen(false)}
                    title=''
                >
                    <ModalView
                        onClose={() => setIsModalViewOpen(false)}
                        blogData={currentBlog}
                    />
                </CustomModelAdmin>
            )}
        </div>
    );
};

export default ManageBlogs;
