"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { 
  fetchHowItWorks, 
  updateHowItWorks 
} from "@/store/features/admin/howWorkSlice";
import { RootState } from "@/store/store";

// Enhanced Debug Logger
const logDebug = (action: string, details?: any, error?: any) => {
  if (process.env.NODE_ENV === "development") {
    console.groupCollapsed(`🛠️ Debug - ${action}`);
    console.log("Timestamp:", new Date().toISOString());
    if (details) console.log("Details:", details);
    if (error) console.error("Error:", error);
    console.groupEnd();
  }
};

interface FormData {
  howItWorksTitle1: string;
  howItWorksSubtitle1: string;
  steps: {
    title: string;
    description: string;
  }[];
}

export default function HowItWorks() {
  const dispatch = useDispatch();
  const { sections, loading, error } = useSelector(
    (state: RootState) => state.howWork
  );

  logDebug("Component Rendered", { sections, loading, error });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      howItWorksTitle1: "",
      howItWorksSubtitle1: "",
      steps: Array(4).fill({ title: "", description: "" })
    }
  });

  // Fetch data on mount
  useEffect(() => {
    logDebug("Initialization - Component Mounted");
    const token = localStorage.getItem("accessToken");

    if (token) {
      logDebug("Fetching Data", { token });
      dispatch(fetchHowItWorks(token) as any);
    } else {
      logDebug("No Token Found in Local Storage");
    }

    return () => {
      logDebug("Cleanup - Component Unmounted");
    };
  }, [dispatch]);

  // Populate form with fetched data
  useEffect(() => {
    if (sections?.length > 0) {
      const firstSection = sections[0];
      const formattedData = {
        howItWorksTitle1: firstSection.sectionTitle,
        howItWorksSubtitle1: firstSection.sectionDescription,
        steps: firstSection.steps.slice(0, 4).map(step => ({
          title: step.title,
          description: step.description
        }))
      };

      logDebug("Data Fetched - Populating Form", { formattedData });
      reset(formattedData);
    } else {
      logDebug("No Sections to Populate Form", { sections });
    }
  }, [sections, reset]);

  const onSubmit = (data: FormData) => {
    logDebug("Form Submitted", data);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      logDebug("Submit Error - No Token Found");
      return;
    }

    const formattedData = {
      sectionTitle: data.howItWorksTitle1,
      sectionDescription: data.howItWorksSubtitle1,
      steps: data.steps
    };

    logDebug("Formatted Submission Data", formattedData);

    if (sections?.length > 0) {
      const sectionId = sections[0]._id;
      logDebug("Dispatching Update", { sectionId, formattedData });

      dispatch(updateHowItWorks({ sectionId, data: formattedData, token }) as any);
    } else {
      logDebug("Update Failed - No Sections Available");
    }
  };

  // Log errors and state changes
  useEffect(() => {
    if (error) logDebug("Error State Changed", null, error);
  }, [error]);

  useEffect(() => {
    logDebug("Loading State Updated", { loading });
  }, [loading]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) logDebug("Form Validation Errors", errors);
  }, [errors]);

  return (
    <div className="flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72">
      <h2 className="text-lg font-semibold mb-6">How It Works</h2>

      <form onSubmit={handleSubmit((data) => {
        logDebug("Form Submission Handler Triggered", data);
        onSubmit(data);
      })}>
        {/* Section Title */}
        <div className="mt-4 w-full md:w-1/2">
          <label className="block text-sm font-semibold">
            How It Works Section Title - 1
          </label>
          <input
            type="text"
            placeholder="Nasıl Çalışır?"
            {...register("howItWorksTitle1", {
              required: "Title is required",
              onChange: (e) =>
                logDebug("Input Changed - Title", { value: e.target.value })
            })}
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
          />
          {errors.howItWorksTitle1 && (
            <span className="text-red-500 text-sm">
              {errors.howItWorksTitle1.message}
            </span>
          )}
        </div>

        {/* Section Subtitle */}
        <div className="mt-4 w-full md:w-1/2">
          <label className="block text-sm font-semibold">
            How It Works Section Subtitle - 1
          </label>
          <input
            type="text"
            placeholder="Tek bir platformda, UGC içeriklerine kolayca erişin"
            {...register("howItWorksSubtitle1", {
              required: "Subtitle is required",
              onChange: (e) =>
                logDebug("Input Changed - Subtitle", { value: e.target.value })
            })}
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
          />
          {errors.howItWorksSubtitle1 && (
            <span className="text-red-500 text-sm">
              {errors.howItWorksSubtitle1.message}
            </span>
          )}
        </div>

        {/* Steps */}
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="mt-4 w-full md:w-1/2">
            <label className="block text-sm font-semibold">
              How It Works Step Title - {index + 1}
            </label>
            <input
              type="text"
              placeholder={`Step ${index + 1} Title`}
              {...register(`steps.${index}.title`, {
                required: "Step title is required",
                onChange: (e) =>
                  logDebug(`Input Changed - Step ${index + 1} Title`, {
                    value: e.target.value
                  })
              })}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
            />
            {errors.steps?.[index]?.title && (
              <span className="text-red-500 text-sm">
                {errors.steps[index].title?.message}
              </span>
            )}

            <label className="block text-sm font-semibold mt-2">
              How It Works Step Description - {index + 1}
            </label>
            <input
              type="text"
              placeholder={`Step ${index + 1} Description`}
              {...register(`steps.${index}.description`, {
                required: "Step description is required",
                onChange: (e) =>
                  logDebug(`Input Changed - Step ${index + 1} Description`, {
                    value: e.target.value
                  })
              })}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
            />
            {errors.steps?.[index]?.description && (
              <span className="text-red-500 text-sm">
                {errors.steps[index].description?.message}
              </span>
            )}
          </div>
        ))}

        {/* Save Button */}
        <div className="flex justify-end my-6">
          <button
            type="submit"
            disabled={loading}
            className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold"
            onClick={() => logDebug("Save Button Clicked", { loading })}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
