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
            console.log("Creating help support...");
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.post("/admin/helpSupport", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Help support created successfully:", response.data.data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error("Error creating help support:", axiosError.response?.data || "Failed to create Help Support");
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
            console.log("Fetching help supports...");
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get("/admin/helpSupport");
            console.log("Fetched help supports:", response.data.data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error("Error fetching help supports:", axiosError.response?.data || "Failed to fetch Help Supports");
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
            console.log(`Fetching help support with ID: ${helpSupportId}`);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get(`/admin/helpSupport/${helpSupportId}`);
            console.log("Fetched help support by ID:", response.data.data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error(`Error fetching help support with ID ${helpSupportId}:`, axiosError.response?.data || "Failed to fetch Help Support");
            return rejectWithValue(
                axiosError.response?.data || "Failed to fetch Help Support"
            );
        }
    }
);

// Update a help support
export const updateHelpSupport = createAsyncThunk(
    "helpSupport/updateHelpSupport",
    async (
        { helpSupportId, data, token }: UpdateHelpSupportPayload,
        { rejectWithValue }
    ) => {
        try {
            console.log("Initiating update for help support...");
            console.log("Help Support ID:", helpSupportId);
            console.log("Data being sent:", data);
            console.log("Token provided:", token);

            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            console.log("Authorization header set.");

            const response = await axiosInstance.patch(
                `/admin/helpSupport/${helpSupportId}`,
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log("Response received from server:", response.data);
            console.log("Help support updated successfully:", response.data.data);

            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;

            console.error("Error updating help support:", axiosError.message);
            console.error(
                "Server response:",
                axiosError.response?.data || "No response from server"
            );

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
            console.log(`Updating help support icon with ID: ${helpSupportId}`);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.patch(`/admin/helpSupport/icon/${helpSupportId}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Help support icon updated successfully:", response.data.data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error(`Error updating help support icon with ID ${helpSupportId}:`, axiosError.response?.data || "Failed to update Help Support icon");
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
            console.log(`Deleting help support with ID: ${helpSupportId}`);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axiosInstance.delete(`/admin/helpSupport/${helpSupportId}`);
            console.log(`Help support with ID ${helpSupportId} deleted successfully`);
            return helpSupportId;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error(`Error deleting help support with ID ${helpSupportId}:`, axiosError.response?.data || `Failed to delete Help Support with ID ${helpSupportId}`);
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
            console.log("Setting current help support:", action.payload);
            state.currentHelpSupport = action.payload;
        },
        addHelpSupportToState: (state, action: PayloadAction<HelpSupport>) => {
            console.log("Adding help support to state:", action.payload);
            state.helpSupports.push(action.payload);
        },
        updateHelpSupportInState: (state, action: PayloadAction<HelpSupport>) => {
            console.log("Updating help support in state:", action.payload);
            const index = state.helpSupports.findIndex(helpSupport => helpSupport._id === action.payload._id);
            if (index !== -1) {
                state.helpSupports[index] = action.payload;
            }
        },
        removeHelpSupportFromState: (state, action: PayloadAction<string>) => {
            console.log("Removing help support from state with ID:", action.payload);
            state.helpSupports = state.helpSupports.filter(helpSupport => helpSupport._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createHelpSupport.pending, (state) => {
                console.log("Create help support: pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(createHelpSupport.fulfilled, (state, action: PayloadAction<HelpSupport>) => {
                console.log("Create help support: fulfilled");
                state.loading = false;
                state.helpSupports.push(action.payload);
            })
            .addCase(createHelpSupport.rejected, (state, action) => {
                console.error("Create help support: rejected", action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchHelpSupports.pending, (state) => {
                console.log("Fetch help supports: pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHelpSupports.fulfilled, (state, action: PayloadAction<HelpSupport[]>) => {
                console.log("Fetch help supports: fulfilled");
                state.loading = false;
                state.helpSupports = action.payload;
            })
            .addCase(fetchHelpSupports.rejected, (state, action) => {
                console.error("Fetch help supports: rejected", action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchHelpSupportById.pending, (state) => {
                console.log("Fetch help support by ID: pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHelpSupportById.fulfilled, (state, action: PayloadAction<HelpSupport>) => {
                console.log("Fetch help support by ID: fulfilled");
                state.loading = false;
                state.currentHelpSupport = action.payload;
            })
            .addCase(fetchHelpSupportById.rejected, (state, action) => {
                console.error("Fetch help support by ID: rejected", action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateHelpSupport.pending, (state) => {
                console.log("Update help support: pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(updateHelpSupport.fulfilled, (state, action: PayloadAction<HelpSupport>) => {
                console.log("Update help support: fulfilled");
                state.loading = false;
                const index = state.helpSupports.findIndex(helpSupport => helpSupport._id === action.payload._id);
                if (index !== -1) {
                    state.helpSupports[index] = action.payload;
                }
            })
            .addCase(updateHelpSupport.rejected, (state, action) => {
                console.error("Update help support: rejected", action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateHelpSupportIcon.pending, (state) => {
                console.log("Update help support icon: pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(updateHelpSupportIcon.fulfilled, (state, action: PayloadAction<HelpSupport>) => {
                console.log("Update help support icon: fulfilled");
                state.loading = false;
                const index = state.helpSupports.findIndex(helpSupport => helpSupport._id === action.payload._id);
                if (index !== -1) {
                    state.helpSupports[index] = action.payload;
                }
            })
            .addCase(updateHelpSupportIcon.rejected, (state, action) => {
                console.error("Update help support icon: rejected", action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteHelpSupport.pending, (state) => {
                console.log("Delete help support: pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteHelpSupport.fulfilled, (state, action: PayloadAction<string>) => {
                console.log("Delete help support: fulfilled");
                state.loading = false;
                state.helpSupports = state.helpSupports.filter(helpSupport => helpSupport._id !== action.payload);
            })
            .addCase(deleteHelpSupport.rejected, (state, action) => {
                console.error("Delete help support: rejected", action.payload);
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentHelpSupport, addHelpSupportToState, updateHelpSupportInState, removeHelpSupportFromState } = helpSupportSlice.actions;

export default helpSupportSlice.reducer;
