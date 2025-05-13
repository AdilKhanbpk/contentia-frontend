import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance, patchForm } from '@/store/axiosInstance';
import { AxiosError } from 'axios';
import { PackageInterface } from '@/types/interfaces';

interface ErrorResponse {
  message: string;
  status?: number;
}

interface PackagesState {
  data: PackageInterface[];
  loading: boolean;
  error: string | null;
  currentPackage: PackageInterface | null;
}

const initialState: PackagesState = {
  data: [],
  loading: false,
  error: null,
  currentPackage: null,
};

export const createPackage = createAsyncThunk(
  'packages/createPackage',
  async ({ data }: { data: Partial<PackageInterface> }, { rejectWithValue }) => {
    try {


      const transformedData = {
        customer: typeof data.packageCreator === 'object' ? data.packageCreator._id : data.packageCreator,
        totalPrice: parseFloat(data.packageTotalPrice?.toString() || '0'),
        noOfUgc: parseInt(data.noOfUgc?.toString() || '0', 10),
        additionalServices: {
          platform: data.additionalServices?.platform?.toLowerCase() || 'tiktok',
          duration: data.additionalServices?.duration || '15s',
          edit: data.additionalServices?.edit === true ? true : false,
          aspectRatio: data.additionalServices?.aspectRatio || '9:16',
          share: data.additionalServices?.share === true ? true : false,
          coverPicture: data.additionalServices?.coverPicture === true ? true : false,
          creatorType: data.additionalServices?.creatorType,
          productShipping: data.additionalServices?.productShipping === true ? true : false,
        },
      };

      // First create the package
      const response = await axiosInstance.post('/admin/custom-packages', transformedData);

      // Then fetch the complete package details to get the full owner information
      const fullPackageResponse = await axiosInstance.get(`/admin/custom-packages/${response.data.data._id}`);

      return fullPackageResponse.data.data;
    } catch (error) {
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to create package');
      }
      return rejectWithValue('Failed to create package');
    }
  }
);

// Fetch All Packages
export const fetchPackages = createAsyncThunk(
  'packages/fetchPackages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/custom-packages');

      return response.data.data;

    } catch (error) {

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch packages');
      }

      return rejectWithValue('Failed to fetch packages');
    }
  }
);

// Fetch Single Package
export const fetchPackageById = createAsyncThunk(
  'packages/fetchPackageById',
  async ({ packageId }: { packageId: string; }, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get(`/admin/custom-packages/${packageId}`);

      return response.data.data;
    } catch (error) {

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch package');
      }

      return rejectWithValue('Failed to fetch package');
    }
  }
);

// Update Package
export const updatePackage = createAsyncThunk(
  'packages/updatePackage',
  async ({ packageId, data }: { packageId: string; data: FormData; }, { rejectWithValue }) => {



    try {
      const response = await axiosInstance.patchForm(`/admin/custom-packages/${packageId}`, data);

      return response.data.data;
    } catch (error) {

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to update package');
      }

      return rejectWithValue('Failed to update package');
    }
  }
);

// Delete Package
export const deletePackage = createAsyncThunk(
  'packages/deletePackage',
  async ({ packageId }: { packageId: string; }, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.delete(`/admin/custom-packages/${packageId}`);

      return { packageId, data: response.data.data };
    } catch (error) {

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to delete package');
      }

      return rejectWithValue('Failed to delete package');
    }
  }
);


const packagesSlice = createSlice({
  name: 'customPackages',
  initialState,
  reducers: {
    setCurrentPackage: (state, action: PayloadAction<PackageInterface>) => {
      state.currentPackage = action.payload;
    },
    clearCurrentPackage: (state) => {
      state.currentPackage = null;
    },
    clearPackagesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Create Package
      .addCase(createPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPackage.fulfilled, (state, action: PayloadAction<PackageInterface>) => {
        state.loading = false;
        state.data.unshift(action.payload);
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
      .addCase(fetchPackages.fulfilled, (state, action: PayloadAction<PackageInterface[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Single Package
      .addCase(fetchPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackageById.fulfilled, (state, action: PayloadAction<PackageInterface>) => {
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
      .addCase(updatePackage.fulfilled, (state, action: PayloadAction<PackageInterface>) => {
        state.loading = false;
        const index = state.data.findIndex(customPackage => customPackage._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
          if (state.currentPackage?._id === action.payload._id) {
            state.currentPackage = action.payload;
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
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(customPackage => customPackage._id !== action.payload.packageId);
        if (state.currentPackage?._id === action.payload.packageId) {
          state.currentPackage = null;
        }
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const { setCurrentPackage, clearCurrentPackage, clearPackagesError } = packagesSlice.actions;

export default packagesSlice.reducer;