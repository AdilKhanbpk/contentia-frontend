"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchProfile,
  updateProfile,
  changePassword,
} from "@/store/features/profile/profileSlice";
import { RootState } from "@/store/store";
import { ProfileInfo } from "./sub-profile/ProfileInfo";
import { InvoiceInfo } from "./sub-profile/InvoiceInfo";
import { PasswordChange } from "./sub-profile/PasswordChange";
import { AppDispatch } from "@/store/store";
import { toast } from "react-toastify";

const OrdersProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
  } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [invoiceType, setInvoiceType] = useState("individual");
  const profile = useSelector((state: RootState) => state.profile);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
    if (token) {
      dispatch(fetchProfile(token));
    }
  }, [token]);

  const onSubmitProfileInvoice = async (data: any) => {
    if (token) {
      try {
        await dispatch(updateProfile({ data, token }));
        dispatch(fetchProfile(token));
        toast.success('Profile updated successfully!');
      } catch (error) {
        toast.error('Failed to update profile. Please try again.');
      }
    } else {
      toast.error('No token found. Please log in again.');
    }
  };

  useEffect(() => {
    console.log(profile.data);
    if (profile.data) {
      setValue("email", profile.data.email || "");
      setValue("fullName", profile.data.fullName || "");
      setValue("billingInformation", profile.data.billingInformation || "");
      setValue("phoneNumber", profile.data.phoneNumber || "");
      setValue("invoiceType", profile.data.invoiceType || "");
      setValue("trId", profile.data.trId || "");
      setValue("companyName", profile.data.companyName || "");
      setValue("taxNumber", profile.data.taxNumber || "");
      setValue("taxOffice", profile.data.taxOffice || "");
      setValue("profilePic", profile.data.profilePic || "");
    }
  }, [profile.data]);

  const onSubmitPasswordChange = async (data: any) => {
    if (token) {
      try {
        const result = await dispatch(
          changePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            confirmNewPassword: data.confirmNewPassword,
            token,
          })
        );

        if (result.meta.requestStatus === "fulfilled") {
          toast.success("Password change successful!");
        } else {
          toast.error(`Password change failed: ${result.payload}`);
        }
      } catch (error) {
        toast.error(`An error occurred during password change: ${error}`);
      }
    } else {
      toast.error("No token found. Please log in again.");
    }
  };

  return (
    <div className="my-14 sm:my-20 md:my-20 lg:my-24 px-4 sm:px-6 md:px-8 lg:px-28 p-4 sm:p-6 md:p-8 lg:p-8 bg-gray-50">
     
      {/* Profile and Invoice Information */}
      <form onSubmit={handleSubmit(onSubmitProfileInvoice)}>
        <div className="bg-white rounded-lg shadow-lg px-4 py-3 sm:px-6 sm:py-4 lg:px-12 lg:py-6">
          <div className="mb-4 p-4 sm:mb-6 sm:p-6 lg:mb-6 lg:p-8 border-2 border-gray-200">
            <ProfileInfo
              register={register}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
            />
          </div>
          <div className="mb-4 p-4 sm:mb-6 sm:p-6 lg:mb-6 lg:p-8 flex flex-col lg:flex-row lg:space-x-32 border-2 border-gray-200">
            <InvoiceInfo
              register={register}
              invoiceType={invoiceType}
              setInvoiceType={setInvoiceType}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
            />
            <div className="w-full lg:w-1/4 flex justify-end items-end">
              <button
                type="submit"
                className="font-semibold px-8 py-0.5 ButtonBlue text-white rounded-lg"
              >
                Güncelle
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Password Change */}
      <form
        onSubmit={handleSubmitPassword(onSubmitPasswordChange)}
        className="mt-8"
      >
        <div className="bg-white rounded-lg shadow-lg px-4 py-3 sm:px-6 sm:py-4 lg:px-12 lg:py-6">
          <div className="mb-4 p-4 sm:mb-6 sm:p-6 lg:mb-6 lg:p-8 border-2 border-gray-200">
            <PasswordChange
              register={registerPassword}
              isEditing={isEditing}
            />
            <div className="w-full flex justify-end items-end">
              <button
                type="submit"
                className="font-semibold px-8 py-0.5 ButtonBlue text-white rounded-lg"
              >
                Şifre Güncelle
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrdersProfile;
