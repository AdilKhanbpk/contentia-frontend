import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

export interface PricePlan {
  _id: string;
  title: string;
  description: string;
  videoCount: number;
  strikeThroughPrice?: number;
  finalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PricePlanState {
  data: PricePlan[] | null;
  currentPlan: PricePlan | null;
  loading: boolean;
  error: string | null;
}

const initialState: PricePlanState = {
  data: null,
  currentPlan: null,
  loading: false,
  error: null,
};

export const createPricePlan = createAsyncThunk(
  'pricePlan/createPricePlan',
  async (
    { data }: {
      data: {
        videoCount: number;
        strikeThroughPrice?: number;
        finalPrice: number
      };

    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/admin/pricing', data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to create price plan'
      );
    }
  }
);

// Fetch All Price Plans
export const fetchPricePlans = createAsyncThunk(
  'pricePlan/fetchPricePlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/pricing');
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to fetch price plans'
      );
    }
  }
);

// Fetch Price Plan by ID
export const fetchPricePlanById = createAsyncThunk(
  'pricePlan/fetchPricePlanById',
  async ({ id }: { id: string; }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/pricing/${id}`);

      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to fetch price plan'
      );
    }
  }
);

// Update Price Plan
export const updatePricePlan = createAsyncThunk(
  'pricePlan/updatePricePlan',
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: {
        title?: string;
        description?: string;
        videoCount?: number;
        strikeThroughPrice?: number;
        finalPrice?: number
      };

    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/admin/pricing/${id}`, data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to update price plan'
      );
    }
  }
);

// Delete Price Plan
export const deletePricePlan = createAsyncThunk(
  'pricePlan/deletePricePlan',
  async ({ id }: { id: string; }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/admin/pricing/${id}`);

      return id;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to delete price plan'
      );
    }
  }
);

// Create Slice
const pricePlanSlice = createSlice({
  name: 'pricePlan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Price Plan
      .addCase(createPricePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPricePlan.fulfilled, (state, action: PayloadAction<PricePlan>) => {
        state.loading = false;
        if (!state.data) {
          state.data = [action.payload];
        } else {
          state.data.push(action.payload);
        }
        state.currentPlan = action.payload;
      })
      .addCase(createPricePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Price Plans
      .addCase(fetchPricePlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPricePlans.fulfilled, (state, action: PayloadAction<PricePlan[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPricePlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Price Plan by ID
      .addCase(fetchPricePlanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPricePlanById.fulfilled, (state, action: PayloadAction<PricePlan>) => {
        state.loading = false;
        state.currentPlan = action.payload;
      })
      .addCase(fetchPricePlanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Price Plan
      .addCase(updatePricePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePricePlan.fulfilled, (state, action: PayloadAction<PricePlan>) => {
        state.loading = false;
        state.currentPlan = action.payload;

        // Update the plan in the data array if it exists
        if (state.data) {
          const index = state.data.findIndex(plan => plan._id === action.payload._id);
          if (index !== -1) {
            state.data[index] = action.payload;
          }
        }
      })
      .addCase(updatePricePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Price Plan
      .addCase(deletePricePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePricePlan.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;

        // Remove the plan from the data array
        if (state.data) {
          state.data = state.data.filter(plan => plan._id !== action.payload);
        }

        // Clear current plan if it was the deleted one
        if (state.currentPlan?._id === action.payload) {
          state.currentPlan = null;
        }
      })
      .addCase(deletePricePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default pricePlanSlice.reducer;