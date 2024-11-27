import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

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
  data: null,
  list: [],
  loading: false,
  error: null,
};

export const fetchAdditionalServices = createAsyncThunk(
  'additionalService/fetchAdditionalServices',
  async (token: string, { rejectWithValue }) => {
    try {
      console.log("[Debug] Fetching Additional Services");
      const response = await axiosInstance.get('/admin/additionalServices', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("[Debug] Fetch Additional Services Response:", response.data);
      
      // Specifically access the data from the response
      const serviceData = response.data.data;
      console.log("[Debug] Extracted Service Data:", serviceData);
      
      return serviceData;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("[Error] Failed to fetch additional services:", axiosError.response?.data || error);
      return rejectWithValue(
        axiosError.response?.data || 'Failed to fetch additional services'
      );
    }
  }
);

export const updateAdditionalService = createAsyncThunk(
  'additionalService/updateAdditionalService',
  async (
    { id, data, token }: { id: string; data: AdditionalService; token: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("[Debug] Updating Additional Service:");
      console.log("[Debug] ID:", id);
      console.log("[Debug] Payload:", data);
      console.log("[Debug] Token:", token);

      const response = await axiosInstance.patch(
        `/admin/additionalServices/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("[Debug] Update Additional Service Response:", response.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("[Error] Failed to update additional service:", axiosError.response?.data || error);
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
    { data, token }: { data: AdditionalService; token: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("[Debug] Creating Additional Service:", data);
      const response = await axiosInstance.post('/admin/additionalServices', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log("[Debug] Create Additional Service Response:", response.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("[Error] Failed to create additional service:", axiosError.response?.data || error);
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
    { id, token }: { id: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("[Debug] Fetching Additional Service by ID:", id);
      const response = await axiosInstance.get(`/admin/additionalServices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("[Debug] Fetch Additional Service by ID Response:", response.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("[Error] Failed to fetch additional service by ID:", axiosError.response?.data || error);
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
    { id, token }: { id: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("[Debug] Deleting Additional Service ID:", id);
      const response = await axiosInstance.delete(`/admin/additionalServices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("[Debug] Delete Additional Service Response:", response.data);
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
          // Directly set the fetched service as data
          state.data = action.payload;
          // Also update the list
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
          
          // If the deleted item was the current data, clear it
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