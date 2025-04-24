"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    updatePricePlan,
    fetchPricePlans,
} from "@/store/features/admin/pricingSlice";
import { AppDispatch, RootState } from "@/store/store";
import { PricePlan } from "@/store/features/admin/pricingSlice";
import { toast } from "react-toastify";

const VideoIcon = () => <span className='text-3xl'>📹</span>;

type Plan = {
    id: string;
    title: string;
    videoCount: number;
    description: string;
    strikethroughPrice: string;
    finalPrice: string;
    icon: JSX.Element;
};

const PricingPlans = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        data: serverPlans,
        loading,
        error,
    } = useSelector((state: RootState) => state.pricing);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [editingPlan, setEditingPlan] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Plan>();

    useEffect(() => {
        dispatch(fetchPricePlans())
            .unwrap()
            .then(() => toast.success("Plans fetched successfully!"))
            .catch(() => toast.error("Failed to fetch price plans!"));
    }, [dispatch]);

    useEffect(() => {
        if (serverPlans?.length) {
            const transformedPlans: Plan[] = serverPlans.map(
                (plan: PricePlan) => ({
                    id: plan._id,
                    title: plan.title,
                    description: plan.description,
                    videoCount: plan.videoCount,
                    strikethroughPrice:
                        plan.strikeThroughPrice?.toString() || "",
                    finalPrice: plan.finalPrice.toString(),
                    icon: <VideoIcon />,
                })
            );
            setPlans(transformedPlans);
        }
    }, [serverPlans]);

    const handleEditClick = (plan: Plan) => {
        setEditingPlan(plan.id);
        reset(plan);
    };

    const handleSave = async (data: Plan) => {
        const serverPlan = serverPlans?.find(
            (plan: PricePlan) => plan._id === editingPlan
        );
        if (!serverPlan) return;

        try {
            await dispatch(
                updatePricePlan({
                    id: serverPlan._id,
                    data: {
                        title: data.title,
                        description: data.description,
                        videoCount: Number(data.videoCount) || 0,
                        strikeThroughPrice:
                            Number(data.strikethroughPrice) || 0,
                        finalPrice: Number(data.finalPrice) || 0,
                    },
                })
            ).unwrap();

            setPlans((prevPlans) =>
                prevPlans.map((plan) =>
                    plan.id === editingPlan ? { ...plan, ...data } : plan
                )
            );
            setEditingPlan(null);
            reset();

            toast.success("Price plan updated successfully!");
        } catch (err: any) {
            toast.error(err.message || "Failed to update price plan.");
        }
    };

    if (loading)
        return (
            <div className='flex justify-center items-center p-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
            </div>
        );
    if (error)
        return (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                {error}
            </div>
        );

    return (
        <div className='flex flex-col py-24 px-4 sm:px-6 md:px-12 lg:pl-72'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`p-6 border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 duration-200 ease-in-out ${
                            editingPlan === plan.id
                                ? "border-blue-500"
                                : "border-gray-200"
                        }`}
                    >
                        {editingPlan === plan.id ? (
                            <form
                                onSubmit={handleSubmit(handleSave)}
                                className='space-y-4'
                            >
                                <input
                                    type='text'
                                    {...register("title", { required: true })}
                                    className='w-full p-2 border rounded'
                                    placeholder='Title'
                                />
                                <textarea
                                    {...register("description", {
                                        required: true,
                                    })}
                                    className='w-full p-2 border rounded'
                                    placeholder='Description'
                                ></textarea>
                                <input
                                    type='number'
                                    {...register("videoCount", {
                                        required: true,
                                    })}
                                    className='w-full p-2 border rounded'
                                    placeholder='Video Count'
                                />
                                <input
                                    type='text'
                                    {...register("strikethroughPrice")}
                                    className='w-full p-2 border rounded'
                                    placeholder='Strikethrough Price'
                                />
                                <input
                                    type='text'
                                    {...register("finalPrice", {
                                        required: true,
                                    })}
                                    className='w-full p-2 border rounded'
                                    placeholder='Final Price'
                                />
                                <button
                                    type='submit'
                                    className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700'
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Saving..." : "Save"}
                                </button>
                            </form>
                        ) : (
                            <div className='space-y-4'>
                                <div className='flex items-center space-x-3'>
                                    {plan.icon}
                                    <h3 className='text-lg font-bold'>
                                        {plan.title}
                                    </h3>
                                </div>
                                <p className='text-gray-600'>
                                    {plan.description}
                                </p>
                                <p className='text-sm font-medium text-gray-700'>
                                    Video Count:{" "}
                                    <span className='pl-3 text-xl font-semibold'>
                                        {plan.videoCount || "N/A"}
                                    </span>
                                </p>
                                <p className='text-xl line-through text-gray-500'>
                                    ${plan.strikethroughPrice}
                                </p>
                                <p className='text-2xl font-semibold text-blue-600'>
                                    ${plan.finalPrice}
                                </p>
                                <button
                                    onClick={() => handleEditClick(plan)}
                                    className='mt-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded'
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingPlans;
