"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchBlogs,
  deleteBlog,
  createBlog,
  updateBlog,
  Blog,
} from "@/store/features/admin/blogSlice";
import CustomModelAdmin from "../../../modal/CustomModelAdmin";
import Modal from "./sub-blogs/Modal";
import { ModalEdit } from "./sub-blogs/ModalEdit";
import { ModalView } from "./sub-blogs/ModalView";
import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";

// Extended Blog interface to include missing properties
interface ExtendedBlog extends Blog {
  number?: string;
  creator?: string;
  status?: string;
}

const SearchBar = memo(({ onSearch }: { onSearch: (value: string) => void }) => (
  <input
    type="text"
    placeholder="Search..."
    onChange={(e) => onSearch(e.target.value)}
    className="p-2 border border-gray-300 rounded-lg"
  />
));

SearchBar.displayName = "SearchBar";

const TableActions = memo(
  ({
    onApprove,
    onReject,
    onView,
    id,
  }: {
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    onView: (id: string) => void;
    id: string;
  }) => (
    <div className="flex space-x-3">
      <button
        className="text-green-500 hover:text-green-700"
        onClick={() => onApprove(id)}
      >
        <FaCheck className="text-lg" />
      </button>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => onReject(id)}
      >
        <FaTimes className="text-lg" />
      </button>
      <button
        className="text-gray-500 hover:text-gray-700"
        onClick={() => onView(id)}
      >
        <FaEye className="text-lg" />
      </button>
    </div>
  )
);

TableActions.displayName = "TableActions";

const ManageBlogs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector((state: RootState) =>
    state.blog.data as ExtendedBlog[] || []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<ExtendedBlog | null>(null);

  const handleApprove = useCallback(
    async (id: string) => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const formData = new FormData();
      formData.append("status", "Published");

      try {
        await dispatch(
          updateBlog({
            blogId: id,
            data: formData,
            token,
          })
        ).unwrap();
      } catch (error) {
        console.error("Approval failed:", error);
      }
    },
    [dispatch]
  );

  const handleReject = useCallback(
    async (id: string) => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const formData = new FormData();
      formData.append("status", "Rejected");

      try {
        await dispatch(
          updateBlog({
            blogId: id,
            data: formData,
            token,
          })
        ).unwrap();
      } catch (error) {
        console.error("Rejection failed:", error);
      }
    },
    [dispatch]
  );

  const handleView = useCallback(
    (id: string) => {
      const blog = blogs.find((blog) => blog._id === id);
      setCurrentBlog(blog || null);
      setIsViewModalOpen(true);
    },
    [blogs]
  );

  const handleCreate = async (blogData: Partial<ExtendedBlog>) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const formData = new FormData();
      Object.entries(blogData).forEach(([key, value]: [string, any]) => {
        if (key === "keywords" && Array.isArray(value)) {
          formData.append("metaKeywords", JSON.stringify(value));
        } else if (key === "bannerImage" && value instanceof File) {
          formData.append("bannerImage", value);
        } else if (value) {
          formData.append(key, value.toString());
        }
      });

      await dispatch(createBlog({ data: formData, token })).unwrap();
      setIsCreateModalOpen(false);
      await dispatch(fetchBlogs(token));
    } catch (error) {
      console.error("Blog creation failed:", error);
    }
  };

  const handleEdit = async (blogData: Partial<ExtendedBlog>) => {
    const token = localStorage.getItem("accessToken");
    if (!token || !currentBlog) return;

    try {
      const formData = new FormData();
      Object.entries(blogData).forEach(([key, value]) => {
        if (value) formData.append(key, value.toString());
      });

      await dispatch(
        updateBlog({
          blogId: currentBlog._id,
          data: formData,
          token,
        })
      ).unwrap();
      setIsEditModalOpen(false);
      await dispatch(fetchBlogs(token));
    } catch (error) {
      console.error("Blog update failed:", error);
    }
  };

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleExport = useCallback(() => {
    const headers = ["#", "Creator", "Title", "Category", "Status"];
    const data = blogs.map((blog) => ({
      "#": blog.number || "",
      Creator: blog.creator || "",
      Title: blog.title || "",
      Category: blog.category || "",
      Status: blog.status || "",
    }));

    exportCsvFile({ data, headers, filename: "blogs.csv" });
  }, [blogs]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(fetchBlogs(token));
    }
  }, [dispatch]);

  const filteredBlogs = blogs.filter((blog) =>
    [blog.title, blog.creator, blog.category]
      .filter(Boolean)
      .some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-col py-24 px-4">
        <div className="flex justify-between items-center mb-4">
          <SearchBar onSearch={handleSearch} />
          <div className="flex space-x-2">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 ButtonBlue text-white rounded-md"
            >
              New Blog
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Export CSV
            </button>
          </div>
        </div>
        <CustomTable columns={[]} data={filteredBlogs} />
      </div>

      {isCreateModalOpen && (
        <CustomModelAdmin isOpen={isCreateModalOpen} closeModal={() => setIsCreateModalOpen(false)} title="">
          <Modal
            onSubmit={handleCreate}
            onClose={() => setIsCreateModalOpen(false)}
          />
        </CustomModelAdmin>
      )}

      {isEditModalOpen && currentBlog && (
        <CustomModelAdmin isOpen={isEditModalOpen} closeModal={() => setIsEditModalOpen(false)} title="">
          <ModalEdit
            blogData={currentBlog}
            onSubmit={handleEdit}
            onClose={() => setIsEditModalOpen(false)}
          />
        </CustomModelAdmin>
      )}

      {isViewModalOpen && currentBlog && (
        <CustomModelAdmin isOpen={isViewModalOpen} closeModal={() => setIsViewModalOpen(false)} title="">
          <ModalView
            blogData={currentBlog}
            onClose={() => setIsViewModalOpen(false)}
          />
        </CustomModelAdmin>
      )}
    </div>
  );
};

export default ManageBlogs;