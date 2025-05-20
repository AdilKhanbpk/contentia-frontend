import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { Brand, fetchMyBrands } from "@/store/features/profile/brandSlice";
import { selectProfileUser } from "@/store/features/profile/profileSlice";
import Image from "next/image";

// Function to generate initials from user's name
const generateInitials = (fullName: string | undefined): string => {
    if (!fullName) return "UN";

    const names = fullName.trim().split(" ");
    if (names.length === 1) {
        // If only one name, return the first letter
        return names[0].charAt(0).toUpperCase();
    } else {
        // If multiple names, return first letter of first name and first letter of last name
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    }
};

const BrandNames = () => {
    const dispatch = useDispatch<AppDispatch>();
    const brandRecords: Brand[] = useSelector(
        (state: RootState) => state.brand.myBrands
    );
    const user = useSelector(selectProfileUser);
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

    // Generate user initials if name exists
    const userInitials = useMemo(() => generateInitials(user?.fullName), [user?.fullName]);

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
            {selectedBrand?.brandImage ? (
                <Image
                    src={selectedBrand.brandImage}
                    alt='brand logo'
                    height={32}
                    width={32}
                    className='rounded-full hidden sm:block'
                />
            ) : (
                <div className='w-8 h-8 rounded-full border-2 border-gray-600 items-center text-sm justify-center bg-blue-600 text-white font-semibold hidden sm:flex'>
                    {userInitials}
                </div>
            )}
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
