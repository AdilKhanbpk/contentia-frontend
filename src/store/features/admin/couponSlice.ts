import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

export interface Coupon {
    _id: string;
    customer: string;
    code: string;
    discountTl?: string;
    discountPercentage?: number;
    expiryDate: Date;
    isActive: boolean;
    usageLimit: number | null;
    usedCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CouponState {
    data: Coupon[] | null;
    selectedCoupon: Coupon | null;
    loading: boolean;
    error: string | null;
}

const initialState: CouponState = {
    data: null,
    selectedCoupon: null,
    loading: false,
    error: null,
};

// Create a new coupon
export const createCoupon = createAsyncThunk(
    'coupon/createCoupon',
    async ({ data, token }: { data: any; token: string }, { rejectWithValue }) => {
        console.log('Creating coupon with data:', data);
        try {
            const response = await axiosInstance.post('/admin/coupons', data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Coupon created successfully:', response.data.data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error creating coupon:', axiosError);
            return rejectWithValue(
                axiosError.response?.data || 'Failed to create coupon'
            );
        }
    }
);

// Get all coupons (admin)
export const getCoupons = createAsyncThunk(
    'coupon/getCoupons',
    async (token: string, { rejectWithValue }) => {
        console.log('Fetching all coupons...');
        try {
            const response = await axiosInstance.get('/admin/coupons', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Coupons fetched successfully:', response.data.data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error fetching coupons:', axiosError);
            return rejectWithValue(
                axiosError.response?.data || 'Failed to fetch coupons'
            );
        }
    }
);

// Get my coupons (user)
export const getMyCoupons = createAsyncThunk(
    'coupon/getMyCoupons',
    async (token: string, { rejectWithValue }) => {
        console.log('Fetching user coupons...');
        try {
            const response = await axiosInstance.get('/admin/coupons/my-coupons', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('User coupons fetched successfully:', response.data.data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error fetching user coupons:', axiosError);
            return rejectWithValue(
                axiosError.response?.data || 'Failed to fetch your coupons'
            );
        }
    }
);

// Get coupon by ID
export const getCouponById = createAsyncThunk(
    'coupon/getCouponById',
    async (
        { id, token }: { id: string; token: string },
        { rejectWithValue }
    ) => {
        console.log(`Fetching coupon with ID: ${id}`);
        try {
            const response = await axiosInstance.get(`/admin/coupons/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Coupon fetched successfully:', response.data.data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error(`Error fetching coupon with ID ${id}:`, axiosError);
            return rejectWithValue(
                axiosError.response?.data || 'Failed to fetch coupon'
            );
        }
    }
);

// Update coupon
export const updateCoupon = createAsyncThunk(
    'coupon/updateCoupon',
    async (
        { id, data, token }: { id: string; data: any; token: string },
        { rejectWithValue }
    ) => {
        console.log(`Updating coupon with ID: ${id}`, data);
        try {
            const response = await axiosInstance.patch(`/admin/coupons/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Coupon updated successfully:', response.data.data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error(`Error updating coupon with ID ${id}:`, axiosError);
            return rejectWithValue(
                axiosError.response?.data || 'Failed to update coupon'
            );
        }
    }
);

// Delete coupon
export const deleteCoupon = createAsyncThunk(
    'coupon/deleteCoupon',
    async (
        { id, token }: { id: string; token: string },
        { rejectWithValue }
    ) => {
        console.log(`Deleting coupon with ID: ${id}`);
        try {
            const response = await axiosInstance.delete(`/admin/coupon/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Coupon deleted successfully:', response.data);
            return id; // Return the id to remove it from the state
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error(`Error deleting coupon with ID ${id}:`, axiosError);
            return rejectWithValue(
                axiosError.response?.data || 'Failed to delete coupon'
            );
        }
    }
);

// Validate coupon
export const validateCoupon = createAsyncThunk(
    'coupon/validateCoupon',
    async (
        { code, orderId, token }: { code: string; orderId: string; token: string },
        { rejectWithValue }
    ) => {
        console.log(`Validating coupon with code: ${code} for order: ${orderId}`);
        try {
            const response = await axiosInstance.post(
                '/admin/coupons/validate',
                { code, orderId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log('Coupon validated successfully:', response.data.data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error validating coupon:', axiosError);
            return rejectWithValue(
                axiosError.response?.data || 'Failed to validate coupon'
            );
        }
    }
);

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        clearCouponError: (state) => {
            state.error = null;
        },
        clearSelectedCoupon: (state) => {
            state.selectedCoupon = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create coupon
            .addCase(createCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCoupon.fulfilled, (state, action: PayloadAction<Coupon>) => {
                state.loading = false;
                state.data = state.data ? [...state.data, action.payload] : [action.payload];
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Get all coupons
            .addCase(getCoupons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCoupons.fulfilled, (state, action: PayloadAction<Coupon[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getCoupons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Get my coupons
            .addCase(getMyCoupons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyCoupons.fulfilled, (state, action: PayloadAction<Coupon[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getMyCoupons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Get coupon by ID
            .addCase(getCouponById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCouponById.fulfilled, (state, action: PayloadAction<Coupon>) => {
                state.loading = false;
                state.selectedCoupon = action.payload;
            })
            .addCase(getCouponById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update coupon
            .addCase(updateCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCoupon.fulfilled, (state, action: PayloadAction<Coupon>) => {
                state.loading = false;
                if (state.data) {
                    state.data = state.data.map((coupon) =>
                        coupon._id === action.payload._id ? action.payload : coupon
                    );
                }
                state.selectedCoupon = action.payload;
            })
            .addCase(updateCoupon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete coupon
            .addCase(deleteCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCoupon.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                if (state.data) {
                    state.data = state.data.filter((coupon) => coupon._id !== action.payload);
                }
                if (state.selectedCoupon?._id === action.payload) {
                    state.selectedCoupon = null;
                }
            })
            .addCase(deleteCoupon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Validate coupon
            .addCase(validateCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(validateCoupon.fulfilled, (state, action: PayloadAction<Coupon>) => {
                state.loading = false;
                state.selectedCoupon = action.payload;
            })
            .addCase(validateCoupon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCouponError, clearSelectedCoupon } = couponSlice.actions;
export default couponSlice.reducer;