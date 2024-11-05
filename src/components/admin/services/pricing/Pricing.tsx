"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

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
  // State to manage plans data
  const [plans, setPlans] = useState<Plan[]>([
    { id: 1, title: '3 Videos', strikethroughPrice: '9,000', finalPrice: '8,550', icon: <VideoIcon /> },
    { id: 2, title: '6 Videos', strikethroughPrice: '18,000', finalPrice: '15,599', icon: <VideoIcon /> },
    { id: 3, title: '12 Videos', strikethroughPrice: '36,000', finalPrice: '27,599', icon: <VideoIcon /> },
    { id: 4, title: '1 Video', strikethroughPrice: '18,000', finalPrice: '15,599', icon: <VideoIcon /> },
  ]);

  const [editingPlan, setEditingPlan] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<Plan>();

  // Handle edit click and pre-populate form fields
  const handleEditClick = (plan: Plan) => {
    setEditingPlan(plan.id);
    reset(plan); // Pre-populate form with the selected plan data
  };

  // Handle save and update the specific plan
  const handleSave = (data: Plan) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === editingPlan ? { ...plan, ...data } : plan
      )
    );
    setEditingPlan(null); // Exit edit mode
    reset(); // Reset the form
  };

  return (
    <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 border-2 rounded-lg shadow-md ${
              editingPlan === plan.id ? 'border BlueBorder' : 'border-transparent'
            }`}
          >
            {editingPlan === plan.id ? (
              <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 font-semibold">
                    Title
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: true })}
                    className="focus:outline-none py-0.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 font-semibold">
                    Strikethrough Price
                  </label>
                  <input
                    type="text"
                    {...register('strikethroughPrice')}
                    className="focus:outline-none py-0.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 font-semibold">
                    Final Price
                  </label>
                  <input
                    type="text"
                    {...register('finalPrice', { required: true })}
                    className="focus:outline-none py-0.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full ButtonBlue text-white py-2 rounded-md transition"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {plan.icon}
                  <h3 className="text-lg font-semibold">{plan.title}</h3>
                  <button
                    onClick={() => handleEditClick(plan)}
                    className="p-1 focus:outline-none"
                  >
                    <img
                      src="/pencil.png"
                      alt="edit icon"
                      className="w-4 h-4"
                    />
                  </button>
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
