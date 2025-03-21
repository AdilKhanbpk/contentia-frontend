import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";
import { AxiosError } from "axios";

export interface PaymentInterface {
    _id: string;
    orderId: string;
    invoiceImage?: string;
    paymentAmount: number;
    paymentStatus?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PaymentState {
    payments: PaymentInterface[];
    currentPayment: PaymentInterface | null;
    loading: boolean;
    error: string | null;
}

interface CreatePaymentPayload {
    orderId: string;
    file?: File;
    token: string;
}

interface UpdatePaymentPayload {
    paymentId: string;
    data: Partial<PaymentInterface>;
    token: string;
}

interface DeletePaymentPayload {
    paymentId: string;
    token: string;
}
interface RefundPaymentPayload {
    paymentId: string;
    token: string;
}

const initialState: PaymentState = {
    payments: [],
    currentPayment: null,
    loading: false,
    error: null,
};

export const createPayment = createAsyncThunk(
    "payment/createPayment",
    async ({ orderId, file, token }: CreatePaymentPayload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("orderId", orderId);
            if (file) formData.append("file", file);

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.post("/admin/incomingPayment", formData);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data || "Failed to create payment");
        }
    }
);

export const fetchPayments = createAsyncThunk(
    "payment/fetchPayments",
    async (token: string, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get("/admin/incomingPayment");
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data || "Failed to fetch payments");
        }
    }
);

export const updatePayment = createAsyncThunk(
    "payment/updatePayment",
    async ({ paymentId, data, token }: UpdatePaymentPayload, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.patch(`/admin/incomingPayment/${paymentId}`, data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data || `Failed to update payment with ID ${paymentId}`);
        }
    }
);

export const deletePayment = createAsyncThunk(
    "payment/deletePayment",
    async ({ paymentId, token }: DeletePaymentPayload, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axiosInstance.delete(`/admin/incomingPayment/${paymentId}`);
            return paymentId;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data || `Failed to delete payment with ID ${paymentId}`);
        }
    }
);

export const refundPayment = createAsyncThunk(
    "payment/refundPayment",
    async ({ paymentId, token }: RefundPaymentPayload, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axiosInstance.patch(`/admin/incomingPayment/refund-payment/${paymentId}`);
            return paymentId;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data || `Failed to refund payment with ID ${paymentId}`);
        }
    }
);

const paymentSlice = createSlice({
    name: "incomingPayment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPayment.fulfilled, (state, action: PayloadAction<PaymentInterface>) => {
                state.loading = false;
                state.payments.push(action.payload);
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayments.fulfilled, (state, action: PayloadAction<PaymentInterface[]>) => {
                state.loading = false;
                state.payments = action.payload;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updatePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePayment.fulfilled, (state, action: PayloadAction<PaymentInterface>) => {
                state.loading = false;
                state.payments = state.payments.map((payment) =>
                    payment._id === action.payload._id ? action.payload : payment
                );
            })
            .addCase(updatePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deletePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePayment.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.payments = state.payments.filter((payment) => payment._id !== action.payload);
            })
            .addCase(deletePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(refundPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refundPayment.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.payments = state.payments.map((payment) =>
                    payment._id === action.payload ? { ...payment, refundStatus: "refunded" } : payment
                );
            })
            .addCase(refundPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export default paymentSlice.reducer;