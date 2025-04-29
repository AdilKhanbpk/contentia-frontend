import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { Brand, fetchMyBrands } from "@/store/features/profile/brandSlice";
import Image from "next/image";

const BrandNames = () => {
    const dispatch = useDispatch<AppDispatch>();
    const brandRecords: Brand[] = useSelector(
        (state: RootState) => state.brand.myBrands
    );
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

    useEffect(() => {
        dispatch(fetchMyBrands());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = e.target.value;
        const foundBrand = brandRecords.find(
            (b) => b.brandName === selectedName
        );
        setSelectedBrand(foundBrand || null);
    };

    return (
        <div className='flex items-center space-x-2'>
            <Image
                src={selectedBrand?.brandImage || "/brand-logo.png"}
                alt='brand logo'
                height={32}
                width={32}
                className='rounded-full hidden sm:block'
            />
            <select
                value={selectedBrand?.brandName || ""}
                onChange={handleChange}
                className='xs:w-44 sm:w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:border-none bg-white text-gray-900'
            >
                <option
                    value=''
                    disabled
                >
                    Markalarım
                </option>
                {brandRecords.map((brand, index) => (
                    <option
                        key={index}
                        value={brand.brandName}
                    >
                        {brand.brandName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BrandNames;
