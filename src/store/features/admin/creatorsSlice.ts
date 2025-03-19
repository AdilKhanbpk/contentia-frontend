import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';
import { CreatorInterface } from '@/types/interfaces';


export interface AdminCreatorsState {
  data: CreatorInterface[];
  loading: boolean;
  error: string | null;
  selectedCreator: CreatorInterface | null;
}

const initialState: AdminCreatorsState = {
  data: [],
  loading: false,
  error: null,
  selectedCreator: null,
};

// Fetch all creators
export const fetchAdminCreators = createAsyncThunk(
  'adminCreators/fetchAdminCreators',
  async (token: string) => {
    try {
      const response = await axiosInstance.get('/admin/creators', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.data) {
        const creators = response.data.data.map((creator: CreatorInterface) => {
          return {
            _id: creator._id ?? null,
            fullName: creator.fullName ?? '',
            userType: creator.userType ?? '',
            role: creator.role ?? '',
            password: creator.password ?? '',
            tckn: creator.tckn ?? '',
            email: creator.email ?? '',
            profilePic: creator.profilePic ?? '',
            dateOfBirth: creator.dateOfBirth ?? '',
            gender: creator.gender ?? 'other',
            phoneNumber: creator.phoneNumber ?? '',
            isVerified: creator.isVerified ?? 'pending',
            accountType: creator.accountType ?? 'individual',
            invoiceType: creator.invoiceType ?? 'individual',
            paymentInformation: {
              ibanNumber: creator.paymentInformation?.ibanNumber ?? '',
              address: creator.paymentInformation?.address ?? '',
              fullName: creator.paymentInformation?.fullName ?? '',
              trId: creator.paymentInformation?.trId ?? '',
              companyName: creator.paymentInformation?.companyName ?? '',
              taxNumber: creator.paymentInformation?.taxNumber ?? '',
              taxOffice: creator.paymentInformation?.taxOffice ?? '',
            },
            billingInformation: {
              invoiceStatus: creator.billingInformation?.invoiceStatus ?? false,
              address: creator.billingInformation?.address ?? '',
              fullName: creator.billingInformation?.fullName ?? '',
              trId: creator.billingInformation?.trId ?? '',
              companyName: creator.billingInformation?.companyName ?? '',
              taxNumber: creator.billingInformation?.taxNumber ?? '',
              taxOffice: creator.billingInformation?.taxOffice ?? '',
            },
            preferences: {
              contentInformation: {
                creatorType: creator.preferences.contentInformation.creatorType ?? 'nano',
                contentType: creator.preferences?.contentInformation?.contentType ?? [],
                contentFormats: creator.preferences?.contentInformation?.contentFormats ?? [],
                areaOfInterest: creator.preferences?.contentInformation?.areaOfInterest ?? [],
                addressDetails: {
                  country: creator.preferences?.contentInformation?.addressDetails?.country ?? '',
                  state: creator.preferences?.contentInformation?.addressDetails?.state ?? '',
                  district: creator.preferences?.contentInformation?.addressDetails?.district ?? '',
                  neighborhood: creator.preferences?.contentInformation?.addressDetails?.neighborhood ?? '',
                  fullAddress: creator.preferences?.contentInformation?.addressDetails?.fullAddress ?? '',
                },
              },
              socialInformation: {
                contentType: creator.preferences?.socialInformation?.contentType ?? 'no',
                platforms: {
                  Instagram: {
                    followers: creator.preferences?.socialInformation?.platforms?.Instagram?.followers,
                    username: creator.preferences?.socialInformation?.platforms?.Instagram?.username,
                  },
                  TikTok: {
                    followers: creator.preferences?.socialInformation?.platforms?.TikTok?.followers,
                    username: creator.preferences?.socialInformation?.platforms?.TikTok?.username,
                  },
                  Youtube: {
                    followers: creator.preferences?.socialInformation?.platforms?.Youtube?.followers,
                    username: creator.preferences?.socialInformation?.platforms?.Youtube?.username,
                  },
                  X: {
                    followers: creator.preferences?.socialInformation?.platforms?.X?.followers,
                    username: creator.preferences?.socialInformation?.platforms?.X?.username,
                  },
                  Facebook: {
                    followers: creator.preferences?.socialInformation?.platforms?.Facebook?.followers,
                    username: creator.preferences?.socialInformation?.platforms?.Facebook?.username,
                  },
                  Linkedin: {
                    followers: creator.preferences?.socialInformation?.platforms?.Linkedin?.followers,
                    username: creator.preferences?.socialInformation?.platforms?.Linkedin?.username,
                  },
                },
                portfolioLink: creator.preferences?.socialInformation?.portfolioLink,
              },
            },
            settings: {
              isNotificationOn: creator.settings?.isNotificationOn ?? false,
            },
            userAgreement: creator.userAgreement ?? false,
            approvedCommercial: creator.approvedCommercial ?? false,
          };
        });
        return creators;
      } else {
        return [];
      }
    } catch (error) {
      throw Error('Failed to fetch admin creators');
    }
  }
);

// Fetch a single creator by ID
export const fetchAdminCreatorById = createAsyncThunk(
  'adminCreators/fetchAdminCreatorById',
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/creators/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch admin creator by ID');
    }
  }
);

export const createAdminCreator = createAsyncThunk(
  'adminCreators/createAdminCreator',
  async (
    { data, token }: { data: any; token: string },
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
        'Failed to create admin creator. Please check server logs for details.'
      );
    }
  }
);

export const updateAdminCreator = createAsyncThunk(
  'adminCreators/updateAdminCreator',
  async (
    { creatorId, data, token }: { creatorId: string; data: any; token: string },
    { rejectWithValue }
  ) => {

    try {
      const response = await axiosInstance.patch(`/admin/creators/${creatorId}`, data, {
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

export const deleteAdminCreator = createAsyncThunk(
  'adminCreators/deleteAdminCreator',
  async ({ creatorId, token }: { creatorId: string; token: string }, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.delete(`/admin/creators/${creatorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      let errorMessage = 'Failed to delete admin creator';
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
      // Fetch all creators
      .addCase(fetchAdminCreators.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCreators.fulfilled, (state, action: PayloadAction<CreatorInterface[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdminCreators.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch admin creators';
      })
      // Fetch creator by ID
      .addCase(fetchAdminCreatorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCreatorById.fulfilled, (state, action: PayloadAction<CreatorInterface>) => {
        state.loading = false;
        state.selectedCreator = action.payload;
      })
      .addCase(fetchAdminCreatorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create new creator
      .addCase(createAdminCreator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdminCreator.fulfilled, (state, action: PayloadAction<CreatorInterface>) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createAdminCreator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update creator
      .addCase(updateAdminCreator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminCreator.fulfilled, (state, action: PayloadAction<CreatorInterface>) => {
        state.loading = false;
        const updatedCreator = action.payload;
        const updatedData = state.data.map((creator) =>
          creator._id === updatedCreator._id ? updatedCreator : creator
        );
        state.data = updatedData;
      })
      .addCase(updateAdminCreator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete creator
      .addCase(deleteAdminCreator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdminCreator.fulfilled, (state, action: PayloadAction<CreatorInterface>) => {
        state.loading = false;
        const filteredCreators = state.data.filter((creator) => creator._id !== action.payload._id);
        state.data = filteredCreators
      })
      .addCase(deleteAdminCreator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminCreatorsSlice.reducer;
