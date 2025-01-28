import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";
import { AxiosError } from "axios";

export interface Brand {
  _id: string;
  brandOwner: string;
  brandName: string;
  brandCategory: string;
  brandWebsite?: string;
  brandCountry: string;
  associatedOrders?: string[];
  brandImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BrandState {
  brands: Brand[];
  currentBrand: Brand | null;
  myBrands: Brand[];
  loading: boolean;
  error: string | null;
}

interface CreateBrandPayload {
  data: {
    brandName: string;
    brandCategory: string;
    brandWebsite?: string;
    brandCountry: string;
  };
  token: string;
}

interface UpdateBrandPayload {
  brandId: string;
  data: {
    brandName?: string;
    brandCategory?: string;
    brandWebsite?: string;
    brandCountry?: string;
  };
  token: string;
}

interface DeleteBrandPayload {
  brandId: string;
  token: string;
}

interface ChangeBrandPicPayload {
  brandId: string;
  data: FormData;
  token: string;
}

const initialState: BrandState = {
  brands: [],
  currentBrand: null,
  myBrands: [],
  loading: false,
  error: null,
};

// Create Brand
export const createBrand = createAsyncThunk(
    "brand/createBrand",
    async ({ data, token }: CreateBrandPayload, { rejectWithValue }) => {
      try {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axiosInstance.post("/brands", data);
        return response.data.data;
      } catch (error) {
        console.error("===== Error in createBrand Function =====");
        const axiosError = error as AxiosError;
        const errorMessage =
          axiosError.response?.data ||
          axiosError.response?.data ||
          "Failed to create brand due to an unknown error.";
        console.warn("Rejecting with error message:", errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  );
  
// Fetch All Brands
export const fetchBrands = createAsyncThunk(
  "brand/fetchBrands",
  async (token: string, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.get("/brands");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching brands:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch Brands"
      );
    }
  }
);

// Fetch Single Brand
export const fetchSingleBrand = createAsyncThunk(
  "brand/fetchSingleBrand",
  async ({ brandId, token }: { brandId: string; token: string }, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.get(`/brands/${brandId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching single brand:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || `Failed to fetch Brand with ID ${brandId}`
      );
    }
  }
);

// Update Brand
export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async ({ brandId, data, token }: UpdateBrandPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.patch(`/brands/${brandId}`, data);
      return response.data.data;
    } catch (error) {
      console.error("Error updating brand:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || `Failed to update Brand with ID ${brandId}`
      );
    }
  }
);

// Delete Brand
export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async ({ brandId, token }: DeleteBrandPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axiosInstance.delete(`/brands/${brandId}`);
      return brandId;
    } catch (error) {
      console.error("Error deleting brand:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || `Failed to delete Brand with ID ${brandId}`
      );
    }
  }
);

// Fetch My Brands
export const fetchMyBrands = createAsyncThunk(
  "brand/fetchMyBrands",
  async (token: string, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.get("/brands/my-brands");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching my brands:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch My Brands"
      );
    }
  }
);

// Change Brand Picture
export const changeBrandPic = createAsyncThunk(
  "brand/changeBrandPic",
  async ({ brandId, data, token }: ChangeBrandPicPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axiosInstance.patch(`/brands/change-brand-image/${brandId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data ||
        `Failed to change Brand picture for ID ${brandId}`;
      return rejectWithValue(errorMessage);
    }
  }
);


const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setCurrentBrand: (state, action: PayloadAction<Brand | null>) => {
      state.currentBrand = action.payload;
    },
    addBrandToState: (state, action: PayloadAction<Brand>) => {
      state.brands.push(action.payload);
    },
    updateBrandInState: (state, action: PayloadAction<Brand>) => {
      const index = state.brands.findIndex(brand => brand._id === action.payload._id);
      if (index !== -1) {
        state.brands[index] = action.payload;
      }
    },
    removeBrandFromState: (state, action: PayloadAction<string>) => {
      state.brands = state.brands.filter(brand => brand._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Brand
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBrand.fulfilled, (state, action: PayloadAction<Brand>) => {
        state.loading = false;
        state.brands.push(action.payload);
        state.myBrands.push(action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Brands
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action: PayloadAction<Brand[]>) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Single Brand
      .addCase(fetchSingleBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleBrand.fulfilled, (state, action: PayloadAction<Brand>) => {
        state.loading = false;
        state.currentBrand = action.payload;
      })
      .addCase(fetchSingleBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Brand
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action: PayloadAction<Brand>) => {
        state.loading = false;
        const index = state.brands.findIndex(brand => brand._id === action.payload._id);
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
        const myBrandIndex = state.myBrands.findIndex(brand => brand._id === action.payload._id);
        if (myBrandIndex !== -1) {
          state.myBrands[myBrandIndex] = action.payload;
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Brand
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.brands = state.brands.filter(brand => brand._id !== action.payload);
        state.myBrands = state.myBrands.filter(brand => brand._id !== action.payload);
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch My Brands
      .addCase(fetchMyBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBrands.fulfilled, (state, action: PayloadAction<Brand[]>) => {
        state.loading = false;
        state.myBrands = action.payload;
      })
      .addCase(fetchMyBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Change Brand Picture
      .addCase(changeBrandPic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeBrandPic.fulfilled, (state, action: PayloadAction<Brand>) => {
        state.loading = false;
        const index = state.brands.findIndex(brand => brand._id === action.payload._id);
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
        const myBrandIndex = state.myBrands.findIndex(brand => brand._id === action.payload._id);
        if (myBrandIndex !== -1) {
          state.myBrands[myBrandIndex] = action.payload;
        }
        if (state.currentBrand?._id === action.payload._id) {
          state.currentBrand = action.payload;
        }
      })
      .addCase(changeBrandPic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentBrand,
  addBrandToState,
  updateBrandInState,
  removeBrandFromState
} = brandSlice.actions;

export default brandSlice.reducer;