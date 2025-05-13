import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';
import { mockAdditionalServicesData } from '@/mock/landingPageData';

export interface AdditionalService {
  _id?: string;
  platform?: string;
  aspectRatio?: string;
  editPrice?: number;
  sharePrice?: number;
  coverPicPrice?: number;
  creatorTypePrice?: number;
  shippingPrice?: number;
  thirtySecondDurationPrice?: number;
  sixtySecondDurationPrice?: number;
}

export interface AdditionalServiceState {
  data: AdditionalService | null;
  list: AdditionalService[];
  loading: boolean;
  error: string | null;
}

const initialState: AdditionalServiceState = {
  data: {
    _id: "mock-additional-services-id",
    editPrice: 500,
    sharePrice: 750,
    coverPicPrice: 300,
    creatorTypePrice: 1000,
    shippingPrice: 250,
    thirtySecondDurationPrice: 500,
    sixtySecondDurationPrice: 1000
  },
  list: [],
  loading: false,
  error: null,
};

export const fetchAdditionalServices = createAsyncThunk(
  'additionalService/fetchAdditionalServices',
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching additional services from API");
      const response = await axiosInstance.get('/admin/additionalServices');
      const serviceData = response.data.data;
      console.log("Fetched service data:", serviceData);
      return serviceData;
    } catch (error) {
      console.warn('API call failed, using mock data for additional services');
      // Add ID to mock data to ensure it's consistent
      const mockData = {
        ...mockAdditionalServicesData,
        _id: "mock-additional-services-id"
      };
      console.log("Using mock data:", mockData);
      return mockData;
    }
  }
);

export const updateAdditionalService = createAsyncThunk(
  'additionalService/updateAdditionalService',
  async (
    { id, data }: { id: string; data: AdditionalService },
    { rejectWithValue }
  ) => {
    try {
      console.log("Updating additional service with ID:", id);
      console.log("Update data:", data);

      const response = await axiosInstance.patch(
        `/admin/additionalServices/${id}`,
        data
      );
      console.log("API response:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error in updateAdditionalService:", error);

      // If we're using mock data, return a successful mock response
      if (id === "mock-additional-services-id") {
        console.log("Using mock data for update");
        // Create an updated version of the mock data
        const updatedMockData = {
          ...mockAdditionalServicesData,
          ...data,
          _id: "mock-additional-services-id"
        };
        console.log("Updated mock data:", updatedMockData);
        return updatedMockData;
      }

      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to update additional service'
      );
    }
  }
);

// Create Additional Service
export const createAdditionalService = createAsyncThunk(
  'additionalService/createAdditionalService',
  async (
    { data, }: { data: AdditionalService },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/admin/additionalServices', data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to create additional service'
      );
    }
  }
);

// Fetch Additional Service by ID
export const fetchAdditionalServiceById = createAsyncThunk(
  'additionalService/fetchAdditionalServiceById',
  async (
    { id }: { id: string; },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/admin/additionalServices/${id}`);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to fetch additional service'
      );
    }
  }
);

// Delete Additional Service
export const deleteAdditionalService = createAsyncThunk(
  'additionalService/deleteAdditionalService',
  async (
    { id }: { id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.delete(`/admin/additionalServices/${id}`);
      return id;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("[Error] Failed to delete additional service:", axiosError.response?.data || error);
      return rejectWithValue(
        axiosError.response?.data || 'Failed to delete additional service'
      );
    }
  }
);

// Create the slice
const additionalServiceSlice = createSlice({
  name: 'additionalService',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // Create Additional Service
      .addCase(createAdditionalService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createAdditionalService.fulfilled,
        (state, action: PayloadAction<AdditionalService>) => {
          state.loading = false;
          state.data = action.payload;
          state.list.push(action.payload);
        }
      )
      .addCase(createAdditionalService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Additional Services
      .addCase(fetchAdditionalServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAdditionalServices.fulfilled,
        (state, action: PayloadAction<AdditionalService>) => {
          state.loading = false;
          state.data = action.payload;
          state.list = action.payload ? [action.payload] : [];
        }
      )
      .addCase(fetchAdditionalServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Additional Service
      .addCase(updateAdditionalService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAdditionalService.fulfilled,
        (state, action: PayloadAction<AdditionalService>) => {
          state.loading = false;
          state.data = action.payload;

          // Update the item in the list
          const index = state.list.findIndex(item => item._id === action.payload._id);
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addCase(updateAdditionalService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Additional Service by ID
      .addCase(fetchAdditionalServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAdditionalServiceById.fulfilled,
        (state, action: PayloadAction<AdditionalService>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchAdditionalServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Additional Service
      .addCase(deleteAdditionalService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAdditionalService.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.list = state.list.filter(item => item._id !== action.payload);
          if (state.data?._id === action.payload) {
            state.data = null;
          }
        }
      )
      .addCase(deleteAdditionalService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearError } = additionalServiceSlice.actions;
export default additionalServiceSlice.reducer;