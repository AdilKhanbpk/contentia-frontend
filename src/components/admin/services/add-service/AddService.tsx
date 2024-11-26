"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, useFieldArray, Controller } from 'react-hook-form';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
    fetchAdditionalServices,
    updateAdditionalService,
    createAdditionalService,
    deleteAdditionalService,
    AdditionalService
} from '@/store/features/admin/addPriceSlice';

type Service = {
    id: number;
    name: string;
    price: number;
};

type FormData = {
    platform: string;
    aspectRatio: string;
    newServiceTitle: string;
    newServiceValue: number;
    services: Service[];
};

const platforms = ['TikTok', 'Meta', 'Diğer'];
const aspectRatios = ['9:16', '16:9'];

const AddService: React.FC = () => {
    const dispatch = useDispatch();
    const { list: additionalServices, loading, error } = useSelector((state: RootState) => state.addPrice);
    const [token, setToken] = useState<string>('');

    const { register, handleSubmit, setValue, reset, getValues, control, watch } = useForm<FormData>({
        defaultValues: {
            services: [
                { id: 1, name: 'Edit', price: 1000 },
                { id: 2, name: 'Share', price: 1000 },
                { id: 3, name: 'Cover Picture', price: 1000 },
                { id: 4, name: 'Creator Type', price: 1000 },
                { id: 5, name: 'Shipping', price: 1000 },
                { id: 6, name: 'Duration-30', price: 1000 },
                { id: 6, name: 'Duration-60', price: 1000 }
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'services',
    });

    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
    const [selectedAspectRatio, setSelectedAspectRatio] = useState<string | null>(null);
    const [isAddingService, setIsAddingService] = useState(false);

    // Fetch token and additional services on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken') || '';
        setToken(storedToken);

        if (storedToken) {
            console.log('[Debug] Dispatching fetchAdditionalServices with token:', storedToken);
            dispatch(fetchAdditionalServices(storedToken) as any);
        } else {
            console.warn('[Warning] No token available in localStorage!');
        }
    }, [dispatch]);

    // Populate form with existing additional services when they load
    useEffect(() => {
        if (additionalServices && additionalServices.length > 0) {
            console.log('[Debug] Additional Services received:', additionalServices);

            // Transform additional services into required format
            const transformedServices: Service[] = [
                { id: 1, name: 'Edit', price: additionalServices[0].editPrice || 1000 },
                { id: 2, name: 'Share', price: additionalServices[0].sharePrice || 1000 },
                { id: 3, name: 'Cover Picture', price: additionalServices[0].coverPicPrice || 1000 },
                { id: 4, name: 'Creator Type', price: additionalServices[0].creatorTypePrice || 1000 },
                { id: 5, name: 'Shipping', price: additionalServices[0].shippingPrice || 1000 },
                { id: 6, name: 'Duration-30', price: additionalServices[0].thirtySecondDurationPrice || 1000 },
                { id: 7, name: 'Duration-60', price: additionalServices[0].sixtySecondDurationPrice || 1000 },
            ];
            console.log('[Debug] Transformed Services:', transformedServices);

            // Reset form fields with transformed data
            reset({
                platform: additionalServices[0].platform || '',
                aspectRatio: additionalServices[0].aspectRatio || '',
                services: transformedServices,
            });
            console.log('[Debug] Form reset with:', {
                platform: additionalServices[0].platform || '',
                aspectRatio: additionalServices[0].aspectRatio || '',
                services: transformedServices,
            });

            // Set platform and aspect ratio states
            const selectedPlatform = additionalServices[0].platform || null;
            const selectedAspectRatio = additionalServices[0].aspectRatio || null;

            setSelectedPlatform(selectedPlatform);
            setSelectedAspectRatio(selectedAspectRatio);

            console.log('[Debug] Selected Platform:', selectedPlatform);
            console.log('[Debug] Selected Aspect Ratio:', selectedAspectRatio);
        } else {
            console.warn('[Warning] No additional services available to load.');
        }
    }, [additionalServices, reset]);


    const handleAspectRatioSelect = (ratio: any) => {
        setSelectedAspectRatio(ratio);
        setValue('aspectRatio', ratio);
    };

    const handlePlatformSelect = (platform: string) => {
        setSelectedPlatform(platform);
        setValue('platform', platform);
    };

    const handleAddService = () => {
        const newServiceTitle = getValues('newServiceTitle');
        const newServiceValue = getValues('newServiceValue');

        if (!newServiceTitle || !newServiceValue) return;

        // Dispatch create additional service
        const newService: AdditionalService = {
            name: newServiceTitle,
            price: Number(newServiceValue),
            platform: selectedPlatform || '',
            aspectRatio: selectedAspectRatio || '',
        };

        console.log('[Debug] Creating new service:', newService);
        dispatch(createAdditionalService({ data: newService, token }) as any);

        append({ id: fields.length + 1, name: newServiceTitle, price: Number(newServiceValue) });
        setValue('newServiceTitle', '');
        setValue('newServiceValue', 0);
        setIsAddingService(false);
    };

    const handleSaveService: SubmitHandler<FormData> = (data) => {
        console.log('Saved Data:', data);

        // Prepare services for update
        const servicesToUpdate = data.services.map((service, index) => ({
            ...additionalServices[index],
            name: service.name,
            price: service.price,
            platform: data.platform,
            aspectRatio: data.aspectRatio,
        }));

        // Dispatch updates for each service
        servicesToUpdate.forEach((service) => {
            if (service._id) {
                console.log('[Debug] Updating service:', service);
                dispatch(updateAdditionalService({
                    id: service._id,
                    data: service,
                    token
                }) as any);
            }
        });

        setEditingServiceId(null);
    };

    const handleDeleteService = (index: number) => {
        const serviceToDelete = additionalServices[index];

        if (serviceToDelete && serviceToDelete._id) {
            console.log('[Debug] Deleting service:', serviceToDelete);
            dispatch(deleteAdditionalService({
                id: serviceToDelete._id,
                token
            }) as any);
        }

        remove(index);
    };

    const watchedServices = watch('services');

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
        <form onSubmit={handleSubmit(handleSaveService)} className="space-y-6 p-4">
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <h2 className="text-xl font-semibold mb-4">Additional Services</h2>
                <p className="mb-4 text-lg">Select the price for additional services (for 1 UGC)</p>

                {/* Platform Selection */}
                <div className="mb-4">
                    <p className="mb-4 text-lg">Add new additional service</p>
                    <div className='flex flex-row items-center mb-2'>
                        <h3 className="font-semibold mr-4 text-lg">Platform:</h3>
                        <div className="flex space-x-4">
                            {platforms.map((platform) => (
                                <button
                                    {...register('platform')}
                                    key={platform}
                                    type="button"
                                    onClick={() => handlePlatformSelect(platform)}
                                    className={`px-3 py-1 border text-sm rounded-md ${selectedPlatform === platform ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                >
                                    {platform}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Aspect Ratio Selection */}
                <div className="mb-4">
                    <div className='flex flex-row items-center mb-2'>
                        <h3 className="font-semibold mr-4 text-lg">Aspect Ratio:</h3>
                        <div className="flex space-x-4">
                            {aspectRatios.map((ratio) => (
                                <button
                                    {...register('aspectRatio')}
                                    key={ratio}
                                    type="button"
                                    onClick={() => handleAspectRatioSelect(ratio)}
                                    className={`px-3 py-1 border text-sm rounded-md ${selectedAspectRatio === ratio ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                >
                                    {ratio}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Add New Service
                <div className="flex items-center space-x-2 mb-4">
                    <button type='button' onClick={() => setIsAddingService(!isAddingService)} className="bg-transparent border-none cursor-pointer">
                        <Image src="/plusIcon.png" width={20} height={20} alt='plus icon' ></Image>
                    </button>
                    <h2 className="text-lg font-semibold">Packages</h2>
                </div>

                {isAddingService && (
                    <div className="flex flex-col w-full sm:w-1/2 space-y-2 mb-4">
                        <input
                            type="text"
                            {...register('newServiceTitle')}
                            placeholder="Service Title"
                            className="focus:outline-none border px-3 rounded-md w-2/3 text-lg"
                        />
                        <input
                            type="number"
                            {...register('newServiceValue', { valueAsNumber: true })}
                            placeholder="Service Price"
                            className="focus:outline-none border px-3 rounded-md w-2/3 text-lg"
                        />
                        <div className='flex justify-end'>
                            <button
                                type="button"
                                onClick={handleAddService}
                                className="w-32 ButtonBlue px-3 py-2 text-white rounded-md"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                )} */}

                {/* Service List */}
                <div className="mt-4">
                    <h3 className="font-semibold mb-2 text-lg">Edit Additional Service Price</h3>
                    {fields.map((service, index) => (
                        <div key={service.id} className="flex items-center space-x-4 mb-2">
                            {editingServiceId === service.id ? (
                                <div className='flex items-center'>
                                    <p className='mr-8 whitespace-nowrap md:w-20 font-semibold text-sm'>{service.name}:</p>
                                    <Controller
                                        name={`services.${index}.price` as const}
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="number"
                                                className="focus:outline-none border rounded-md w-20 md:w-48 px-3 text-lg"
                                                value={watchedServices[index].price}
                                            />
                                        )}
                                    />
                                </div>
                            ) : (
                                <div className='flex items-center'>
                                    <p className='mr-8 whitespace-nowrap md:w-40 font-semibold text-sm'>{service.name}:</p>
                                    <p className='md:w-28'>{service.price}</p>
                                </div>
                            )}

                            <div className="space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingServiceId(service.id)}
                                    className="text-black"
                                >
                                    <FiEdit2 size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteService(index)}
                                    className="text-black"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex lg:w-1/2 justify-end'>
                    <button
                        type="submit"
                        className="w-32 ButtonBlue text-white px-3 py-2 rounded-md mt-4"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddService;