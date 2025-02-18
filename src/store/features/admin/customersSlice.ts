import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';
import { Customer } from '@/types/interfaces';
import { profile } from 'console';


export interface AdminCustomersState {
  data: Customer[];
  loading: boolean;
  error: string | null;
  selectedCustomer: Customer | null;
}

const initialState: AdminCustomersState = {
  data: [],
  loading: false,
  error: null,
  selectedCustomer: null,
};

// Fetch all customers
export const fetchAdminCustomers = createAsyncThunk(
  'adminCustomers/fetchAdminCustomers',
  async (token: string) => {
    try {
      const response = await axiosInstance.get('/admin/customers', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.data) {
        const customers = response.data.data.map((customer: Customer) => ({
          id: customer._id ?? null,
          fullName: customer.fullName ?? '',
          email: customer.email ?? '',
          profilePic: customer.profilePic ?? '',
          phoneNumber: customer.phoneNumber ?? '',
          age: customer.age ?? null,
          status: customer.status ?? '',
          invoiceType: customer.invoiceType ?? '',
          customerStatus: customer.customerStatus ?? '',
          billingInformation: {
            invoiceStatus: customer.billingInformation?.invoiceStatus ?? false,
            trId: customer.billingInformation?.trId ?? '',
            address: customer.billingInformation?.address ?? '',
            fullName: customer.billingInformation?.fullName ?? '',
            companyName: customer.billingInformation?.companyName ?? '',
            taxNumber: customer.billingInformation?.taxNumber ?? '',
            taxOffice: customer.billingInformation?.taxOffice ?? ''
          },
          rememberMe: customer.rememberMe ?? false,
          termsAndConditionsApproved: customer.termsAndConditionsApproved ?? false
        }));

        return customers;
      } else {
        console.warn('Response data does not contain the expected data field.');
        return [];
      }
    } catch (error) {
      throw Error('Failed to fetch admin customers');
    }
  }
);

// Fetch a single customer by ID
export const fetchAdminCustomerById = createAsyncThunk(
  'adminCustomers/fetchAdminCustomerById',
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch admin customer by ID');
    }
  }
);

export const createAdminCustomer = createAsyncThunk(
  'adminCustomers/createAdminCustomer',
  async (
    { data, token }: { data: AdminCustomersState; token: string },
    { rejectWithValue }
  ) => {
    try {
      // Validate token
      if (!token) {
        return rejectWithValue('Authentication token is missing');
      }

      const response = await axiosInstance.post(
        '/admin/customers',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data ||
        'Failed to create admin customer. Please check server logs for details.'
      );
    }
  }
);

// Update an existing customer with enhanced debugging and timeout
export const updateAdminCustomer = createAsyncThunk(
  'adminCustomers/updateAdminCustomer',
  async (
    { customerId, data, token }: { customerId: string; data: any; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/admin/customers/${customerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        return rejectWithValue(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError;
        return rejectWithValue(`Update failed: ${axiosError.message}`);
      } else {
        console.error("Non-Axios error during update:", error);
        return rejectWithValue(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
);

// Delete a customer by ID
export const deleteAdminCustomer = createAsyncThunk(
  'adminCustomers/deleteAdminCustomer',
  async ({ customerId, token }: { customerId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/admin/customers/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return customerId;
    } catch (error) {
      let errorMessage = 'Failed to delete admin customer';
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
      // Fetch all customers
      .addCase(fetchAdminCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdminCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch admin customers';
      })
      // Fetch customer by ID
      .addCase(fetchAdminCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCustomerById.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.loading = false;
        state.selectedCustomer = action.payload;
      })
      .addCase(fetchAdminCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create new customer
      .addCase(createAdminCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdminCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createAdminCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update customer
      .addCase(updateAdminCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.loading = false;
        const updatedCustomer = action.payload;
        const updatedData = state.data.map((customer) =>
          customer._id === updatedCustomer._id ? updatedCustomer : customer
        );
        state.data = updatedData;
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
        state.data = state.data.filter((customer) => customer._id !== action.payload);
      })
      .addCase(deleteAdminCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminCustomersSlice.reducer;
