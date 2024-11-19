"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from "@/store/features/admin/faqSlice";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import CustomModelAdmin from "../../modal/CustomModelAdmin";
import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Types
export interface FAQ {
  _id?: string;
  question: string;
  answer: string;
}

// Memoized SearchBar component
const SearchBar = memo(({ onSearch }: { onSearch: (value: string) => void }) => (
  <input
    type="text"
    placeholder="Search..."
    onChange={(e) => onSearch(e.target.value)}
    className="p-2 border border-gray-300 rounded-lg"
  />
));

SearchBar.displayName = 'SearchBar';

// Memoized TableActions component
const TableActions = memo(({ onDelete, onEdit, onView, id }: {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  id: string;
}) => (
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

// Updated ModalFAQs component
const ModalFAQs = memo(({
  initialData,
  onSubmit,
  onClose,
  mode
}: {
  initialData?: FAQ;
  onSubmit: (data: FAQ) => void;
  onClose: () => void;
  mode: 'create' | 'edit' | 'view';
}) => {
  const [question, setQuestion] = useState(initialData?.question || "");
  const [answer, setAnswer] = useState(initialData?.answer || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      _id: initialData?._id,
      question,
      answer
    });
  };

  const isViewMode = mode === 'view';

  return (
    <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
      <h1 className="text-lg font-semibold">FAQ</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-row space-x-8">
          <div className="mt-4 w-full">
            <label className="block text-sm font-semibold">Question</label>
            {isViewMode ? (
              <p className="mt-2">{question}</p>
            ) : (
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter question"
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
                required
              />
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold">Answer</label>
          {isViewMode ? (
            <div className="mt-2" dangerouslySetInnerHTML={{ __html: answer }} />
          ) : (
            <ReactQuill
              value={answer}
              onChange={setAnswer}
              placeholder="Write answer..."
              theme="snow"
              className="w-full border border-gray-400 rounded-lg focus:outline-none"
            />
          )}
        </div>

        {!isViewMode && (
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ButtonBlue text-white px-8 py-2 rounded-md"
            >
              {mode === 'edit' ? 'Update' : 'Save'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
});

ModalFAQs.displayName = 'ModalFAQs';

const FAQs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { faqs, loading } = useSelector((state: RootState) => state.faq);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [currentFAQ, setCurrentFAQ] = useState<FAQ | null>(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('accessToken');
    if (tokenFromStorage) {
      dispatch(fetchFaqs(tokenFromStorage));
    }
  }, [dispatch]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleModalOpen = useCallback((mode: 'create' | 'edit' | 'view', faq?: FAQ) => {
    setModalMode(mode);
    setCurrentFAQ(faq || null);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setCurrentFAQ(null);
  }, []);

  const handleSubmit = useCallback(async (data: FAQ) => {
    const tokenFromStorage = localStorage.getItem('accessToken');
    if (!tokenFromStorage) return;

    try {
      if (modalMode === 'edit' && currentFAQ?._id) {
        await dispatch(updateFaq({ faqId: currentFAQ._id, data, token: tokenFromStorage })).unwrap();
      } else {
        await dispatch(createFaq({ data, token: tokenFromStorage })).unwrap();
      }
      handleModalClose();
      dispatch(fetchFaqs(tokenFromStorage));
    } catch (error) {
      console.error("FAQ operation failed:", error);
    }
  }, [dispatch, modalMode, currentFAQ, handleModalClose]);

  const handleDelete = useCallback(async (id: string) => {
    const tokenFromStorage = localStorage.getItem('accessToken');
    if (!tokenFromStorage) return;
    
    try {
      await dispatch(deleteFaq({ faqId: id, token: tokenFromStorage })).unwrap();
      dispatch(fetchFaqs(tokenFromStorage));
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  }, [dispatch]);

  const handleExport = useCallback(() => {
    const headers = ["ID", "Question", "Answer"];
    const data = faqs.map(faq => ({
      ID: faq._id,
      Question: faq.question,
      Answer: faq.answer
    }));
    exportCsvFile({ data, headers, filename: "faqs.csv" });
  }, [faqs]);

  const columns = React.useMemo(() => [
    {
      name: "#",
      selector: (_row: any, index: number) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Question",
      selector: (row: FAQ) => row.question,
      sortable: true,
      grow: 2,
    },
    {
      name: "Answer",
      selector: (row: FAQ) => row.answer,
      sortable: true,
      grow: 2,
    },
    {
      name: "Actions",
      cell: (row: FAQ) => (
        <TableActions
          onDelete={() => handleDelete(row._id!)}
          onEdit={() => handleModalOpen('edit', row)}
          onView={() => handleModalOpen('view', row)}
          id={row._id!}
        />
      ),
      width: "150px",
    },
  ], [handleDelete, handleModalOpen]);

  const filteredFAQs = React.useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return faqs.filter((faq) => (
      faq.question.toLowerCase().includes(lowerCaseSearchTerm) ||
      faq.answer.toLowerCase().includes(lowerCaseSearchTerm)
    ));
  }, [faqs, searchTerm]);

  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72">
        <div className="flex flex-row justify-between items-center mb-4 space-x-2">
          <div className="flex justify-center items-center">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="flex flex-row space-x-2">
            <button
              onClick={() => handleModalOpen('create')}
              className="px-4 py-2 ButtonBlue text-white rounded-md"
            >
              Add FAQ
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
          data={filteredFAQs}
        />
      </div>

      <CustomModelAdmin 
        isOpen={isModalOpen} 
        closeModal={handleModalClose} 
        title=""
      >
        <ModalFAQs
          initialData={currentFAQ || undefined}
          onSubmit={handleSubmit}
          onClose={handleModalClose}
          mode={modalMode}
        />
      </CustomModelAdmin>
    </div>
  );
};

export default FAQs;