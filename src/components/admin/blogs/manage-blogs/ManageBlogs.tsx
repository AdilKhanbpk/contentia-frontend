"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchBlogs,  // This is the function you want to use
  deleteBlog,
  createBlog,
  updateBlog,
  Blog
} from "@/store/features/admin/blogSlice";
import CustomModelAdmin from '../../../modal/CustomModelAdmin';
import Modal from "./sub-blogs/Modal";
import { ModalEdit } from "./sub-blogs/ModalEdit";
import { ModalView } from "./sub-blogs/ModalView";
import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";
import { toast } from "react-toastify";

// Memoized SearchBar component
const SearchBar = memo(({ onSearch }: { onSearch: (value: string) => void }) => (
  <input
    type="text"
    placeholder="Search blogs..."
    onChange={(e) => onSearch(e.target.value)}
    className="p-2 border border-gray-300 rounded-lg"
  />
));

SearchBar.displayName = 'SearchBar';

// Memoized Table Actions component
const TableActions = memo(({ onDelete, onEdit, onView, id }: { onDelete: (id: string) => void; onEdit: (id: string) => void; onView: (id: string) => void; id: string }) => (
  <div className="flex space-x-3">
    <button
      className="text-gray-500 hover:text-gray-700"
      onClick={() => onView(id)}
    >
      <FaEye className="text-lg" />
    </button>
    <button
      className="text-blue-500 hover:text-blue-700"
      onClick={() => onEdit(id)}
    >
      <FaEdit className="text-lg" />
    </button>
    <button
      className="text-red-500 hover:text-red-700"
      onClick={() => onDelete(id)}
    >
      <FaTrashAlt className="text-md" />
    </button>
  </div>
));

TableActions.displayName = 'TableActions';

const ManageBlogs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: blogs = [] } = useSelector((state: RootState) => state.blog);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);

  // Handler for deleting a blog
  const handleDelete = useCallback((id: string) => {
    const tokenFromStorage = localStorage.getItem('accessToken');
    if (!tokenFromStorage) {
      toast.error("Authorization token is missing.");
      return;
    }

    dispatch(deleteBlog({ blogId: id, token: tokenFromStorage }))
      .unwrap()
      .then(() => {
        toast.success("Blog deleted successfully");
        dispatch(fetchBlogs(tokenFromStorage));
      })
      .catch((error: any) => {
        toast.error("Delete failed");
        console.error("Delete failed:", error);
      });
  }, [dispatch]);

  // Handler for viewing a blog
  const handleView = (id: string) => {
    const blog = blogs?.find((blog) => blog._id === id);
    setCurrentBlog(blog || null);
    setIsModalViewOpen(true);
  };

  const handleCreate = async (blogData: Blog) => {
    const tokenFromStorage = localStorage.getItem('accessToken');

    try {
      // Validate token
      if (!tokenFromStorage) {
        toast.error('Authorization token is missing');
        return;
      }

      // Validate blog data
      if (!blogData || Object.keys(blogData).length === 0) {
        toast.error('Blog data is empty');
        return;
      }

      // Create FormData for blog creation
      const formData = new FormData();
      Object.entries(blogData).forEach(([key, value]) => {
        if (key === 'bannerImage' && value && value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]);
        } else if (value && typeof value === 'string') {
          formData.append(key, value);
        }
      });

      const result = await dispatch(
        createBlog({
          data: formData,
          token: tokenFromStorage
        })
      ).unwrap();

      toast.success('Blog created successfully');
      setIsModalOpen(false);

      // Refresh the blog list
      await dispatch(fetchBlogs(tokenFromStorage));

    } catch (error) {
      toast.error('Blog creation failed');
      console.error('Blog creation failed:', error);
    }
  };

  const handleUpdate = async (blogData: Blog) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const blogId = blogData._id;
      const formData = new FormData();

      // Append all relevant fields to formData
      Object.entries(blogData).forEach(([key, value]) => {
        if (key === 'bannerImage' && value && value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]);
        } else if (value && typeof value === 'string') {
          formData.append(key, value);
        }
      });

      try {
        await dispatch(updateBlog({ blogId, data: formData, token })).unwrap();
        toast.success('Blog updated successfully');
        await dispatch(fetchBlogs(token));
      } catch (error) {
        toast.error('Blog update failed');
        console.error('Blog update failed:', error);
      }
    } else {
      toast.error('Authorization token is missing!');
    }
  };

  // Handler for editing a blog
  const handleEdit = (id: string) => {
    const blog = blogs?.find((blog) => blog._id === id);
    setCurrentBlog(blog || null);
    setIsModalEditOpen(true);
  };

  // Handler for search input
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // Export to CSV
  const handleExport = useCallback(() => {
    if (!blogs) {
      console.error("No blogs available to export");
      return;
    }

    const headers = ["ID", "Title", "Category", "Author", "Status"];
    const data = blogs.map(blog => ({
      ID: blog._id,
      Title: blog.title,
      Category: blog.category,
      Author: blog.author,
      Status: blog.status
    }));

    exportCsvFile({ data, headers, filename: "blogs.csv" });
  }, [blogs]);

  // Fetch blogs on mount
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('accessToken');
    if (tokenFromStorage) {
      dispatch(fetchBlogs(tokenFromStorage));
    }
  }, [dispatch]);

  // Memoized columns configuration
  const columns = React.useMemo(() => [
    {
      name: "#",
      selector: (row: Blog) => row._id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Blog Info",
      cell: (row: Blog) => (
        <div className="flex items-center space-x-2">
          <Image
            width={40}
            height={40}
            src={typeof row.bannerImage === 'string' ? row.bannerImage : "/icons/default-blog.png"}
            alt="blog banner"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{row.title}</p>
            <p className="text-sm whitespace-nowrap text-gray-500">
              {row.category.length > 12 ? `${row.category.substring(0, 20)}...` : row.category}
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
      selector: (row: Blog) => row.author,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: Blog) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${row.status === "Published"
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
      cell: (row: Blog) => (
        <TableActions
          onDelete={() => handleDelete(row._id)}
          onEdit={() => handleEdit(row._id)}
          onView={() => handleView(row._id)}
          id={row._id}
        />
      ),
      width: "150px",
    },
  ], [handleDelete, handleEdit, handleView]);

  const filteredBlogs = React.useMemo(() => {
    if (!blogs) return []; // Return an empty array if blogs is null
  
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return blogs.filter((blog) => (
      (blog.title?.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (blog.author?.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (blog.category?.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (blog.status?.toLowerCase().includes(lowerCaseSearchTerm))
    ));
  }, [blogs, searchTerm]);
  
  return (
    <div className="bg-white rounded-lg">
      <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
        <div className="flex flex-row justify-between items-center mb-4 space-x-2">
          <div className="flex justify-center items-center">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="flex flex-row space-x-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 ButtonBlue text-white rounded-md"
            >
              Add Blog
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Export CSV
            </button>
          </div>
        </div>
        <CustomTable
          columns={columns}
          data={filteredBlogs}
        />
      </div>

      {/* Modal for adding a new blog */}
      <CustomModelAdmin
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title=""
      >
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreate}
        />
      </CustomModelAdmin>

      {/* Modal for editing a blog */}
      <CustomModelAdmin
        isOpen={isModalEditOpen}
        closeModal={() => setIsModalEditOpen(false)}
        title=""
      >
        {currentBlog && (
          <ModalEdit
            onClose={() => setIsModalEditOpen(false)}
            blogData={currentBlog}
            onSubmit={handleUpdate}
          />
        )}
      </CustomModelAdmin>

      {/* Modal for viewing a blog */}
      <CustomModelAdmin
        isOpen={isModalViewOpen}
        closeModal={() => setIsModalViewOpen(false)}
        title=""
      >
        {currentBlog && (
          <ModalView
            onClose={() => setIsModalViewOpen(false)}
            blogData={currentBlog}
          />
        )}
      </CustomModelAdmin>
    </div>
  );
};

export default ManageBlogs;