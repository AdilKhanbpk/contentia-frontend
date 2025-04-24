import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';
import { Customer } from '@/types/interfaces';


export interface AdminCustomersState {
  data: Customer[];
  adminData: Customer[];
  loading: boolean;
  error: string | null;
  selectedCustomer: Customer | null;
}

const initialState: AdminCustomersState = {
  data: [],
  adminData: [],
  loading: false,
  error: null,
  selectedCustomer: null,
};

// Fetch all customers
export const fetchAdminCustomers = createAsyncThunk(
  'adminCustomers/fetchAdminCustomers',
  async () => {
    try {
      const response = await axiosInstance.get('/admin/customers');

      if (response.data && response.data.data) {
        const customers = response.data.data.map((customer: Customer) => ({
          _id: customer._id ?? null,
          role: customer.role ?? 'user',
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
export const fetchAdmins = createAsyncThunk(
  'adminCustomers/fetchAdmins',
  async () => {
    try {
      const response = await axiosInstance.get('/admin/customers/admins');

      if (response.data && response.data.data) {
        const customers = response.data.data.map((customer: Customer) => ({
          _id: customer._id ?? null,
          role: customer.role,
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
  async ({ id }: { id: string; }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/customers/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch admin customer by ID');
    }
  }
);

export const createAdminCustomer = createAsyncThunk(
  'adminCustomers/createAdminCustomer',
  async (
    { data }: { data: AdminCustomersState; },
    { rejectWithValue }
  ) => {
    try {


      const response = await axiosInstance.post(
        '/admin/customers',
        data
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
    { customerId, data }: { customerId: string; data: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/admin/customers/${customerId}`, data);
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
  async ({ customerId }: { customerId: string; }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/admin/customers/${customerId}`);
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
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.loading = false;
        state.adminData = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch admins ';
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


