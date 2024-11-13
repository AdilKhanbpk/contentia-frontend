import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

type Creator = { [key: string]: any }; // Define this according to your customer object structure

export interface AdminCreatorsState {
  data: Creator[];
  loading: boolean;
  error: string | null;
  selectedCustomer: Creator | null;
}

const initialState: AdminCreatorsState = {
  data: [],
  loading: false,
  error: null,
  selectedCustomer: null,
};

// Fetch all customers
export const fetchAdminCreators = createAsyncThunk(
  'adminCreators/fetchAdminCreators',
  async (token: string) => {
    try {
      const response = await axiosInstance.get('/admin/creators', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.data) {
        const customers = response.data.data.map((customer: any) => ({
          id: customer._id ?? null,  // Set to null if _id is missing or undefined
          fullName: customer.fullName ?? '',  // Default to an empty string if fullName is missing or undefined
          email: customer.email ?? '',  // Default to an empty string if email is missing or undefined
          contact: customer.phoneNumber ?? '',  // Default to an empty string if phoneNumber is missing or undefined
          age: customer.age ?? null,  // Set to null if age is missing or undefined
          country: customer.country ?? '',  // Default to an empty string if country is missing or undefined
          status: customer.status ?? '',  // Default to an empty string if status is missing or undefined
          invoiceType: customer.invoiceType ?? '',  // Default to an empty string if invoiceType is missing or undefined
          customerStatus: customer.customerStatus ?? '',  // Default to an empty string if customerStatus is missing or undefined
          billingInformation: {
            invoiceStatus: customer.billingInformation?.invoiceStatus ?? false,  // Default to false if invoiceStatus is missing or undefined
            trId: customer.billingInformation?.trId ?? '',  // Default to an empty string if trId is missing or undefined
            address: customer.billingInformation?.address ?? '',  // Default to an empty string if address is missing or undefined
            fullName: customer.billingInformation?.fullName ?? '',  // Default to an empty string if fullName is missing or undefined
            companyName: customer.billingInformation?.companyName ?? '',  // Default to an empty string if companyName is missing or undefined
            taxNumber: customer.billingInformation?.taxNumber ?? '',  // Default to an empty string if taxNumber is missing or undefined
            taxOffice: customer.billingInformation?.taxOffice ?? ''  // Default to an empty string if taxOffice is missing or undefined
          },
          rememberMe: customer.rememberMe ?? false,  // Default to false if rememberMe is missing or undefined
          termsAndConditionsApproved: customer.termsAndConditionsApproved ?? false  // Default to false if termsAndConditionsApproved is missing or undefined
        }));

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
export const fetchAdminCreatorById = createAsyncThunk(
  'adminCreators/fetchAdminCreatorById',
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

export const createAdminCreator = createAsyncThunk(
  'adminCreators/createAdminCreator',
  async (
    { data, token }: { data: AdminCreatorsState; token: string },
    { rejectWithValue }
  ) => {
    try {
      // Validate token
      if (!token) {
        return rejectWithValue('Authentication token is missing');
      }

      // Log request details
      console.log('Creating customer with data:', data);

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
      
      // Log detailed error information
      console.error('Customer creation failed:', {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        headers: axiosError.response?.headers,
      });

      return rejectWithValue(
        axiosError.response?.data || 
        'Failed to create admin customer. Please check server logs for details.'
      );
    }
  }
);


// Update an existing customer with enhanced debugging and timeout
export const updateAdminCreator = createAsyncThunk(
  'adminCreators/updateAdminCreator',
  async (
    { customerId, data, token }: { customerId: string; data: any; token: string },
    { rejectWithValue }
  ) => {
    console.group("updateAdminCreator Thunk Debugging");

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
export const deleteAdminCreator = createAsyncThunk(
  'adminCreators/deleteAdminCreator',
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


const adminCreatorsSlice = createSlice({
  name: 'adminCreators',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all customers
      .addCase(fetchAdminCreators.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCreators.fulfilled, (state, action: PayloadAction<Creator[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdminCreators.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch admin customers';
      })
      // Fetch customer by ID
      .addCase(fetchAdminCreatorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCreatorById.fulfilled, (state, action: PayloadAction<Creator>) => {
        state.loading = false;
        state.selectedCustomer = action.payload;
      })
      .addCase(fetchAdminCreatorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create new customer
      .addCase(createAdminCreator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdminCreator.fulfilled, (state, action: PayloadAction<Creator>) => {
        state.loading = false;
        state.data.push(action.payload); // Add the new customer to the list
      })
      .addCase(createAdminCreator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update customer
      .addCase(updateAdminCreator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminCreator.fulfilled, (state, action: PayloadAction<Creator>) => {
        state.loading = false;
        const updatedCustomer = action.payload;
        const updatedData = state.data.map((customer) =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        );
        state.data = updatedData; // Create a new reference to trigger re-render
      })
      .addCase(updateAdminCreator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete customer
      .addCase(deleteAdminCreator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdminCreator.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.data = state.data.filter((customer) => customer.id !== action.payload);
      })
      .addCase(deleteAdminCreator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminCreatorsSlice.reducer;
