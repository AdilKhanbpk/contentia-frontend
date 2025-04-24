"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState, AppDispatch } from "@/store/store";
import {
    fetchMyBrands,
    updateBrand,
} from "@/store/features/profile/brandSlice";
import CustomModelAdmin from "../modal/CustomModelAdmin";
import ModelBrand from "./sub-profile/ModelBrand";
import EditableBrand from "./sub-profile/EditableBrand";
import { toast } from "react-toastify";

export default function MyBrands() {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, reset } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
    const brands = useSelector((state: RootState) => state.brand.myBrands);

    useEffect(() => {
        dispatch(fetchMyBrands());
    }, [dispatch]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const onSubmit = async (data: any) => {
        if (!editingBrandId) return;

        const brandData = data.brands[editingBrandId];
        try {
            await dispatch(
                updateBrand({
                    brandId: editingBrandId,
                    data: brandData,
                })
            ).unwrap();

            toast.success("Brand updated successfully!");
            setEditingBrandId(null);
            dispatch(fetchMyBrands());
        } catch (error) {
            toast.error("Failed to update brand. Please try again.");
        }
    };

    return (
        <>
            <div className='px-4 sm:px-6 md:px-8 lg:px-28 py-24 sm:py-24 md:py-24 lg:py-24 bg-gray-50'>
                <div className='p-4 my-4 sm:p-5 sm:my-6 md:p-6 md:my-8 lg:p-6 lg:my-8'>
                    <div className='p-4 mb-4 sm:p-5 sm:mb-5 md:p-6 md:mb-6 lg:p-6 lg:mb-6 bg-white'>
                        <button
                            onClick={openModal}
                            className='flex flex-row items-center space-x-2'
                        >
                            <div>
                                <Image
                                    width={16}
                                    height={16}
                                    src='/plusIcon.png'
                                    alt='plus icon'
                                />
                            </div>
                            <div>
                                <p className='BlueText text-sm '>Marka Ekle</p>
                            </div>
                        </button>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {brands.map((brand) => (
                                <EditableBrand
                                    key={brand._id}
                                    brand={brand}
                                    register={register}
                                    isEditing={editingBrandId === brand._id}
                                    brandId={brand._id}
                                    setEditingBrandId={setEditingBrandId}
                                />
                            ))}
                        </form>
                    </div>
                </div>
            </div>
            <CustomModelAdmin
                isOpen={isModalOpen}
                closeModal={closeModal}
                title=''
            >
                <ModelBrand />
            </CustomModelAdmin>
        </>
    );
}
