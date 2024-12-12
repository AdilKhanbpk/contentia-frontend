import React from "react";
import ContentCreatorPreferences from "./SubCreatorComp/ContentCreatorPreferences";
import SocialMediaInformation from "./SubCreatorComp/SocialMediaInformation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  becomeCreatorThunk,
  setCreatorInformation,
} from "@/store/becomeCreator/becomeCreatorSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Preferences: React.FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      console.log(data);
      dispatch(setCreatorInformation(data));

      const res = await dispatch(becomeCreatorThunk()).unwrap();
      console.log(res);

      if (res.status === 201) {
        toast.success('Successfully submitted creator information'); // Show success message
        router.push("/contentiaio/become-creator/submitted-successfully");
      } else {
        toast.error('Failed to submit creator information'); // Show error message for unsuccessful status
        router.push("/contentiaio/become-creator");
      }
    } catch (error) {
      toast.error('An error occurred while submitting creator information'); // Handle unexpected errors
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <div>
          <ContentCreatorPreferences
            errors={errors}
            register={register}
            watch={watch}
          />
        </div>
        <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
          <SocialMediaInformation
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex justify-end mt-[-50px] mr-36">
          <button
            type="submit"
            className="ButtonBlue text-white text-lg font-bold rounded-xl p-1 px-8"
          >
            Tamamla
          </button>
        </div>
      </div>
    </form>
  );
};

export default Preferences;
