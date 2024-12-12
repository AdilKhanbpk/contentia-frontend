"use client";

import { useEffect, useState, useCallback, memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchBanners,
  createBanner,
  updateBanner,
  Banner
} from "@/store/features/admin/bannerSlice";
import CustomModelAdmin from "../../modal/CustomModelAdmin";
import { toast } from "react-toastify";

const BannerCard = memo(({
  banner,
  index,
  onEdit,
}: {
  banner: Banner;
  index: number;
  onEdit: (banner: Banner) => void;
}) => (
  <div className="bg-white rounded-lg shadow-md p-4">
    <h2 className="font-bold text-sm">App Image {index + 1}</h2>
    <img
      src={banner.bannerImage}
      alt={`Banner ${index + 1}`}
      className="w-full h-32 object-cover rounded-md mb-4"
      loading="lazy"
    />
    <h3 className="text-sm text-gray-600 mb-4">App URL {index + 1}: {banner.bannerUrl}</h3>
    <button
      onClick={() => onEdit(banner)}
      className="w-full ButtonBlue text-white px-4 py-2 rounded-md"
    >
      Update
    </button>
  </div>
));

BannerCard.displayName = "BannerCard";

const FormInput = memo(({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}) => (
  <div className="mt-4">
    <label className="block text-sm font-semibold">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
      required={required}
    />
  </div>
));

FormInput.displayName = "FormInput";

const ImageUpload = memo(({
  previewUrl,
  onImageChange,
}: {
  previewUrl: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="mt-4">
    <label className="block text-sm font-semibold">Banner Image</label>
    <div
      className="relative border border-gray-400 rounded-md p-4 text-center bg-gray-200 mt-2"
      style={{ width: "100%", height: "150px" }}
    >
      <input
        type="file"
        onChange={onImageChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept="image/*"
      />
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <span className="text-gray-500">2000 x 500</span>
        </div>
      )}
    </div>
  </div>
));

ImageUpload.displayName = "ImageUpload";

const ModalBanner = memo(({
  initialData,
  onSubmit,
  onClose,
  mode,
}: {
  initialData?: Partial<Banner>;
  onSubmit: (data: FormData) => void;
  onClose: () => void;
  mode: "create" | "edit";
}) => {
  const [bannerUrl, setBannerUrl] = useState(initialData?.bannerUrl || "");
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.bannerImage || "");

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bannerUrl", bannerUrl);
    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }
    onSubmit(formData);
  }, [bannerUrl, bannerImage, onSubmit]);

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerUrl(e.target.value);
  }, []);

  return (
    <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
      <h1 className="text-lg font-semibold">
        {mode === "edit" ? "Edit Banner" : "Create Banner"}
      </h1>

      <form onSubmit={handleSubmit}>
        <ImageUpload previewUrl={previewUrl} onImageChange={handleImageChange} />
        <FormInput
          label="Banner URL"
          value={bannerUrl}
          onChange={handleUrlChange}
          placeholder="Enter banner URL"
          required
        />

        <div className="flex justify-between mt-6 space-x-4">
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
            {mode === "edit" ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
});

ModalBanner.displayName = "ModalBanner";

const Banners: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { banners, loading, error } = useSelector((state: RootState) => state.banner);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("accessToken");
    if (tokenFromStorage) {
      dispatch(fetchBanners(tokenFromStorage))
        .then(() => {
          toast.success("Banners fetched successfully!");
        })
        .catch((error: any) => {
          toast.error("Failed to fetch banners!");
        });
    } else {
      toast.error("No token found in local storage!");
    }
  }, [dispatch]);

  const handleModalOpen = useCallback((mode: "create" | "edit", banner?: Banner) => {
    setModalMode(mode);
    setCurrentBanner(banner || null);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setCurrentBanner(null);
  }, []);

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      const tokenFromStorage = localStorage.getItem("accessToken");
      if (!tokenFromStorage) {
        toast.error("No token found in local storage!");
        return;
      }
  
      try {
        if (modalMode === "edit" && currentBanner?._id) {
          await dispatch(
            updateBanner({
              bannerId: currentBanner._id,
              data: formData,
              token: tokenFromStorage,
            })
          ).unwrap();
          toast.success("Banner updated successfully!");
        } else {
          await dispatch(
            createBanner({ 
              data: formData, 
              token: tokenFromStorage 
            })
          ).unwrap();
          toast.success("Banner created successfully!");
        }
        handleModalClose();
      } catch (error) {
        toast.error("Failed to save banner!");
      }
    },
    [dispatch, modalMode, currentBanner, handleModalClose]
  );

  const handleEdit = useCallback((banner: Banner) => {
    handleModalOpen("edit", banner);
  }, [handleModalOpen]);

  const memoizedBanners = useMemo(() => {
    return banners.map((banner, index) => (
      <BannerCard
        key={banner._id}
        banner={banner}
        index={index}
        onEdit={handleEdit}
      />
    ));
  }, [banners, handleEdit]);

  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">Banners</h1>
          <button
            onClick={() => handleModalOpen("create")}
            className="ButtonBlue text-white px-6 py-2 rounded-lg font-semibold"
          >
            Create
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {memoizedBanners}
        </div>
      </div>

      <CustomModelAdmin isOpen={isModalOpen} closeModal={handleModalClose} title="">
        <ModalBanner
          initialData={currentBanner || undefined}
          onSubmit={handleSubmit}
          onClose={handleModalClose}
          mode={modalMode}
        />
      </CustomModelAdmin>
    </div>
  );
};

export default memo(Banners);