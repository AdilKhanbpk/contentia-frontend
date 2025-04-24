import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

export interface Package {
  _id: string;
  title: string;
  description: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PackageState {
  data: Package[] | null;
  currentPackage: Package | null;
  loading: boolean;
  error: string | null;
}

const initialState: PackageState = {
  data: null,
  currentPackage: null,
  loading: false,
  error: null,
};

export const createPackage = createAsyncThunk(
  'package/createPackage',
  async (
    { data }: {
      data: {
        title: string;
        description: string;
        price: number
      };

    },
    { rejectWithValue }
  ) => {
    try {

      const response = await axiosInstance.post('/admin/packages', data);

      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to create package'
      );
    }
  }
);

// Fetch All Packages
export const fetchPackages = createAsyncThunk(
  'package/fetchPackages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/packages')

      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to fetch packages'
      );
    }
  }
);

// Fetch Package by ID
export const fetchPackageById = createAsyncThunk(
  'package/fetchPackageById',
  async ({ id }: { id: string; }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/packages/${id}`);

      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to fetch package'
      );
    }
  }
);

// Update Package
export const updatePackage = createAsyncThunk(
  'package/updatePackage',
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: {
        title?: string;
        description?: string;
        price?: number
      };

    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/admin/packages/${id}`, data);

      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to update package'
      );
    }
  }
);

// Delete Package
export const deletePackage = createAsyncThunk(
  'package/deletePackage',
  async ({ id }: { id: string; }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/admin/packages/${id}`);

      return id;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to delete package'
      );
    }
  }
);

// Create Slice
const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Package
      .addCase(createPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPackage.fulfilled, (state, action: PayloadAction<Package>) => {
        state.loading = false;
        if (!state.data) {
          state.data = [action.payload];
        } else {
          state.data.push(action.payload);
        }
        state.currentPackage = action.payload;
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Packages
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action: PayloadAction<Package[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Package by ID
      .addCase(fetchPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackageById.fulfilled, (state, action: PayloadAction<Package>) => {
        state.loading = false;
        state.currentPackage = action.payload;
      })
      .addCase(fetchPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Package
      .addCase(updatePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePackage.fulfilled, (state, action: PayloadAction<Package>) => {
        state.loading = false;
        state.currentPackage = action.payload;

        // Update the package in the data array if it exists
        if (state.data) {
          const index = state.data.findIndex(pkg => pkg._id === action.payload._id);
          if (index !== -1) {
            state.data[index] = action.payload;
          }
        }
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Package
      .addCase(deletePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePackage.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;

        // Remove the package from the data array
        if (state.data) {
          state.data = state.data.filter(pkg => pkg._id !== action.payload);
        }

        // Clear current package if it was the deleted one
        if (state.currentPackage?._id === action.payload) {
          state.currentPackage = null;
        }
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default packageSlice.reducer;