import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';
import { AnalyticsInterface } from '@/types/interfaces';



export interface GoogleAnalyticsState {
    analytics: AnalyticsInterface;
    currentFile: AnalyticsInterface | null;
    loading: boolean;
    error: string | null;
}

const initialState: GoogleAnalyticsState = {
    analytics: {} as AnalyticsInterface,
    currentFile: null,
    loading: false,
    error: null,
};


// Fetch all terms
export const fetchGoogleAnalytics = createAsyncThunk(
    'term/fetchGoogleAnalytics',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/page-views/dashboard-stats');
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || 'Failed to fetch terms'
            );
        }
    }
);

const termSlice = createSlice({
    name: 'gAnalytics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch all terms
            .addCase(fetchGoogleAnalytics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoogleAnalytics.fulfilled, (state, action: PayloadAction<AnalyticsInterface>) => {
                state.loading = false;
                state.analytics = action.payload;
            })
            .addCase(fetchGoogleAnalytics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const { } = termSlice.actions;

export default termSlice.reducer;

export const selectAnalytics = (state: { gAnalytics: GoogleAnalyticsState }) => state.gAnalytics.analytics;