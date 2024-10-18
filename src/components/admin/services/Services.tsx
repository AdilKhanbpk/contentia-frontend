'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import CustomModelAdmin from '../../modal/CustomModelAdmin'

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
    icon: <img src="/uploadIcon.png" alt="Starter Icon" className="w-10 h-8" />,
    title: 'Starter',
    description:
      'Package includes 3 videos with standard features. It shows the base price of 3 videos and Additional Services will be added',
    price: 69,
  },
  {
    id: 'launch',
    icon: <img src="/uploadIcon.png" alt="Launch Icon" className="w-10 h-8" />,
    title: 'Launch',
    description:
      'Package includes 6 videos with standard features. It shows the base price of 3 videos and Additional Services will be added',
    price: 129,
  },
  {
    id: 'growth',
    icon: <img src="/uploadIcon.png" alt="Growth Icon" className="w-10 h-8" />,
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
  const [selectedPlatform, setSelectedPlatform] = useState('');
  // State for the edit option (Yes/No)
  const [isEdit, setIsEdit] = useState(''); // Default is true for 'Yes' or false for 'No'
  const [aspectRatio, setAspectRatio] = useState('');
  const [isShare, setIsShare] = useState('');
  const [isCoverPicture, setIsCoverPicture] = useState('');
  const [creatorType, setCreatorType] = useState('');
  const [isShipping, setIsShipping] = useState('');
  const [duration, setDuration] = useState('');

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

  const onSubmitForm: SubmitHandler<PlanFormData> = (data) => {
    console.log('Form Data:', data);
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
            <form onSubmit={handleSubmit(onSubmitForm)}>

              <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
                <h2 className="text-lg mb-6 font-semibold">Create Custom Package</h2>

                <div className="flex flex-col lg:flex-row justify-start items-start lg:space-x-28">
                  {/* Left Side Fields */}
                  <div className="mt-2 grid grid-cols-1 lg:grid-cols-1">
                    {/* Select Customer */}
                    <div>
                      <label className="block text-sm font-semibold mt-2">Select Customer:</label>
                      <input
                        type="text"
                        placeholder="Enter customer name"
                        className="w-full px-3 py-1 border rounded-md focus:outline-none"
                        {...register('customerName')}
                      />
                    </div>

                    {/* No of UGC */}
                    <div>
                      <label className="block text-sm font-semibold mt-2">No of UGC:</label>
                      <input
                        type="number"
                        placeholder="Enter number of UGC"
                        className="w-full px-3 py-1 border rounded-md focus:outline-none"
                        {...register('numberOfUGC')}
                      />
                    </div>

                    {/* Select Price */}
                    <div>
                      <label className="block text-sm font-semibold mt-2">Select Price:</label>
                      <input
                        type="number"
                        placeholder="Enter price"
                        className="w-full px-3 py-1 border rounded-md focus:outline-none"
                        {...register('price')}
                      />
                    </div>

                    {/* Total Price Display */}
                    <div className="mt-4">
                      <span className="block text-sm font-semibold">Total Price:</span>
                      <span className="text-lg BlueText font-semibold">{totalPrice.toFixed(2)} TL</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8">
                    <h3 className=" font-semibold mb-4 BlueText">Select Additional Services</h3>
                    <div className="grid grid-cols-2 gap-y-4">
                      {/* Platform Radio Buttons */}
                      <div className="text-gray-700 font-semibold">Platform:</div>
                      <div className="flex space-x-4">
                        <Controller
                          name="platform"
                          control={control}
                          defaultValue="TikTok"
                          render={({ field }) => (
                            <>
                              {['TikTok', 'Meta', 'Diğer'].map((platform) => (
                                <button
                                  key={platform}
                                  type="button"
                                  className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${selectedPlatform === platform ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                  onClick={() => {
                                    setSelectedPlatform(platform);
                                    field.onChange(platform);
                                  }}
                                >
                                  {platform}
                                </button>
                              ))}
                            </>
                          )}
                        />
                      </div>

                      {/* Duration Radio Buttons */}
                      <div className="text-gray-700 font-semibold">Duration:</div>
                      <div className="flex space-x-4">
                        <Controller
                          name="duration"
                          control={control}
                          defaultValue="15s"
                          render={({ field }) => (
                            <>
                              {['15s', '30s', '60s'].map((dur) => (
                                <button
                                  key={dur}
                                  type="button"
                                  className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${duration === dur ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                  onClick={() => {
                                    setDuration(dur);
                                    field.onChange(dur);
                                  }}
                                >
                                  {dur}
                                </button>
                              ))}
                            </>
                          )}
                        />
                      </div>

                      {/* Edit Option */}
                      <div className="text-gray-700 font-semibold">Edit:</div>
                      <div className="flex space-x-4">
                        <Controller
                          name="edit"
                          control={control}
                          render={({ field }) => (
                            <>
                              {['Yes', 'No'].map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${isEdit === option ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                  onClick={() => {
                                    setIsEdit(option);
                                    field.onChange(option);
                                  }}
                                >
                                  {option}
                                </button>
                              ))}
                            </>
                          )}
                        />
                      </div>

                      {/* Aspect Ratio */}
                      <div className="text-gray-700 font-semibold">Aspect Ratio:</div>
                      <div className="flex space-x-4">
                        <Controller
                          name="aspectRatio"
                          control={control}
                          defaultValue="9:16"
                          render={({ field }) => (
                            <>
                              {['9:16', '16:9'].map((ratio) => (
                                <button
                                  key={ratio}
                                  type="button"
                                  className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${aspectRatio === ratio ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                  onClick={() => {
                                    setAspectRatio(ratio);
                                    field.onChange(ratio);
                                  }}
                                >
                                  {ratio}
                                </button>
                              ))}
                            </>
                          )}
                        />
                      </div>

                      {/* Share Option */}
                      <div className="text-gray-700 font-semibold">Share:</div>
                      <div className="flex space-x-4">
                        <Controller
                          name="share"
                          control={control}
                          render={({ field }) => (
                            <>
                              {['Yes', 'No'].map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${isShare === option ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                  onClick={() => {
                                    setIsShare(option);
                                    field.onChange(option);
                                  }}
                                >
                                  {option}
                                </button>
                              ))}
                            </>
                          )}
                        />
                      </div>

                      {/* Cover Picture Option */}
                      <div className="text-gray-700 font-semibold">Cover Picture:</div>
                      <div className="flex space-x-4">
                        <Controller
                          name="coverPicture"
                          control={control}
                          render={({ field }) => (
                            <>
                              {['Yes', 'No'].map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${isCoverPicture == option ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                  onClick={() => {
                                    setIsCoverPicture(option);
                                    field.onChange(option);
                                  }}
                                >
                                  {option}
                                </button>
                              ))}
                            </>
                          )}
                        />
                      </div>

                      {/* Creator Type */}
                      <div className="text-gray-700 font-semibold">Creator Type:</div>
                      <div className="flex space-x-4">
                        <Controller
                          name="creatorType"
                          control={control}
                          defaultValue="Nano"
                          render={({ field }) => (
                            <>
                              {['Nano', 'Micro'].map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${creatorType === type ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                  onClick={() => {
                                    setCreatorType(type);
                                    field.onChange(type);
                                  }}
                                >
                                  {type}
                                </button>
                              ))}
                            </>
                          )}
                        />
                      </div>

                      {/* Shipping Option */}
                      <div className="text-gray-700 font-semibold">Shipping:</div>
                      <div className="flex space-x-4">
                        <Controller
                          name="shipping"
                          control={control}
                          render={({ field }) => (
                            <>
                              {['Yes', 'No'].map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${isShipping === option ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                  onClick={() => {
                                    setIsShipping(option);
                                    field.onChange(option);
                                  }}
                                >
                                  {option}
                                </button>
                              ))}
                            </>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  
                </div>
                {/* Save Button */}
                <div className="mt-6 text-right">
                    <button type="submit" className="ButtonBlue text-white px-6 py-0.5 rounded">Save</button>
                  </div>


              </div>
            </form>

          </CustomModelAdmin>

          <h2 className="text-lg font-semibold">Custom Package</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 border-2 rounded-lg shadow-md ${editingPlan === plan.id ? 'border-blue-500' : 'border-transparent'
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm  text-gray-700 font-semibold">Description</label>
                    <textarea
                      defaultValue={plan.description}
                      {...register('description', { required: true })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm  text-gray-700 font-semibold">Price</label>
                    <input
                      type="number"
                      defaultValue={plan.price}
                      {...register('price', { required: true })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    {plan.icon}
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
