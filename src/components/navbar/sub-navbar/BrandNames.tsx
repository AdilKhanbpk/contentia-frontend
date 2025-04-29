import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchMyBrands } from "@/store/features/profile/brandSlice";
import Image from "next/image";

const BrandNames = () => {
    const dispatch = useDispatch<AppDispatch>();
    const brandRecords = useSelector(
        (state: RootState) => state.brand.myBrands
    );
    const [selectedBrand, setSelectedBrand] = useState("");

    useEffect(() => {
        dispatch(fetchMyBrands());
    }, [dispatch]);

    const brands = brandRecords.map((record) => record.brandName);

    return (
        <div className='flex items-center space-x-2'>
            <Image
                src='/brand-logo.png'
                alt='brand logo'
                height={32}
                width={32}
                className='rounded-full hidden sm:block'
            />
            <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className='xs:w-44 sm:w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:border-none bg-white text-gray-900'
            >
                <option
                    value=''
                    disabled
                >
                    Markalarım{" "}
                </option>
                {brands.map((brand, index) => (
                    <option
                        key={index}
                        value={brand}
                    >
                        {brand}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BrandNames;
