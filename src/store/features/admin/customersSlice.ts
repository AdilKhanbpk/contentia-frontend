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

        const customers = response.data.data.map((customer: any) => ({
          ID: customer._id, // Assuming "_id" is the customer ID
          Name: customer.fullName || 'N/A',  // Replace with 'N/A' if fullName is missing or undefined
          Email: customer.email || 'N/A',  // Replace with 'N/A' if email is missing or undefined
          Contact: customer.phoneNumber || 'N/A',  // Replace with 'N/A' if phoneNumber is missing or undefined
          Age: customer.age || 'N/A',  // Replace with 'N/A' if age is missing or undefined
          Country: customer.country || 'N/A',  // Replace with 'N/A' if country is missing or undefined
          Status: customer.status || 'N/A',  // Replace with 'N/A' if status is missing or undefined
          InvoiceType: customer.invoiceType || 'N/A',  // Replace with 'N/A' if invoiceType is missing or undefined
          CustomerStatus: customer.customerStatus || 'N/A',  // Replace with 'N/A' if customerStatus is missing or undefined
          BillingInformation: {
            // Ensure invoiceStatus is a boolean or null (not 'N/A')
            InvoiceStatus: customer.billingInformation?.invoiceStatus === 'N/A' 
              ? false // Default to false if 'N/A' is found
              : customer.billingInformation?.invoiceStatus ?? false, // Fallback to false if undefined or null
            TrId: customer.billingInformation?.trId || 'N/A',  // Replace with 'N/A' if trId is missing or undefined
            Address: customer.billingInformation?.address || 'N/A',  // Replace with 'N/A' if address is missing or undefined
            FullName: customer.billingInformation?.fullName || 'N/A',  // Replace with 'N/A' if fullName is missing or undefined
            CompanyName: customer.billingInformation?.companyName || 'N/A',  // Replace with 'N/A' if companyName is missing or undefined
            TaxNumber: customer.billingInformation?.taxNumber || 'N/A',  // Replace with 'N/A' if taxNumber is missing or undefined
            TaxOffice: customer.billingInformation?.taxOffice || 'N/A'  // Replace with 'N/A' if taxOffice is missing or undefined
          },
          RememberMe: customer.rememberMe ?? 'N/A',  // Replace with 'N/A' if rememberMe is missing or undefined
          TermsAndConditionsApproved: customer.termsAndConditionsApproved ?? 'N/A'  // Replace with 'N/A' if termsAndConditionsApproved is missing or undefined
        }));

        console.log(customers);

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
  async ({ ID, token }: { ID: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/customers/${ID}`, {
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
    { data, token }: { data: any; token: string },
    { rejectWithValue }
  ) => {
    console.log("Thunks received data:", data);
    console.log("Thunks received token:", token);

    try {
      const response = await axiosInstance.post('/admin/customers', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during customer creation:", error);
      return rejectWithValue('Failed to create admin customer');
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
    console.group("updateAdminCustomer Thunk Debugging");

    console.log("Starting customer update process");
    console.log("Customer ID to update:", customerId);
    console.log("Data being sent for update:", data);
    console.log("Authorization token:", token);

    try {
      console.log("Attempting to send PATCH request to server...");

      const response = await axiosInstance.patch(`/admin/customers/${customerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000, // Set a 10-second timeout
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("Update successful, server response data:", response.data);
        console.groupEnd();
        return response.data;
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
        console.groupEnd();
        return rejectWithValue(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.group("Error Details");

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError;
        console.error("Axios error during update. Server response:", axiosError.response);
        
        if (axiosError.response) {
          console.log("Server response status:", axiosError.response.status);
          console.log("Server response data:", axiosError.response.data);
          console.log("Server headers:", axiosError.response.headers);
        } else if (axiosError.request) {
          console.error("Request was made but no response was received:", axiosError.request);
        }
        
        return rejectWithValue(`Update failed: ${axiosError.message}`);
      } else {
        console.error("Non-Axios error during update:", error);
        return rejectWithValue(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
      }

      console.groupEnd();
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
        state.data = state.data.filter((customer) => customer.ID !== action.payload);
      })
      .addCase(deleteAdminCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminCustomersSlice.reducer;
