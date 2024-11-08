// src/store/adminCustomersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

type AdminCustomersState = {
  data: any[];
  loading: boolean;
  error: string | null;
};

const initialState: AdminCustomersState = {
  data: [],
  loading: false,
  error: null,
};

// Fetch admin customers (you can replace this API endpoint with the appropriate one for your case)
export const fetchAdminCustomers = createAsyncThunk(
  'adminCustomers/fetchAdminCustomers',
  async (token: string) => {
    try {
      const response = await axiosInstance.get('/admin/customers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      throw Error('Failed to fetch admin customers');
    }
  }
);

// Update an admin customer's status or other information
export const updateAdminCustomer = createAsyncThunk(
  'adminCustomers/updateAdminCustomer',
  async (
    { customerId, data, token }: { customerId: string; data: any; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/admin/customers/${customerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      let errorMessage = 'Failed to update admin customer';
      if ((error as AxiosError).isAxiosError && (error as AxiosError).response) {
        errorMessage = `Update failed: ${(error as AxiosError).response?.data || 'Unknown error'}`;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete an admin customer (if applicable)
export const deleteAdminCustomer = createAsyncThunk(
  'adminCustomers/deleteAdminCustomer',
  async (
    { customerId, token }: { customerId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      await axiosInstance.delete(`/admin/customers/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return customerId; // Return the deleted customer ID
    } catch (error) {
      let errorMessage = 'Failed to delete admin customer';
      if ((error as AxiosError).isAxiosError && (error as AxiosError).response) {
        errorMessage = `Delete failed: ${(error as AxiosError).response?.data || 'Unknown error'}`;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const adminCustomersSlice = createSlice({
  name: 'adminCustomers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch customers
      .addCase(fetchAdminCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCustomers.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdminCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch admin customers';
      })
      // Update customer
      .addCase(updateAdminCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminCustomer.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // Find and update the customer in the array (if needed)
        const updatedCustomer = action.payload;
        const index = state.data.findIndex((customer) => customer._id === updatedCustomer._id);
        if (index !== -1) {
          state.data[index] = updatedCustomer;
        }
      })
      .addCase(updateAdminCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete customer
      .addCase(deleteAdminCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdminCustomer.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        // Remove the customer by their ID
        state.data = state.data.filter((customer) => customer._id !== action.payload);
      })
      .addCase(deleteAdminCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminCustomersSlice.reducer;
