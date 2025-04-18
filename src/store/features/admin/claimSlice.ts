import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';
import { ClaimInterface } from '@/types/interfaces';



export interface AdminClaimsState {
    data: ClaimInterface[];
    loading: boolean;
    error: string | null;
    selectedClaim: ClaimInterface | null;
}

const initialState: AdminClaimsState = {
    data: [],
    loading: false,
    error: null,
    selectedClaim: null,
};

// Fetch all claims
export const fetchAdminClaims = createAsyncThunk(
    'adminClaims/fetchAdminClaims',
    async (token: string) => {
        try {
            const response = await axiosInstance.get('/admin/claims', {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data.data

        } catch (error) {
            throw Error('Failed to fetch admin claims');
        }
    }
);

// Fetch a single claim by ID
export const fetchAdminClaimById = createAsyncThunk(
    'adminClaims/fetchAdminClaimById',
    async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.get(`/admin/claims/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.data

        } catch (error) {
            return rejectWithValue('Failed to fetch admin claim by ID');
        }
    }
);

export const createAdminClaim = createAsyncThunk(
    'adminClaims/createAdminClaim',
    async (
        { data, token }: { data: Partial<ClaimInterface>; token: string },
        { rejectWithValue }
    ) => {
        console.group("createAdminClaim Thunk Debugging");

        try {
            // Validate token
            if (!token) {
                console.warn('Authentication token is missing');
                return rejectWithValue('Authentication token is missing');
            }

            const formattedData = {
                status: data.status,
                creatorId: data.creator?._id,
                orderId: data.order?._id,
                claimDate: data.claimDate,
                claimContent: data.claimContent,
            };

            const response = await axiosInstance.post('/admin/claims', formattedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const newClaim: ClaimInterface = {
                _id: response.data.data._id,
                status: response.data.data.status,
                customer: {
                    _id: response.data.data.customer?._id ?? null,
                    fullName: response.data.data.customer?.fullName ?? '',
                    email: response.data.data.customer?.email ?? '',
                },
                creator: {
                    _id: response.data.data.creator?._id ?? null,
                    fullName: response.data.data.creator?.fullName ?? '',
                    email: response.data.data.creator?.email ?? '',
                },
                order: {
                    _id: response.data.data.order?._id ?? null,
                },
                claimDate: response.data.data.claimDate,
                claimContent: response.data.data.claimContent,
            };

            return newClaim;

        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data ||
                'Failed to create admin claim. Please check server logs for details.'
            );
        }
    }
);

// Update an existing claim
export const updateAdminClaim = createAsyncThunk(
    'adminClaims/updateAdminClaim',
    async (
        { claimId, data, token }: { claimId: string; data: Partial<ClaimInterface>; token: string },
        { rejectWithValue }
    ) => {

        try {
            const response = await axiosInstance.patch(`/admin/claims/${claimId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000,
            });

            const updatedClaim = {
                _id: response.data._id,
                status: response.data.status,
                customer: {
                    _id: response.data.customer?._id,
                    fullName: response.data.customer?.fullName,
                    email: response.data.customer?.email
                },
                creator: {
                    _id: response.data.creator?._id,
                    fullName: response.data.creator?.fullName,
                    email: response.data.creator?.email
                },
                order: {
                    _id: response.data.order?._id
                },
                claimDate: response.data.claimDate,
                claimContent: response.data.claimContent
            };

            return updatedClaim;

        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data ||
                'Failed to update admin claim. Please check server logs for details.'
            );
        }
    }
);

// Delete a claim by ID
export const deleteAdminClaim = createAsyncThunk(
    'adminClaims/deleteAdminClaim',
    async ({ claimId, token }: { claimId: string; token: string }, { rejectWithValue }) => {

        try {
            await axiosInstance.delete(`/admin/claims/${claimId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return claimId;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data ||
                'Failed to delete admin claim. Please check server logs for details.'
            );
        }
    }
);

// Create the slice
const adminClaimsSlice = createSlice({
    name: 'adminClaims',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all claims
            .addCase(fetchAdminClaims.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminClaims.fulfilled, (state, action: PayloadAction<ClaimInterface[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAdminClaims.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch admin claims';
            })

            // Fetch claim by ID
            .addCase(fetchAdminClaimById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminClaimById.fulfilled, (state, action: PayloadAction<ClaimInterface>) => {
                state.loading = false;
                state.selectedClaim = action.payload;
            })
            .addCase(fetchAdminClaimById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create new claim
            .addCase(createAdminClaim.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAdminClaim.fulfilled, (state, action: PayloadAction<ClaimInterface>) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(createAdminClaim.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update claim
            .addCase(updateAdminClaim.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAdminClaim.fulfilled, (state, action: PayloadAction<ClaimInterface>) => {
                state.loading = false;
                const updatedClaim = action.payload;
                const updatedData = state.data.map((claim) =>
                    claim._id === updatedClaim._id ? updatedClaim : claim
                );
                state.data = updatedData;
            })
            .addCase(updateAdminClaim.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete claim
            .addCase(deleteAdminClaim.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAdminClaim.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.data = state.data.filter((claim) => claim._id !== action.payload);
            })
            .addCase(deleteAdminClaim.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default adminClaimsSlice.reducer;