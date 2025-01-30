import ContentCreatorPreferences from "./SubCreatorComp/ContentCreatorPreferences";
import SocialMediaInformation from "./SubCreatorComp/SocialMediaInformation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
    becomeCreatorThunk,
    selectBecomeCreatorIsLoading,
    setCreatorFormData,
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
    const loading = useSelector(selectBecomeCreatorIsLoading);

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            dispatch(setCreatorFormData(data));
            const res = await dispatch(becomeCreatorThunk()).unwrap();

            if (res.status === 201) {
                toast.success(res.message);
                router.push(
                    "/contentiaio/become-creator/submitted-successfully"
                );
            }
        } catch (error: any) {
            const errorMessage =
                error?.message || "Failed to submit creator information";
            toast.error(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-6'>
                <div>
                    <ContentCreatorPreferences
                        errors={errors}
                        register={register}
                        watch={watch}
                    />
                </div>
                <div className='mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28'>
                    <SocialMediaInformation
                        register={register}
                        errors={errors}
                    />
                </div>
                <div className='flex justify-end mt-[-50px] mr-36'>
                    <button
                        type='submit'
                        className='ButtonBlue text-white text-lg font-bold rounded-xl p-1 px-8'
                    >
                        {loading ? "Tamamlama..." : " Tamamla"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Preferences;
