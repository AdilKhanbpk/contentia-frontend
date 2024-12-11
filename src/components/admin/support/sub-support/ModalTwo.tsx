import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Claim, updateAdminClaim } from "@/store/features/admin/claimSlice"; // Adjust import based on file structure
import { toast } from 'react-toastify';

interface ModalTwoProps {
  claim: Claim | null; // Accept a Claim object or null
}

export default function ModalTwo({ claim }: ModalTwoProps) {
  // Use ThunkDispatch to properly type the dispatch for async thunks
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Pick<Claim, "claimContent">>({
    defaultValues: { claimContent: claim?.claimContent || "" },
  });

  // Function to handle form submission
  const onSubmit: SubmitHandler<Pick<Claim, "claimContent">> = (data) => {
    const token = localStorage.getItem("accessToken"); // Get token from localStorage
    if (claim?.id && token) {
      // Use .unwrap() to handle potential errors and provide proper typing
      dispatch(
        updateAdminClaim({
          claimId: claim.id,
          data,
          token,
        })
      ).unwrap()
        .then(() => {
          console.log("Claim content updated:", data.claimContent);
          toast.success("Claim content updated successfully!"); // Success toast
        })
        .catch((error) => {
          console.error("Failed to update claim:", error);
          toast.error(`Failed to update claim: ${error.message || "Unknown error"}`); // Error toast
        });
    } else {
      toast.error("Missing claim ID or access token!"); // Error toast for missing claim or token
    }
  };

  // Reset the form when claim changes
  React.useEffect(() => {
    reset({ claimContent: claim?.claimContent || "" });
  }, [claim, reset]);

  if (!claim) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
      <h1 className="text-lg font-semibold">View Claim</h1>

      {/* Display Customer Details */}
      <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
        <div>
          <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">
            Customer Name
          </label>
          <p className="mt-3">{claim.customer?.fullName || "N/A"}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">
            Customer ID
          </label>
          <p className="mt-3">{claim.customer?.id || "N/A"}</p>
        </div>
      </div>

      {/* Display Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
        <div>
          <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">
            Order ID
          </label>
          <p className="mt-3">{claim.order?.id || "N/A"}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">
            Claim Date
          </label>
          <p className="mt-3">
            {claim.claimDate
              ? new Date(claim.claimDate).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Claim Content Form */}
      <div className="bg-white py-4 sm:py-5 md:py-6 lg:py-6 rounded-md">
        <h2 className="text-base font-semibold mb-1">Claim Content</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 sm:mb-3 md:mb-3 lg:mb-4">
            <textarea
              {...register("claimContent", {
                required: "Claim content is required",
              })}
              className="w-full p-2 sm:p-3 md:p-4 lg:p-4 border border-gray-400 rounded-lg focus:outline-none"
              rows={3}
              placeholder="Enter claim details"
            />
            {errors.claimContent && (
              <p className="text-red-500 text-sm mt-1">
                {errors.claimContent.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}