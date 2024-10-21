"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray, Controller } from 'react-hook-form';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

type Service = {
    id: number;
    name: string;
    price: number;
};

type FormData = {
    platform: string;
    aspectRatio: string;
    newServiceTitle: string; // Change for new title input
    newServiceValue: number; // Change for new value input
    services: Service[];
};

const platforms = ['TikTok', 'Meta', 'Diğer'];
const aspectRatios = ['9:16', '16:9'];

const AddService: React.FC = () => {
    const { register, handleSubmit, setValue, reset, getValues, control, watch } = useForm<FormData>({
        defaultValues: {
            services: [
                { id: 1, name: 'Edit', price: 1000 },
                { id: 2, name: 'Share', price: 1000 },
                { id: 3, name: 'Cover Picture', price: 1000 },
                { id: 4, name: 'Creator Type', price: 1000 },
                { id: 5, name: 'Shipping', price: 1000 },
                { id: 6, name: 'Duration', price: 1000 },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'services',
    });

    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
    const [selectedAspectRatio, setSelectedAspectRatio] = useState(null);
    const [isAddingService, setIsAddingService] = useState(false);

    const handleAspectRatioSelect = (ratio: any) => {
        setSelectedAspectRatio(ratio);
    };

    const handlePlatformSelect = (platform: string) => {
        setSelectedPlatform(platform);
        setValue('platform', platform);
    };

    const handleAddService = () => {
        const newServiceTitle = getValues('newServiceTitle');
        const newServiceValue = getValues('newServiceValue');

        if (!newServiceTitle || !newServiceValue) return;

        append({ id: fields.length + 1, name: newServiceTitle, price: Number(newServiceValue) });
        setValue('newServiceTitle', ''); // Clear title input
        setValue('newServiceValue', 0); // Clear value input
        setIsAddingService(false); // Hide inputs after adding service
    };

    const handleSaveService: SubmitHandler<FormData> = (data) => {
        console.log('Saved Data:', data);
        setEditingServiceId(null);
        reset(); // Resets the form after saving
    };

    // Watch for updates on service prices
    const watchedServices = watch('services');

    return (
        <form onSubmit={handleSubmit(handleSaveService)} className="space-y-6 p-4">
            <div className='flex flex-col px-4 sm:px-6 md:px-12 lg:pl-72 lg:mt-28'>
                <h2 className="text-lg font-semibold mb-4">Additional Services</h2>
                <p className="mb-4">Select the price for additional services (for 1 UGC)</p>

                {/* Platform Selection */}
                <div className="mb-4">
                    <p className="mb-2">Add new additional service</p>
                    <div className='flex flex-row mb-2'>
                        <h3 className="font-semibold mr-4">Platform:</h3>
                        <div className="flex space-x-4">
                            {platforms.map((platform) => (
                                <button
                                    {...register('platform')}
                                    key={platform}
                                    type="button"
                                    onClick={() => handlePlatformSelect(platform)}
                                    className={`px-2 py-1 border text-xs rounded-sm ${selectedPlatform === platform ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                >
                                    {platform}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Aspect Ratio Selection */}
                <div className="mb-4">
                    <div className='flex flex-row mb-2'>
                        <h3 className="font-semibold mr-4">Aspect Ratio:</h3>
                        <div className="flex space-x-4">
                            {aspectRatios.map((ratio) => (
                                <button
                                    {...register('aspectRatio')}
                                    key={ratio}
                                    type="button"
                                    onClick={() => handleAspectRatioSelect(ratio)}
                                    className={`px-2 py-1 border text-xs rounded-sm ${selectedAspectRatio === ratio ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                >
                                    {ratio}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Add New Service */}
                <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                        <button type='button' onClick={() => setIsAddingService(!isAddingService)} className="flex items-center bg-transparent border-none cursor-pointer mr-2">
                            <img src="/plusIcon.png" alt="custom package icon" className="w-5 h-5" />
                        </button>
                    </div>
                    <h2 className="text-lg font-semibold">Packages</h2>
                </div>

                {isAddingService && (
                    <div className="flex flex-col w-1/2 space-y-2 mb-4">
                        <input
                            type="text"
                            {...register('newServiceTitle')}
                            placeholder="Service Title"
                            className="border px-2 py-1 rounded-md flex-1"
                        />
                        <input
                            type="number"
                            {...register('newServiceValue', { valueAsNumber: true })}
                            placeholder="Service Price"
                            className="border px-2 py-1 rounded-md flex-1"
                        />
                        <button
                            type="button"
                            onClick={handleAddService}
                            className="w-28 ButtonBlue px-2 py-1 text-white rounded-md"
                        >
                            Add
                        </button>
                    </div>
                )}

                {/* Service List */}
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Edit Additional Service Price</h3>
                    {fields.map((service, index) => (
                        <div key={service.id} className="flex justify-start items-start space-x-4 mb-2">
                            {/* Price Input or Display */}
                            {editingServiceId === service.id ? (
                                <div className='flex'>
                                    <p className='flex justify-between w-36'>{service.name}:</p>
                                    <Controller
                                        name={`services.${index}.price` as const}
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="number"
                                                className="border rounded-md w-28 px-2 py-1"
                                                value={watchedServices[index].price} // Watch service price for updates
                                            />
                                        )}
                                    />
                                </div>
                            ) : (
                                <div className='flex flex-row'>
                                    <p className='flex justify-between w-36'>{service.name}: </p><p className='w-28'>{service.price}</p>
                                </div>
                            )}

                            {/* Edit & Delete Buttons */}
                            <div className="space-x-2 w-28">
                                <button
                                    type="button"
                                    onClick={() => setEditingServiceId(service.id)}
                                    className="text-blue-500"
                                >
                                    <FiEdit2 />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex w-1/2 justify-end'>
                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-28 ButtonBlue text-white px-2 py-1 rounded-md mt-4"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddService;
