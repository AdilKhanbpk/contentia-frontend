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
      const response = await axiosInstance.get('/admin/additionalServices', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const serviceData = response.data.data;
      return serviceData;
    } catch (error) {
      const axiosError = error as AxiosError;
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
      return response.data.data;
    } catch (error) {
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
    { data, token }: { data: AdditionalService; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/admin/additionalServices', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
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
    { id, token }: { id: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/admin/additionalServices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    { id, token }: { id: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.delete(`/admin/additionalServices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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