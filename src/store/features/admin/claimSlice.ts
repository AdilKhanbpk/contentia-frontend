import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

// Define the Claim type based on the model structure
export interface Claim {
    id?: string;
    status?: 'pending' | 'approved' | 'rejected';
    customer?: {
        id?: string;
        fullName?: string;
        email?: string;
    };
    order?: {
        id?: string;
    };
    claimDate?: Date | string;
    claimContent: string;
}

// State interface for Claims
export interface AdminClaimsState {
    data: Claim[];
    loading: boolean;
    error: string | null;
    selectedClaim: Claim | null;
}

// Initial state
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
            console.group("fetchAdminClaims Thunk Debugging");
            console.log("Fetching claims with token:", token);

            const response = await axiosInstance.get('/admin/claims', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data && response.data.data) {
                const claims = response.data.data.map((claim: any) => ({
                    id: claim._id ?? null,
                    status: claim.status ?? 'pending',
                    customer: {
                        id: claim.customer?._id ?? null,
                        fullName: claim.customer?.fullName ?? '',
                        email: claim.customer?.email ?? ''
                    },
                    order: {
                        id: claim.order?._id ?? null
                    },
                    claimDate: claim.claimDate ?? new Date(),
                    claimContent: claim.claimContent ?? ''
                }));

                console.log("Fetched claims:", claims);
                console.groupEnd();
                return claims;
            } else {
                console.warn('Response data does not contain the expected data field.');
                console.groupEnd();
                return [];
            }
        } catch (error) {
            console.error('Error fetching admin claims:', error);
            console.groupEnd();
            throw Error('Failed to fetch admin claims');
        }
    }
);

// Fetch a single claim by ID
export const fetchAdminClaimById = createAsyncThunk(
    'adminClaims/fetchAdminClaimById',
    async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
        console.group("fetchAdminClaimById Thunk Debugging");
        console.log("Fetching claim with ID:", id);

        try {
            const response = await axiosInstance.get(`/admin/claims/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Response from fetchAdminClaimById:", response.data);

            // Map the data properly
            const claim = {
                id: response.data.data?._id ?? null,
                status: response.data.data?.status ?? 'pending',
                customer: {
                    id: response.data.data?.customer?._id ?? null,
                    fullName: response.data.data?.customer?.billingInformation?.fullName ?? '',
                    email: response.data.data?.customer?.billingInformation?.email ?? '',
                },
                order: {
                    id: response.data.data?.order?._id ?? null,
                },
                claimDate: response.data.data?.claimDate ?? null,
                claimContent: response.data.data?.claimContent ?? '',
            };

            console.log("Mapped claim details:", claim);
            console.groupEnd();
            return claim;
        } catch (error) {
            console.error("Error fetching claim by ID:", error);
            console.groupEnd();
            return rejectWithValue('Failed to fetch admin claim by ID');
        }
    }
);

export const createAdminClaim = createAsyncThunk(
    'adminClaims/createAdminClaim',
    async (
        { data, token }: { data: Partial<Claim>; token: string },
        { rejectWithValue }
    ) => {
        console.group("createAdminClaim Thunk Debugging");

        try {
            // Validate token
            if (!token) {
                console.warn('Authentication token is missing');
                return rejectWithValue('Authentication token is missing');
            }

            // Format the data before sending it to the API
            const formattedData = {
                status: data.status,
                customerId: data.customer?.id,
                orderId: data.order?.id,
                claimDate: data.claimDate,
                claimContent: data.claimContent,
            };

            console.log("formatted data", formattedData);

            const response = await axiosInstance.post('/admin/claims', formattedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("response ", response);

            // Ensure the response matches the backend structure
            const newClaim = {
                status: response.data.data.status,
                customerId: response.data.data.customer, // Getting the customer ID from response
                orderId: response.data.data.order, // Getting the order ID from response
                claimDate: response.data.data.claimDate,
                claimContent: response.data.data.claimContent,
            };

            console.log("Created claim:", newClaim);
            console.groupEnd();
            return newClaim;
        } catch (error) {
            const axiosError = error as AxiosError;

            console.error('Claim creation failed:', {
                status: axiosError.response?.status,
                statusText: axiosError.response?.statusText,
                data: axiosError.response?.data,
            });
            console.groupEnd();

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
        { claimId, data, token }: { claimId: string; data: Partial<Claim>; token: string },
        { rejectWithValue }
    ) => {
        console.group("updateAdminClaim Thunk Debugging");
        console.log("Updating claim. Claim ID:", claimId);
        console.log("Update data:", data);

        try {
            const response = await axiosInstance.patch(`/admin/claims/${claimId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000, // 10-second timeout
            });

            const updatedClaim = {
                id: response.data._id,
                status: response.data.status,
                customer: {
                    id: response.data.customer?._id,
                    fullName: response.data.customer?.fullName,
                    email: response.data.customer?.email
                },
                order: {
                    id: response.data.order?._id
                },
                claimDate: response.data.claimDate,
                claimContent: response.data.claimContent
            };

            console.log("Updated claim:", updatedClaim);
            console.groupEnd();
            return updatedClaim;
        } catch (error) {
            const axiosError = error as AxiosError;

            console.error('Claim update failed:', {
                status: axiosError.response?.status,
                statusText: axiosError.response?.statusText,
                data: axiosError.response?.data,
            });
            console.groupEnd();

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
        console.group("deleteAdminClaim Thunk Debugging");
        console.log("Attempting to delete claim:", claimId);

        try {
            await axiosInstance.delete(`/admin/claims/${claimId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Claim deleted successfully:", claimId);
            console.groupEnd();
            return claimId;
        } catch (error) {
            const axiosError = error as AxiosError;

            console.error('Claim deletion failed:', {
                status: axiosError.response?.status,
                statusText: axiosError.response?.statusText,
                data: axiosError.response?.data,
            });
            console.groupEnd();

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
            .addCase(fetchAdminClaims.fulfilled, (state, action: PayloadAction<Claim[]>) => {
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
            .addCase(fetchAdminClaimById.fulfilled, (state, action: PayloadAction<Claim>) => {
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
            .addCase(createAdminClaim.fulfilled, (state, action: PayloadAction<Claim>) => {
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
            .addCase(updateAdminClaim.fulfilled, (state, action: PayloadAction<Claim>) => {
                state.loading = false;
                const updatedClaim = action.payload;
                const updatedData = state.data.map((claim) =>
                    claim.id === updatedClaim.id ? updatedClaim : claim
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
                state.data = state.data.filter((claim) => claim.id !== action.payload);
            })
            .addCase(deleteAdminClaim.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default adminClaimsSlice.reducer;