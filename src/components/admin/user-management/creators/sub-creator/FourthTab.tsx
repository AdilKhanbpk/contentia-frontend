import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { CreatorInterface } from "@/types/interfaces";
import { toast } from "react-toastify";
import { getAccessToken } from "@/utils/checkToken";
import {
    fetchAdminCreators,
    updateAdminCreator,
} from "@/store/features/admin/creatorsSlice";

interface ForthTabProps {
    editCreatorForm: CreatorInterface | null;
    onSubmit?: (data: CreatorInterface) => void;
}

const FourthTab: React.FC<ForthTabProps> = ({ editCreatorForm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm();

    useEffect(() => {
        if (editCreatorForm) {
            reset({
                settings: {
                    isNotificationOn:
                        editCreatorForm?.settings?.isNotificationOn,
                },
            });
        }
    }, [editCreatorForm, reset]);

    const onSubmit = async (formData: any) => {
        if (!editCreatorForm?._id) {
            toast.error(
                "No creator ID found. Please ensure a creator is selected."
            );
            return;
        }

        const token = getAccessToken();
        if (!token) return;

        try {
            const response = await dispatch(
                updateAdminCreator({
                    creatorId: editCreatorForm._id,
                    data: {
                        settings: {
                            isNotificationOn:
                                formData.settings.isNotificationOn,
                        },
                    },
                    token,
                })
            );
            if (updateAdminCreator.fulfilled.match(response)) {
                toast.success("Creator updated successfully.");
                await dispatch(fetchAdminCreators(token));
            } else {
                toast.error("Failed to update creator. Please try again.");
            }
        } catch (error: any) {
            toast.error(
                `Error updating creator: ${error.message || "Unknown error"}`
            );
        }
    };

    return (
        <div className='w-full sm:w-2/3 p-6'>
            <h1 className='text-lg font-bold text-center'>Settings</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-between items-center mt-6'>
                    <span className='text-sm font-medium'>Notifications</span>
                    <Controller
                        name='settings.isNotificationOn'
                        control={control}
                        render={({ field }) => (
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        )}
                    />
                </div>
                <div className=' flex justify-end mt-6'>
                    <button
                        type='submit'
                        className='ButtonBlue text-white px-4 py-2 rounded-md'
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FourthTab;
