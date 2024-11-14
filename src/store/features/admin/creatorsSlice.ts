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
        console.log('Fetching admin creators...');
        
        // Make the API request
        const response = await axiosInstance.get('/admin/creators', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log('API Response:', response);  // Log the entire response to inspect its structure
  
        if (response.data && response.data.data) {
          console.log('Found data field in response:', response.data.data);
          
          const customers = response.data.data.map((customer: any) => {
            console.log('Mapping customer data:', customer);  // Log each customer before processing it
  
            return {
              id: customer._id ?? null,  // Set to null if _id is missing or undefined
              fullName: customer.fullName ?? '',  // Default to an empty string if fullName is missing or undefined
              creatorType: customer.creatorType ?? 'individual',  // Default to 'individual' if creatorType is missing or undefined
              userType: customer.userType ?? '', // Default to 'user' if user
              role: customer.role ?? '', // Default to ''
              password: customer.password ?? '',  // Default to empty string if password is missing or undefined
              tckn: customer.tckn ?? '',  // Default to empty string if tckn is missing or undefined
              email: customer.email ?? '',  // Default to an empty string if email is missing or undefined
              dateOfBirth: customer.dateOfBirth ?? '',  // Default to an empty string if dateOfBirth is missing or undefined
              gender: customer.gender ?? 'other',  // Default to 'other' if gender is missing or undefined
              phoneNumber: customer.phoneNumber ?? '',  // Default to empty string if phoneNumber is missing or undefined
              isVerified: customer.isVerified ?? false,  // Default to false if isVerified is missing or undefined
              addressOne: customer.addressOne ?? '',  // Default to empty string if addressOne is missing or undefined
              addressTwo: customer.addressTwo ?? '',  // Default to empty string if addressTwo is missing or undefined
              accountType: customer.accountType ?? 'individual',  // Default to 'individual' if accountType is missing or undefined
              invoiceType: customer.invoiceType ?? 'individual',  // Default to 'individual' if invoiceType is missing or undefined
              paymentInformation: {
                ibanNumber: customer.paymentInformation?.ibanNumber ?? '',  // Default to empty string if ibanNumber is missing or undefined
                address: customer.paymentInformation?.address ?? '',  // Default to empty string if address is missing or undefined
                fullName: customer.paymentInformation?.fullName ?? '',  // Default to empty string if fullName is missing or undefined
                trId: customer.paymentInformation?.trId ?? '',  // Default to empty string if trId is missing or undefined
                companyName: customer.paymentInformation?.companyName ?? '',  // Default to empty string if companyName is missing or undefined
                taxNumber: customer.paymentInformation?.taxNumber ?? '',  // Default to empty string if taxNumber is missing or undefined
                taxOffice: customer.paymentInformation?.taxOffice ?? '',  // Default to empty string if taxOffice is missing or undefined
              },
              billingInformation: {
                invoiceStatus: customer.billingInformation?.invoiceStatus ?? false,  // Default to false if invoiceStatus is missing or undefined
                address: customer.billingInformation?.address ?? '',  // Default to empty string if address is missing or undefined
                fullName: customer.billingInformation?.fullName ?? '',  // Default to empty string if fullName is missing or undefined
                trId: customer.billingInformation?.trId ?? '',  // Default to empty string if trId is missing or undefined
                companyName: customer.billingInformation?.companyName ?? '',  // Default to empty string if companyName is missing or undefined
                taxNumber: customer.billingInformation?.taxNumber ?? '',  // Default to empty string if taxNumber is missing or undefined
                taxOffice: customer.billingInformation?.taxOffice ?? '',  // Default to empty string if taxOffice is missing or undefined
              },
              preferences: {
                contentInformation: {
                  contentType: customer.preferences?.contentInformation?.contentType ?? 'other',  // Default to 'other' if contentType is missing or undefined
                  contentFormats: customer.preferences?.contentInformation?.contentFormats ?? [],  // Default to empty array if contentFormats is missing or undefined
                  areaOfInterest: customer.preferences?.contentInformation?.areaOfInterest ?? [],  // Default to empty array if areaOfInterest is missing or undefined
                  addressDetails: {
                    country: customer.preferences?.contentInformation?.addressDetails?.country ?? '',  // Default to empty string if country is missing or undefined
                    state: customer.preferences?.contentInformation?.addressDetails?.state ?? '',  // Default to empty string if state is missing or undefined
                    district: customer.preferences?.contentInformation?.addressDetails?.district ?? '',  // Default to empty string if district is missing or undefined
                    neighbourhood: customer.preferences?.contentInformation?.addressDetails?.neighbourhood ?? '',  // Default to empty string if neighbourhood is missing or undefined
                    fullAddress: customer.preferences?.contentInformation?.addressDetails?.fullAddress ?? '',  // Default to empty string if fullAddress is missing or undefined
                  },
                },
                socialInformation: {
                  contentType: customer.preferences?.socialInformation?.contentType ?? 'other',  // Default to 'other' if contentType is missing or undefined
                  platforms: {
                    Instagram: {
                      followers: customer.preferences?.socialInformation?.platforms?.Instagram?.followers ?? 0,  // Default to 0 if followers count is missing
                      username: customer.preferences?.socialInformation?.platforms?.Instagram?.username ?? '',  // Default to empty string if username is missing
                    },
                    TikTok: {
                      followers: customer.preferences?.socialInformation?.platforms?.TikTok?.followers ?? 0,  // Default to 0 if followers count is missing
                      username: customer.preferences?.socialInformation?.platforms?.TikTok?.username ?? '',  // Default to empty string if username is missing
                    },
                    Youtube: {
                      followers: customer.preferences?.socialInformation?.platforms?.Youtube?.followers ?? 0,  // Default to 0 if followers count is missing
                      username: customer.preferences?.socialInformation?.platforms?.Youtube?.username ?? '',  // Default to empty string if username is missing
                    },
                  },
                  portfolioLink: customer.preferences?.socialInformation?.portfolioLink ?? '',  // Default to empty string if portfolioLink is missing or undefined
                },
              },
              userAgreement: customer.userAgreement ?? false,  // Default to false if userAgreement is missing or undefined
              approvedCommercial: customer.approvedCommercial ?? false,  // Default to false if approvedCommercial is missing or undefined
            };
          });
  
          console.log('Mapped customers:', customers);  // Log the mapped customers to verify the transformation
  
          return customers;
        } else {
          console.warn('Response data does not contain the expected data field.');
          return [];  // Return an empty array if the data is not as expected
        }
      } catch (error) {
        console.error('Error fetching admin customers:', error);  // Log the error message
        throw Error('Failed to fetch admin customers');
      }
    }
  );
  



// Fetch a single customer by ID
export const fetchAdminCreatorById = createAsyncThunk(
  'adminCreators/fetchAdminCreatorById',
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/creators/${id}`, {
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
        '/admin/creators',
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

      const response = await axiosInstance.patch(`/admin/creators/${customerId}`, data, {
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
      const response = await axiosInstance.delete(`/admin/creators/${customerId}`, {
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
