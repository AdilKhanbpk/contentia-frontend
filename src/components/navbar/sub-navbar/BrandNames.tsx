import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { 
  fetchMyBrands,
} from "@/store/features/profile/brandSlice";

const BrandNames = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brandRecords = useSelector((state: RootState) => state.brand.myBrands);
  const [token, setToken] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken);
    if (storedToken) {
      dispatch(fetchMyBrands(storedToken));
    }
  }, [dispatch]);

  const brands = brandRecords.map(record => record.brandName);

  return (
    <select 
      value={selectedBrand}
      onChange={(e) => setSelectedBrand(e.target.value)}
      className="w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:border-none bg-white text-gray-900"
    >
      <option value="" disabled>Brand Names</option>
      {brands.map((brand, index) => (
        <option key={index} value={brand}>
          {brand}
        </option>
      ))}
    </select>
  );
};

export default BrandNames;