'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import CustomModelAdmin from '../../../modal/CustomModelAdmin'
import Modal from "./sub-packages/Modal"

// Plan structure
interface Plan {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  price: number;
}

const initialPlans: Plan[] = [
  {
    id: 'starter',
    icon: <img src="/icons/package.png" alt="Starter Icon" className="w-10 h-8" />,
    title: 'Starter',
    description:
      'Package includes 3 videos with standard features. It shows the base price of 3 videos and Additional Services will be added',
    price: 69,
  },
  {
    id: 'launch',
    icon: <img src="/icons/package.png" alt="Launch Icon" className="w-10 h-8" />,
    title: 'Launch',
    description:
      'Package includes 6 videos with standard features. It shows the base price of 3 videos and Additional Services will be added',
    price: 129,
  },
  {
    id: 'growth',
    icon: <img src="/icons/package.png" alt="Growth Icon" className="w-10 h-8" />,
    title: 'Growth',
    description:
      'Package includes 12 videos with standard features. It shows the base price of 3 videos and Additional Services will be added',
    price: 599,
  },
];

// TypeScript type for form data
interface PlanFormData {
  title: string;
  description: string;
  price: number;
  platform: string; // Add this field
  edit: string;    // Add this field
  duration: string; // Add this field
  aspectRatio: string; // Add this field
  share: string; // Add this field
  coverPicture: string; // Add this field
  creatorType: string; // Add this field
  shipping: string; // Add this field
  customerName: string;
  numberOfUGC: number;
}

const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [editingPlan, setEditingPlan] = useState<string | null>(null); // Track which plan is being edited
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { register, handleSubmit, reset, control, watch } = useForm<PlanFormData>();

  const handleEditClick = (planId: string) => {
    const planToEdit = plans.find((plan) => plan.id === planId);
    if (planToEdit) {
      reset(planToEdit); // Populate form with current plan data
      setEditingPlan(planId);
    }
  };

  const onSubmit: SubmitHandler<PlanFormData> = (data: any) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === editingPlan ? { ...plan, ...data } : plan
      )
    );
    setEditingPlan(null); // Exit edit mode after submission
  };



  // Watch the fields to update the total price in real-time
  const numberOfUGC = watch('numberOfUGC');
  const price = watch('price');
  const totalPrice = (numberOfUGC || 0) * (price || 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <div className='flex flex-col px-4 sm:px-6 md:px-12 lg:pl-72 lg:mt-28'>
        <h2 className="mb-6 text-lg font-semibold">Packages</h2>
        <div className="mb-6 flex items-center">
          <button onClick={openModal}
            className="flex items-center bg-transparent border-none cursor-pointer mr-2"
          >
            <img
              src="/plusIcon.png"
              alt="custom package icon"
              className="w-5 h-5"
            />
          </button>
          <CustomModelAdmin isOpen={isModalOpen} closeModal={closeModal} title="">
            <Modal></Modal>
          </CustomModelAdmin>

          <h2 className="text-lg font-semibold">Custom Package</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 border-2 rounded-lg shadow-md ${editingPlan === plan.id ? 'border BlueBorder' : 'border-transparent'
                }`}
            >
              {editingPlan === plan.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm  text-gray-700 font-semibold">Title</label>
                    <input
                      type="text"
                      defaultValue={plan.title}
                      {...register('title', { required: true })}
                      className="focus:outline-none py-0.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm  text-gray-700 font-semibold">Description</label>
                    <textarea
                      defaultValue={plan.description}
                      {...register('description', { required: true })}
                      className="focus:outline-none py-0.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                      rows={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm  text-gray-700 font-semibold">Price</label>
                    <input
                      type="number"
                      defaultValue={plan.price}
                      {...register('price', { required: true })}
                      className="focus:outline-none py-0.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full ButtonBlue text-white py-2 rounded-md transition"
                  >
                    Save
                  </button>
                </div>
              ) : (
                // Display Mode
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <p>{plan.icon}</p>
                    <h3 className="text-lg font-semibold">{plan.title}</h3>
                    <button
                      onClick={() => handleEditClick(plan.id)}
                      className="p-1 focus:outline-none"
                    >
                      <img
                        src="/pencil.png"
                        alt="edit icon"
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                  <p className="text-2xl font-semibold">
                    ${plan.price} <span className="text-sm font-normal">Lifetime</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default Pricing;
