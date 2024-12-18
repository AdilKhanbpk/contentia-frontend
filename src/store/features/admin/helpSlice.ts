import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";
import { AxiosError } from "axios";

export interface HelpSupport {
    _id: string;
    title: string;
    category: string;
    content: string;
    icon: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface HelpSupportState {
    helpSupports: HelpSupport[];
    currentHelpSupport: HelpSupport | null;
    loading: boolean;
    error: string | null;
}

interface CreateHelpSupportPayload {
    data: FormData;
    token: string;
}

interface UpdateHelpSupportPayload {
    helpSupportId: string;
    data: FormData;
    token: string;
}

interface DeleteHelpSupportPayload {
    helpSupportId: string;
    token: string;
}

const initialState: HelpSupportState = {
    helpSupports: [],
    currentHelpSupport: null,
    loading: false,
    error: null,
};

// Create a new help support
export const createHelpSupport = createAsyncThunk(
    "helpSupport/createHelpSupport",
    async ({ data, token }: CreateHelpSupportPayload, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.post("/admin/helpSupport", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || "Failed to create Help Support"
            );
        }
    }
);

// Fetch all help supports
export const fetchHelpSupports = createAsyncThunk(
    "helpSupport/fetchHelpSupports",
    async (token: string, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get("/admin/helpSupport");
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || "Failed to fetch Help Supports"
            );
        }
    }
);

// Fetch a help support by ID
export const fetchHelpSupportById = createAsyncThunk(
    "helpSupport/fetchHelpSupportById",
    async ({ helpSupportId, token }: { helpSupportId: string; token: string }, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get(`/admin/helpSupport/${helpSupportId}`);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || "Failed to fetch Help Support"
            );
        }
    }
);

export const updateHelpSupport = createAsyncThunk(
    "helpSupport/updateHelpSupport",
    async (
        { helpSupportId, data, token }: UpdateHelpSupportPayload,
        { rejectWithValue }
    ) => {
        try {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axiosInstance.patch(
                `/admin/helpSupport/${helpSupportId}`,
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || "Failed to update Help Support"
            );
        }
    }
);

// Update help support icon
export const updateHelpSupportIcon = createAsyncThunk(
    "helpSupport/updateHelpSupportIcon",
    async ({ helpSupportId, data, token }: UpdateHelpSupportPayload, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.patch(`/admin/helpSupport/icon/${helpSupportId}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || `Failed to update Help Support icon with ID ${helpSupportId}`
            );
        }
    }
);

// Delete a help support
export const deleteHelpSupport = createAsyncThunk(
    "helpSupport/deleteHelpSupport",
    async ({ helpSupportId, token }: DeleteHelpSupportPayload, { rejectWithValue }) => {
        try {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axiosInstance.delete(`/admin/helpSupport/${helpSupportId}`);
            return helpSupportId;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || `Failed to delete Help Support with ID ${helpSupportId}`
            );
        }
    }
);

const helpSupportSlice = createSlice({
    name: "helpSupport",
    initialState,
    reducers: {
        setCurrentHelpSupport: (state, action: PayloadAction<HelpSupport | null>) => {
            state.currentHelpSupport = action.payload;
        },
        addHelpSupportToState: (state, action: PayloadAction<HelpSupport>) => {
            state.helpSupports.push(action.payload);
        },
        updateHelpSupportInState: (state, action: PayloadAction<HelpSupport>) => {
            const index = state.helpSupports.findIndex(helpSupport => helpSupport._id === action.payload._id);
            if (index !== -1) {
                state.helpSupports[index] = action.payload;
            }
        },
        removeHelpSupportFromState: (state, action: PayloadAction<string>) => {
            state.helpSupports = state.helpSupports.filter(helpSupport => helpSupport._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createHelpSupport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createHelpSupport.fulfilled, (state, action: PayloadAction<HelpSupport>) => {
                state.loading = false;
                state.helpSupports.push(action.payload);
            })
            .addCase(createHelpSupport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchHelpSupports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHelpSupports.fulfilled, (state, action: PayloadAction<HelpSupport[]>) => {
                state.loading = false;
                state.helpSupports = action.payload;
            })
            .addCase(fetchHelpSupports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchHelpSupportById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHelpSupportById.fulfilled, (state, action: PayloadAction<HelpSupport>) => {
                state.loading = false;
                state.currentHelpSupport = action.payload;
            })
            .addCase(fetchHelpSupportById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateHelpSupport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateHelpSupport.fulfilled, (state, action: PayloadAction<HelpSupport>) => {
                state.loading = false;
                const index = state.helpSupports.findIndex(helpSupport => helpSupport._id === action.payload._id);
                if (index !== -1) {
                    state.helpSupports[index] = action.payload;
                }
            })
            .addCase(updateHelpSupport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateHelpSupportIcon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateHelpSupportIcon.fulfilled, (state, action: PayloadAction<HelpSupport>) => {
                state.loading = false;
                const index = state.helpSupports.findIndex(helpSupport => helpSupport._id === action.payload._id);
                if (index !== -1) {
                    state.helpSupports[index] = action.payload;
                }
            })
            .addCase(updateHelpSupportIcon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteHelpSupport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteHelpSupport.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.helpSupports = state.helpSupports.filter(helpSupport => helpSupport._id !== action.payload);
            })
            .addCase(deleteHelpSupport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentHelpSupport, addHelpSupportToState, updateHelpSupportInState, removeHelpSupportFromState } = helpSupportSlice.actions;

export default helpSupportSlice.reducer;
