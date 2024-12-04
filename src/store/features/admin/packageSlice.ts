import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

// Package Interface
export interface Package {
  _id: string;
  title: string;
  description: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

// State Interface
export interface PackageState {
  data: Package[] | null;
  currentPackage: Package | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: PackageState = {
  data: null,
  currentPackage: null,
  loading: false,
  error: null,
};

// Create Package
export const createPackage = createAsyncThunk(
  'package/createPackage',
  async (
    { data, token }: { 
      data: { 
        title: string; 
        description: string; 
        price: number 
      }; 
      token: string 
    },
    { rejectWithValue }
  ) => {
    try {
      console.log("[Debug] Creating Package");
      console.log("[Debug] Payload:", data);
      console.log("[Debug] Token:", token);

      const response = await axiosInstance.post('/admin/packages', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      console.log("[Debug] Create Package Response:", response.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("[Error] Failed to create package:", axiosError.response?.data || error);
      return rejectWithValue(
        axiosError.response?.data || 'Failed to create package'
      );
    }
  }
);

// Fetch All Packages
export const fetchPackages = createAsyncThunk(
  'package/fetchPackages',
  async (token: string, { rejectWithValue }) => {
    try {
      console.log("[Debug] Fetching Packages");
      console.log("[Debug] Token:", token);

      const response = await axiosInstance.get('/admin/packages', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("[Debug] Fetch Packages Response:", response.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("[Error] Failed to fetch packages:", axiosError.response?.data || error);
      return rejectWithValue(
        axiosError.response?.data || 'Failed to fetch packages'
      );
    }
  }
);

// Fetch Package by ID
export const fetchPackageById = createAsyncThunk(
  'package/fetchPackageById',
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      console.log("[Debug] Fetching Package by ID");
      console.log("[Debug] ID:", id);
      console.log("[Debug] Token:", token);

      const response = await axiosInstance.get(`/admin/packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("[Debug] Fetch Package by ID Response:", response.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("[Error] Failed to fetch package by ID:", axiosError.response?.data || error);
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
      token 
    }: { 
      id: string; 
      data: { 
        title?: string; 
        description?: string; 
        price?: number 
      }; 
      token: string 
    },
    { rejectWithValue }
  ) => {
    try {
      console.log("[Debug] Updating Package");
      console.log("[Debug] ID:", id);
      console.log("[Debug] Payload:", data);
      console.log("[Debug] Token:", token);

      const response = await axiosInstance.patch(`/admin/packages/${id}`, data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      console.log("data sent to slice for updation", data);
      console.log("[Debug] Update Package Response:", response.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("[Error] Failed to update package:", axiosError.response?.data || error);
      return rejectWithValue(
        axiosError.response?.data || 'Failed to update package'
      );
    }
  }
);

// Delete Package
export const deletePackage = createAsyncThunk(
  'package/deletePackage',
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      console.log("[Debug] Deleting Package");
      console.log("[Debug] ID:", id);
      console.log("[Debug] Token:", token);

      const response = await axiosInstance.delete(`/admin/packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("[Debug] Delete Package Response:", response.data);
      return id; // Return the ID of the deleted package
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("[Error] Failed to delete package:", axiosError.response?.data || error);
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