import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { CreatorInterface } from "@/types/interfaces";
import { toast } from "react-toastify";
import {
    fetchAdminCreators,
    updateAdminCreator,
} from "@/store/features/admin/creatorsSlice";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

interface FourthTabProps {
    editCreatorForm: CreatorInterface | null;
    onSubmit?: any;
}

const FourthTab: React.FC<FourthTabProps> = ({ editCreatorForm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const form = useForm({
        defaultValues: {
            isNotificationOn:
                editCreatorForm?.settings?.isNotificationOn ?? false,
        },
    });

    useEffect(() => {
        if (editCreatorForm) {
            form.reset({
                isNotificationOn:
                    editCreatorForm.settings?.isNotificationOn ?? false,
            });
        }
    }, [editCreatorForm]);

    const onSubmit = useCallback(
        async (formData: { isNotificationOn: boolean }) => {
            if (!editCreatorForm?._id) {
                toast.error(
                    "No creator ID found. Please ensure a creator is selected."
                );
                return;
            }

            try {
                const response = await dispatch(
                    updateAdminCreator({
                        creatorId: editCreatorForm._id,
                        data: {
                            settings: {
                                isNotificationOn: formData.isNotificationOn,
                            },
                        },
                    })
                );

                if (updateAdminCreator.fulfilled.match(response)) {
                    toast.success("Creator updated successfully.");
                    await dispatch(fetchAdminCreators());
                } else {
                    toast.error("Failed to update creator. Please try again.");
                }
            } catch (error: any) {
                toast.error(
                    `Error updating creator: ${
                        error.message || "Unknown error"
                    }`
                );
            }
        },
        [dispatch, editCreatorForm]
    );

    return (
        <div className='w-full sm:w-2/3 p-6'>
            <h1 className='text-lg font-bold'>Settings</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className='flex flex-col gap-2 my-2'>
                        <FormField
                            control={form.control}
                            name='isNotificationOn'
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                    <div>
                                        <FormLabel>Notifications</FormLabel>
                                        <FormDescription>
                                            Receive emails about new products,
                                            features, and updates.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex justify-end mt-6'>
                        <button
                            type='submit'
                            className='Button text-white px-4 py-2 rounded-md'
                        >
                            {form.formState.isSubmitting
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default FourthTab;
