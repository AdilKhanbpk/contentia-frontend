"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPackages,
    updatePackage,
    Package,
} from "@/store/features/admin/packageSlice";
import { AppDispatch, RootState } from "@/store/store";
import CustomModelAdmin from "../../../modal/CustomModelAdmin";
import Modal from "./sub-packages/Modal";
import { toast } from "react-toastify";

const PackageIcon = () => (
    <img
        src='/icons/package.png'
        alt='Package Icon'
        className='w-10 h-8'
    />
);

type PackageFormData = {
    id?: string;
    title: string;
    description: string;
    price: number;
};

const Packages = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        data: serverPackages,
        loading,
        error,
    } = useSelector((state: RootState) => {
        return state.package;
    });
    const [packages, setPackages] = useState<PackageFormData[]>([]);
    const [editingPackage, setEditingPackage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PackageFormData>();
    const [token, setToken] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken") || "";
        setToken(storedToken);
        if (storedToken) {
            dispatch(fetchPackages())
                .then(() => {
                    toast.success("Packages fetched successfully!");
                })
                .catch((err: Error) => {
                    toast.error(err.message || "Failed to fetch packages.");
                });
        } else {
            toast.error("No access token found!");
        }
    }, [dispatch]);

    useEffect(() => {
        if (serverPackages && serverPackages.length > 0) {
            const transformedPackages: PackageFormData[] = serverPackages.map(
                (pkg: Package) => ({
                    id: pkg._id,
                    title: pkg.title,
                    description: pkg.description,
                    price: pkg.price,
                })
            );
            setPackages(transformedPackages);
        } else {
            console.log("No server packages available or empty data.");
        }
    }, [serverPackages]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleEditClick = (pkg: PackageFormData) => {
        setEditingPackage(pkg.id || "");
        reset(pkg);
    };

    const handleSave = async (data: PackageFormData) => {
        const packageToUpdate = serverPackages?.find(
            (pkg: Package) => pkg._id === editingPackage
        );

        if (packageToUpdate) {
            setIsSaving(true); // Set loading state

            try {
                await dispatch(
                    updatePackage({
                        id: packageToUpdate._id,
                        data: {
                            title: data.title,
                            description: data.description,
                            price: data.price,
                        },
                        token,
                    }) as any
                );

                toast.success("Package updated successfully!");

                // Update the local state with the updated package data
                setPackages((prevPackages) =>
                    prevPackages.map((pkg) =>
                        pkg.id === editingPackage ? { ...pkg, ...data } : pkg
                    )
                );

                setEditingPackage(null); // Exit editing mode
                reset(); // Reset the form
            } catch (err: any) {
                toast.error(err.message || "Failed to update package.");
            } finally {
                setIsSaving(false); // Reset loading state
            }
        }
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center p-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
            </div>
        );
    }

    return (
        <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
            <h2 className='mb-6 text-lg font-semibold'>Packages</h2>
            <div className='mb-6 flex items-center'>
                <button
                    onClick={openModal}
                    className='flex items-center bg-transparent border-none cursor-pointer mr-2'
                >
                    <img
                        src='/plusIcon.png'
                        alt='custom package icon'
                        className='w-5 h-5'
                    />
                </button>

                <CustomModelAdmin
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    title=''
                >
                    <Modal />
                </CustomModelAdmin>

                <h2 className='text-lg font-semibold'>Custom Package</h2>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className={`p-6 border-2 rounded-lg shadow-md ${
                            editingPackage === pkg.id
                                ? "border BlueBorder"
                                : "border-transparent"
                        }`}
                    >
                        {editingPackage === pkg.id ? (
                            <form
                                onSubmit={handleSubmit(handleSave)}
                                className='space-y-4'
                            >
                                <div>
                                    <label className='block text-sm text-gray-700 font-semibold'>
                                        Title
                                    </label>
                                    <input
                                        type='text'
                                        {...register("title", {
                                            required: true,
                                        })}
                                        className='focus:outline-none py-0.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm text-gray-700 font-semibold'>
                                        Description
                                    </label>
                                    <textarea
                                        {...register("description", {
                                            required: true,
                                        })}
                                        className='focus:outline-none py-0.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                        rows={5}
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm text-gray-700 font-semibold'>
                                        Price
                                    </label>
                                    <input
                                        type='number'
                                        {...register("price", {
                                            required: true,
                                        })}
                                        className='focus:outline-none py-0.5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                    />
                                </div>
                                <div className='flex space-x-2'>
                                    <button
                                        type='submit'
                                        className='w-full ButtonBlue text-white py-2 rounded-md transition'
                                        disabled={isSaving} // Disable button during save
                                    >
                                        {isSaving ? "Saving..." : "Save"}
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setEditingPackage(null)}
                                        className='w-full bg-gray-200 text-gray-700 py-2 rounded-md transition'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className='space-y-4'>
                                <div className='flex items-center space-x-2'>
                                    <PackageIcon />
                                    <h3 className='text-lg font-semibold'>
                                        {pkg.title}
                                    </h3>
                                    <div className='flex space-x-2'>
                                        <button
                                            onClick={() => handleEditClick(pkg)}
                                            className='p-1 focus:outline-none'
                                        >
                                            <img
                                                src='/pencil.png'
                                                alt='edit icon'
                                                className='w-4 h-4'
                                            />
                                        </button>
                                    </div>
                                </div>
                                <p className='text-sm text-gray-600'>
                                    {pkg.description}
                                </p>
                                <p className='text-2xl font-semibold'>
                                    ${pkg.price}{" "}
                                    <span className='text-sm font-normal'>
                                        Lifetime
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Packages;
