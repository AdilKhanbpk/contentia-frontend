import ContentCreatorPreferences from "./SubCreatorComp/BecomeCreatorContentCreatorPreferences";
import SocialMediaInformation from "./SubCreatorComp/BecomeCreatorSocialMediaInformation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
    becomeCreatorThunk,
    setCreatorFormData,
} from "@/store/becomeCreator/becomeCreatorSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface PreferencesProps {
    setActiveTab: (id: number) => void;
}

const Preferences: React.FC<PreferencesProps> = ({ setActiveTab }) => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const creatorFormData = useSelector(
        (state: any) => state.becomeCreator.creatorFormData
    );
    const { fullName, email, password } = creatorFormData;

    useEffect(() => {
        if (!fullName || !email || !password) {
            console.log("creatorFormData is null or undefined");
            setActiveTab(1);
        }
    }, [creatorFormData, router]);

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            dispatch(setCreatorFormData(data));

            const checkingContentType = (data: any) => {
                if (
                    data.preferences.contentInformation.contentType.length > 0
                ) {
                    return true;
                }
                return false;
            };

            const isValidContentType = checkingContentType(data);
            if (!isValidContentType) {
                toast.error("Please select at least one content type.");
                return;
            }

            const checkingPlatformsIfEmptyWhenSocialInformationContentTypeIsYes =
                (data: any) => {
                    if (
                        data.preferences.socialInformation.contentType === "yes"
                    ) {
                        const platforms =
                            data.preferences.socialInformation.platforms;

                        const isValid = Object.keys(platforms).some(
                            (platformKey) => {
                                const platform = platforms[platformKey];
                                return (
                                    (platform.username &&
                                        platform.username.trim() !== "" &&
                                        platform.followers) ||
                                    (platform.followers &&
                                        platform.followers.trim() !== "")
                                );
                            }
                        );

                        return isValid;
                    }
                    return true;
                };

            const isValidPlatforms =
                checkingPlatformsIfEmptyWhenSocialInformationContentTypeIsYes(
                    data
                );

            if (!isValidPlatforms) {
                toast.error(
                    "At least one platform should have both username and followers."
                );
                return;
            }

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
                <div className='flex justify-center xs:mt-[-38px] lg:justify-end lg:mt-[-50px] lg:mr-36'>
                    <button
                        type='submit'
                        className='Button text-white lg:text-lg font-bold rounded-xl p-1 xs:px-4 lg:px-8'
                    >
                        {isSubmitting ? "Tamamlama..." : " Tamamla"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Preferences;
