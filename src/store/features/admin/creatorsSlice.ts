import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

type Creator = { [key: string]: any };

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
          const customers = response.data.data.map((customer: any) => {
            return {
              id: customer._id ?? null,
              fullName: customer.fullName ?? '',
              creatorType: customer.creatorType ?? 'individual',
              userType: customer.userType ?? '',
              role: customer.role ?? '',
              password: customer.password ?? '',
              identityNo: customer.identityNo ?? '',
              email: customer.email ?? '',
              dateOfBirth: customer.dateOfBirth ?? '',
              gender: customer.gender ?? 'other',
              phoneNumber: customer.phoneNumber ?? '',
              isVerified: customer.isVerified ?? 'pending',
              accountType: customer.accountType ?? 'individual',
              invoiceType: customer.invoiceType ?? 'individual',
              addressDetails: {
                addressOne: customer.addressDetails?.addressOne ?? '',
                addressTwo: customer.addressDetails?.addressTwo ?? '',
                country: customer.addressDetails?.country ?? '',
                zipCode: customer.addressDetails?.zipCode ?? '',
              },
              paymentInformation: {
                ibanNumber: customer.paymentInformation?.ibanNumber ?? '',
                address: customer.paymentInformation?.address ?? '',
                fullName: customer.paymentInformation?.fullName ?? '',
                trId: customer.paymentInformation?.trId ?? '',
                companyName: customer.paymentInformation?.companyName ?? '',
                taxNumber: customer.paymentInformation?.taxNumber ?? '',
                taxOffice: customer.paymentInformation?.taxOffice ?? '',
              },
              billingInformation: {
                invoiceStatus: customer.billingInformation?.invoiceStatus ?? false,
                address: customer.billingInformation?.address ?? '',
                fullName: customer.billingInformation?.fullName ?? '',
                trId: customer.billingInformation?.trId ?? '',
                companyName: customer.billingInformation?.companyName ?? '',
                taxNumber: customer.billingInformation?.taxNumber ?? '',
                taxOffice: customer.billingInformation?.taxOffice ?? '',
              },
              preferences: {
                contentInformation: {
                  contentType: customer.preferences?.contentInformation?.contentType ?? 'other',
                  contentFormats: customer.preferences?.contentInformation?.contentFormats ?? [],
                  areaOfInterest: customer.preferences?.contentInformation?.areaOfInterest ?? [],
                  addressDetails: {
                    country: customer.preferences?.contentInformation?.addressDetails?.country ?? '',
                    state: customer.preferences?.contentInformation?.addressDetails?.state ?? '',
                    district: customer.preferences?.contentInformation?.addressDetails?.district ?? '',
                    neighbourhood: customer.preferences?.contentInformation?.addressDetails?.neighbourhood ?? '',
                    fullAddress: customer.preferences?.contentInformation?.addressDetails?.fullAddress ?? '',
                  },
                },
                socialInformation: {
                  contentType: customer.preferences?.socialInformation?.contentType ?? 'other',
                  platforms: {
                    Instagram: {
                      followers: customer.preferences?.socialInformation?.platforms?.Instagram?.followers ?? 0,
                      username: customer.preferences?.socialInformation?.platforms?.Instagram?.username ?? '',
                    },
                    TikTok: {
                      followers: customer.preferences?.socialInformation?.platforms?.TikTok?.followers ?? 0,
                      username: customer.preferences?.socialInformation?.platforms?.TikTok?.username ?? '',
                    },
                    Youtube: {
                      followers: customer.preferences?.socialInformation?.platforms?.Youtube?.followers ?? 0,
                      username: customer.preferences?.socialInformation?.platforms?.Youtube?.username ?? '',
                    },
                    X: {
                      followers: customer.preferences?.socialInformation?.platforms?.Instagram?.followers ?? 0,
                      username: customer.preferences?.socialInformation?.platforms?.Instagram?.username ?? '',
                    },
                    Facebook: {
                      followers: customer.preferences?.socialInformation?.platforms?.TikTok?.followers ?? 0,
                      username: customer.preferences?.socialInformation?.platforms?.TikTok?.username ?? '',
                    },
                    Linkedin: {
                      followers: customer.preferences?.socialInformation?.platforms?.Youtube?.followers ?? 0,
                      username: customer.preferences?.socialInformation?.platforms?.Youtube?.username ?? '',
                    },
                  },
                  portfolioLink: customer.preferences?.socialInformation?.portfolioLink ?? '',
                },
              },
              userAgreement: customer.userAgreement ?? false,
              approvedCommercial: customer.approvedCommercial ?? false,
            };
          });
          return customers;
        } else {
          return [];
        }
      } catch (error) {
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
      console.log("fetching creator in fetchCreator : ", response.data);
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

    try {
      const response = await axiosInstance.patch(`/admin/creators/${customerId}`, data, {
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
        if (axiosError.response) {
          console.log("Server response status:", axiosError.response.status);
        } else if (axiosError.request) {
          console.error("Request was made but no response was received:", axiosError.request);
        }
        return rejectWithValue(`Update failed: ${axiosError.message}`);
      } else {
        console.error("Non-Axios error during update:", error);
        return rejectWithValue(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
);

// Delete a customer by ID
export const deleteAdminCreator = createAsyncThunk(
  'adminCreators/deleteAdminCreator',
  async ({ customerId, token }: { customerId: string; token: string }, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.delete(`/admin/creators/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return customerId;
    } catch (error) {
      let errorMessage = 'Failed to delete admin customer';
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
        state.data.push(action.payload);
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
        state.data = updatedData;
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
