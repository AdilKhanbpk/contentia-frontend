import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';
import { FilesInterface } from '@/types/interfaces';



export interface FileState {
    files: FilesInterface[];
    currentOrderFiles: FilesInterface[];
    loading: boolean;
    error: string | null;
}

const initialState: FileState = {
    files: [],
    currentOrderFiles: [],
    loading: false,
    error: null,
};


// Fetch all terms
export const fetchCreatorFiles = createAsyncThunk(
    'file/fetchAllCreatorFiles',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/files');
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || 'Failed to fetch terms'
            );
        }
    }
);

export const fetchSingleOrderFiles = createAsyncThunk(
    'file/fetchSingleOrderFiles',
    async ({ orderId }: { orderId: string; }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/admin/files/single-order-files/${orderId}`);
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
    name: 'files',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch all terms
            .addCase(fetchCreatorFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCreatorFiles.fulfilled, (state, action: PayloadAction<FilesInterface[]>) => {
                state.loading = false;
                state.files = action.payload;
            })
            .addCase(fetchCreatorFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchSingleOrderFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleOrderFiles.fulfilled, (state, action: PayloadAction<FilesInterface[]>) => {
                state.loading = false;
                state.currentOrderFiles = action.payload;
            })
            .addCase(fetchSingleOrderFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

    },
});

export const { } = termSlice.actions;
export default termSlice.reducer;

export const selectFiles = (state: { files: FileState }) => state.files.files;
export const selectCurrentOrderFiles = (state: { files: FileState }) => state.files.currentOrderFiles;
