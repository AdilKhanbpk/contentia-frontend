"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchLandingPage,
  updateLandingPage,
} from "@/store/features/admin/lanPageSlice";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface FormData {
  carouselHeroTitle: string;
  staticHeroTitle: string;
  heroSubTitle: string;
  videos?: FileList;
}

export default function LandingPages() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(
    (state: RootState) => state.landingPage
  );

  const { register, control, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    defaultValues: {
      carouselHeroTitle: "",
      staticHeroTitle: "",
      heroSubTitle: "",
    },
  });

  const fixedId = data?._id || "";

  useEffect(() => {
    dispatch(fetchLandingPage())
}, [dispatch]);

  useEffect(() => {
    if (data) {
      reset({
        carouselHeroTitle: data.carouselHeroTitle || "",
        staticHeroTitle: data.staticHeroTitle || "",
        heroSubTitle: data.heroSubTitle || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: FormData) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("No token found. Please log in to submit the form.");
      return;
    }

    if (!fixedId || !token) return;

    const payload = new FormData();
    payload.append("carouselHeroTitle", formData.carouselHeroTitle);
    payload.append("staticHeroTitle", formData.staticHeroTitle);
    payload.append("heroSubTitle", formData.heroSubTitle);

    if (formData.videos) {
      Array.from(formData.videos).forEach((file) => {
        payload.append("videos", file);
      });
    }

    try {
      await dispatch(updateLandingPage({ id: fixedId, data: payload, token }));
      toast.success("Landing page updated successfully!");
    } catch (error) {
      toast.error("Error updating landing page. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.includes('video')) {
      console.log("Video file selected:", file.name);
    } else {
      alert("Please select a valid video file.");
    }
  };

  return (
    <div className="flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72">
      <h1 className="text-lg font-semibold">Landing Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="mt-4 w-full md:w-1/2">
            <label className="block text-sm font-semibold">Carousel Hero Title</label>
            <input
              {...register("carouselHeroTitle")}
              type="text"
              placeholder="Enter Carousel Hero Title"
              className="w-full px-3 py-1 border border-gray-400 rounded-md focus:outline-none"
            />
          </div>

          <div className="mt-4 w-full md:w-1/2">
            <label className="block text-sm font-semibold">Static Hero Title</label>
            <input
              {...register("staticHeroTitle")}
              type="text"
              placeholder="Enter Static Hero Title"
              className="w-full px-3 py-1 border border-gray-400 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold">Hero Subtitle</label>
          <Controller
            name="heroSubTitle"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactQuill
                value={value}
                onChange={(content) => {
                  onChange(content);
                  setValue("heroSubTitle", content, { shouldDirty: true });
                }}
                placeholder="Write something..."
                theme="snow"
                className="w-full border border-gray-400 rounded-lg focus:outline-none"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    [{ align: [] }],
                    [{ color: [] }, { background: [] }],
                    ["clean"],
                  ],
                }}
              />
            )}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Video Uploads</h2>
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="mt-6">
              <label className="block text-sm font-semibold mb-2">Video {index + 1}</label>
              <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-1">
                <input
                  type="file"
                  accept="video/mp4,video/mkv,video/*"
                  onChange={handleFileChange}
                  className="flex-1 w-full md:w-1/2 bg-gray-100 px-3 py-1 border-none outline-none focus:outline-none"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end my-12">
          <button
            type="submit"
            className="ButtonBlue text-white px-10 py-1 rounded-lg font-semibold"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}