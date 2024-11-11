import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

type Customer = { [key: string]: any }; // Define this according to your customer object structure

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
    // console.log('Fetching admin customers...');
    // console.log('Token:', token); // Log the token used for the request

    try {
      // console.log('Making API request to /admin/customers'); // Log before API request

      const response = await axiosInstance.get('/admin/customers', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log('API response received:', response); // Log the full response object

      if (response.data && response.data.data) {
        // console.log('Fetched customers data:', response.data.data); // Log the actual data received

        // Extract the required fields
        const customers = response.data.data.map((customer: any) => ({
          ID: customer._id,  // Assuming "_id" is the customer ID
          Name: customer.fullName || 'N/A',  // Replace with 'N/A' if name is missing
          Email: customer.email || 'N/A',  // Replace with 'N/A' if email is missing
          Contact: customer.phoneNumber || 'N/A',  // Replace with 'N/A' if contact is missing
          Age: customer.age || 'N/A',  // Replace with 'N/A' if age is missing
          Country: customer.country || 'N/A',  // Replace with 'N/A' if country is missing
          Status: customer.status || 'N/A',  // Replace with 'N/A' if status is missing
        }));

        // console.log(customers);

        return customers;
      } else {
        console.warn('Response data does not contain the expected data field.');
        return [];  // Return an empty array if the data is not as expected
      }
    } catch (error) {
      console.error('Error fetching admin customers:', error); // Log the error message
      throw Error('Failed to fetch admin customers');
    }
  }
);



// Fetch a single customer by ID
export const fetchAdminCustomerById = createAsyncThunk(
  'adminCustomers/fetchAdminCustomerById',
  async ({ customerId, token }: { customerId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/customers/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch admin customer by ID');
    }
  }
);

// Create a new customer
export const createAdminCustomer = createAsyncThunk(
  'adminCustomers/createAdminCustomer',
  async ({ data, token }: { data: any; token: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/admin/customers', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to create admin customer');
    }
  }
);

// Update an existing customer
export const updateAdminCustomer = createAsyncThunk(
  'adminCustomers/updateAdminCustomer',
  async (
    { customerId, data, token }: { customerId: string; data: any; token: string },
    { rejectWithValue }
  ) => {
    console.log("Starting customer update process");
    console.log("Customer ID to update:", customerId);
    console.log("Data being sent for update:", data);
    console.log("Authorization token:", token);

    try {
      const response = await axiosInstance.patch(`/admin/customers/${customerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Update successful, server response:", response.data);
      return response.data; // Return updated customer data to be handled by the component or Redux store
    } catch (error) {
      let errorMessage = 'Failed to update admin customer';
      if ((error as AxiosError).isAxiosError && (error as AxiosError).response) {
        errorMessage = `Update failed: ${(error as AxiosError).response?.data || 'Unknown error'}`;
        console.error("Server responded with error:", (error as AxiosError).response);
      } else {
        console.error("Unexpected error during update:", error);
      }
      return rejectWithValue(errorMessage);
    }
  }
);


// Delete a customer by ID
export const deleteAdminCustomer = createAsyncThunk(
  'adminCustomers/deleteAdminCustomer',
  async ({ customerId, token }: { customerId: string; token: string }, { rejectWithValue }) => {
    console.log("Attempting to delete customer:", customerId);
    console.log("Token provided:", token);
    try {
      const response = await axiosInstance.delete(`/admin/customers/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Delete successful, server response:", response);
      return customerId;
    } catch (error) {
      let errorMessage = 'Failed to delete admin customer';
      if ((error as AxiosError).isAxiosError && (error as AxiosError).response) {
        errorMessage = `Delete failed: ${(error as AxiosError).response?.data || 'Unknown error'}`;
        console.error("Server responded with an error:", (error as AxiosError).response);
      } else {
        console.error("Axios error:", error);
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
        state.data.push(action.payload); // Add the new customer to the list
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
        state.data = state.data.filter((customer) => customer._id !== action.payload);
      })
      .addCase(deleteAdminCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminCustomersSlice.reducer;
