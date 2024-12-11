"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updatePricePlan, fetchPricePlans } from "@/store/features/admin/pricingSlice";
import { RootState } from "@/store/store";
import { PricePlan } from "@/store/features/admin/pricingSlice"; // Import the PricePlan type
import { toast } from 'react-toastify';


// Icon placeholders for plans
const VideoIcon = () => <span>📹</span>;

type Plan = {
  id: number;
  title: string;
  strikethroughPrice: string;
  finalPrice: string;
  icon: JSX.Element;
};

const PricingPlans = () => {
  const dispatch = useDispatch();

  const { data: serverPlans, loading, error } = useSelector((state: RootState) => {
    return state.pricing;
  });

  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingPlan, setEditingPlan] = useState<number | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Plan>();
  const [token, setToken] = useState<string>("");

  // Fetch token and plans on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken") || "";
    setToken(storedToken);

    if (storedToken) {
      console.log("[Debug] Dispatching fetchPricePlans with token:", storedToken);
      dispatch(fetchPricePlans(storedToken) as any)
        .then(() => {
          toast.success("Plans fetched successfully!");
        })
        .catch((error:any) => {
          console.error("[Error] Failed to fetch plans:", error);
          toast.error("Failed to fetch price plans! Please try again.");
        });
    } else {
      console.warn("[Warning] No token available in localStorage!");
      toast.error("No token available!");
    }
  }, [dispatch]);


  // Sync local plans with server plans when they load
  useEffect(() => {
    console.log("Server plans received:", serverPlans); // Debug initial serverPlans value

    if (serverPlans && serverPlans.length > 0) {
      const transformedPlans: Plan[] = serverPlans.map((plan: PricePlan, index: number) => {
        console.log(`Transforming plan ${index + 1}:`, plan); // Debug individual plans during transformation
        return {
          id: index + 1,
          title: `${plan.videoCount} Videos`,
          strikethroughPrice: plan.strikeThroughPrice?.toString() || "", // Use optional chaining and provide fallback
          finalPrice: plan.finalPrice.toString(),
          icon: <VideoIcon />,
        };
      });

      console.log("Transformed plans:", transformedPlans); // Debug transformed plans
      setPlans(transformedPlans); // Update local state
    } else {
      console.log("No server plans available or empty data."); // Log empty state
    }
  }, [serverPlans]);

  // Handle edit click and pre-populate form fields
  const handleEditClick = (plan: Plan) => {
    setEditingPlan(plan.id);
    reset(plan);
  };


  const handleSave = (data: Plan) => {
    const serverPlan = serverPlans?.find((plan: PricePlan, index: number) => index + 1 === editingPlan);

    if (serverPlan) {
      dispatch(
        updatePricePlan({
          id: serverPlan._id,
          data: {
            videoCount: parseInt(data.title.split(" ")[0]),
            strikeThroughPrice: parseFloat(data.strikethroughPrice || "0"),
            finalPrice: parseFloat(data.finalPrice),
          },
          token,
        }) as any
      )
        .then(() => {
          toast.success("Price plan updated successfully!");
        })
        .catch((err: Error) => {
          toast.error(err.message || "Failed to update price plan.");
        });
    }

    setPlans((prevPlans) =>
      prevPlans.map((plan) => (plan.id === editingPlan ? { ...plan, ...data } : plan))
    );

    setEditingPlan(null);
    reset();
  };


  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 border-2 rounded-lg shadow-md ${editingPlan === plan.id ? "border BlueBorder" : "border-transparent"
              }`}
          >
            {editingPlan === plan.id ? (
              <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 font-semibold">Title</label>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    className="focus:outline-none py-0.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 font-semibold">Strikethrough Price</label>
                  <input
                    type="text"
                    {...register("strikethroughPrice")}
                    className="focus:outline-none py-0.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 font-semibold">Final Price</label>
                  <input
                    type="text"
                    {...register("finalPrice", { required: true })}
                    className="focus:outline-none py-0.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <button type="submit" className="w-full ButtonBlue text-white py-2 rounded-md transition ">
                  Save
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {plan.icon}
                  <h3 className="text-lg font-semibold">{plan.title}</h3>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditClick(plan)} className="p-1 focus:outline-none">
                      <img src="/pencil.png" alt="edit icon" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Strikethrough Price</p>
                <p className="text-2xl line-through">{plan.strikethroughPrice}</p>
                <p className="text-sm text-gray-600">Final Price</p>
                <p className="text-2xl font-semibold">
                  {plan.finalPrice} <span className="text-sm font-normal">Lifetime</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;