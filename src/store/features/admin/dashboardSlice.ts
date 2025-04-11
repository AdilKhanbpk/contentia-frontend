import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";
import { AxiosError } from "axios";
import { RootState } from "@/store/store";
import { OrderInterface } from "@/types/interfaces";

interface DashboardState {
    totalCreators: CreatorAnalytics | null;
    totalCustomers: CustomerAnalytics | null;
    totalOrders: OrderAnalytics | null;
    recentOrders: OrderInterface | null;
    totalSales: SalesByMonth | null;
    loading: boolean;
    error: string | null;
}
export interface CreatorAnalytics {
    totalCreatorsCount: number;
    totalCreatorsByMonth: number[];
    currentMonthCount: number;
    previousMonthCount: number;
    percentageChange: string;
}

export interface CustomerAnalytics {
    totalCustomersCount: number;
    totalCustomersByMonth: number[];
    currentMonthCount: number;
    previousMonthCount: number;
    percentageChange: string;
}

export interface OrderAnalytics {
    totalOrdersCount: number;
    totalOrdersByMonth: number[];
    currentMonthCount: number;
    previousMonthCount: number;
    percentageChange: string;
    completedOrders: number;
    totalPriceOfCompletedOrders: number;
    pendingOrders: number;
    activeOrders: number;
    revisionOrders: number;
    canceledOrders: number;
}

export interface SalesByMonth {
    totalSalesByMonth: number[];
    currentMonthCount: number;
    previousMonthCount: number;
    percentageChange: string;
    totalSales: number;

}

const initialState: DashboardState = {
    totalCreators: null,
    totalCustomers: null,
    totalOrders: null,
    recentOrders: null,
    totalSales: null,
    loading: false,
    error: null,
};

// Fetch Total Creators
export const fetchTotalCreators = createAsyncThunk(
    "dashboard/fetchTotalCreators",
    async (token: string, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get("/admin/dashboard/total-creators");
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || "Failed to fetch total creators"
            );
        }
    }
);

// Fetch Total Customers
export const fetchTotalCustomers = createAsyncThunk(
    "dashboard/fetchTotalCustomers",
    async (token: string, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get("/admin/dashboard/total-customers");
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || "Failed to fetch total customers"
            );
        }
    }
);

// Fetch Total Orders
export const fetchTotalOrders = createAsyncThunk(
    "dashboard/fetchTotalOrders",
    async (token: string, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get("/admin/dashboard/total-orders");
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || "Failed to fetch total orders"
            );
        }
    }
);

// Fetch Recent Orders
export const fetchRecentOrders = createAsyncThunk(
    "dashboard/fetchRecentOrders",
    async (token: string, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get("/admin/dashboard/recent-orders");
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || "Failed to fetch recent orders"
            );
        }
    }
);

// Fetch Recent Orders
export const fetchTotalSalesByMonth = createAsyncThunk(
    "dashboard/fetchTotalSalesByMonth",
    async (token: string, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get("/admin/dashboard/total-sales-by-month");
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || "Failed to Fetch Total Sales By Month"
            );
        }
    }
);



const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Total Creators
            .addCase(fetchTotalCreators.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTotalCreators.fulfilled, (state, action: PayloadAction<CreatorAnalytics>) => {
                state.loading = false;
                state.totalCreators = action.payload;
            })
            .addCase(fetchTotalCreators.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Total Customers
            .addCase(fetchTotalCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTotalCustomers.fulfilled, (state, action: PayloadAction<CustomerAnalytics>) => {
                state.loading = false;
                state.totalCustomers = action.payload;
            })
            .addCase(fetchTotalCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Total Orders
            .addCase(fetchTotalOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTotalOrders.fulfilled, (state, action: PayloadAction<OrderAnalytics>) => {
                state.loading = false;
                state.totalOrders = action.payload;
            })
            .addCase(fetchTotalOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Recent Orders
            .addCase(fetchRecentOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecentOrders.fulfilled, (state, action: PayloadAction<OrderInterface>) => {
                state.loading = false;
                state.recentOrders = action.payload;
            })
            .addCase(fetchRecentOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch Recent Orders
            .addCase(fetchTotalSalesByMonth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTotalSalesByMonth.fulfilled, (state, action: PayloadAction<SalesByMonth>) => {
                state.loading = false;
                state.totalSales = action.payload;
            })
            .addCase(fetchTotalSalesByMonth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const selectTotalCreators = (state: RootState) => state.dashboard.totalCreators;
export const selectTotalCustomers = (state: RootState) => state.dashboard.totalCustomers;
export const selectTotalOrders = (state: RootState) => state.dashboard.totalOrders;
export const selectRecentOrders = (state: RootState) => state.dashboard.recentOrders;
export const selectTotalSales = (state: RootState) => state.dashboard.totalSales;
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardError = (state: RootState) => state.dashboard.error;

export default dashboardSlice.reducer;