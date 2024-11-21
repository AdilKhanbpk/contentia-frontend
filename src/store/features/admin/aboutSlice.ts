import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";
import { AxiosError } from "axios";

// Types (keep existing types)
export interface AboutData {
    title: string;
    content: string;
    contactTitle: string;
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    buttonUrl: string;
    aboutImage?: string;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
}

export interface AboutState {
    sections: AboutData; // sections is now an object, not an array
    currentSection: AboutData | null;
    loading: boolean;
    error: string | null;
}

interface CreateAboutPayload {
    data: Omit<AboutData, "_id" | "createdAt" | "updatedAt">;
    token: string;
}

interface UpdateAboutPayload {
    aboutId: string;
    data: Partial<AboutData>;
    token: string;
}

interface DeleteAboutPayload {
    aboutId: string;
    token: string;
}

interface UpdateAboutImagePayload {
    aboutId: string;
    imageFile: File;
    token: string;
}

const initialState: AboutState = {
    sections: {} as AboutData, // Initialize sections as an empty object
    currentSection: null,
    loading: false,
    error: null,
};

// Thunks
export const updateAboutImage = createAsyncThunk(
    "about/updateAboutImage",
    async ({ aboutId, imageFile, token }: UpdateAboutImagePayload, { rejectWithValue }) => {
        console.log('Updating About Image', { aboutId });
        try {
            const formData = new FormData();
            formData.append('aboutImage', imageFile);

            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axiosInstance.patch(
                `/admin/about/${aboutId}/change-image`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            console.log('Updated About Image successfully', response.data.data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || `Failed to update About Image for ID ${aboutId}`;
            console.error('Update About Image failed', {
                error: axiosError,
                status: axiosError.response?.status,
                message: errorMessage,
                aboutId
            });
            return rejectWithValue(errorMessage);
        }
    }
);

export const createAbout = createAsyncThunk(
    "about/createAbout",
    async ({ data, token }: CreateAboutPayload, { rejectWithValue }) => {
        console.log('Creating About section', { data });
        try {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axiosInstance.post("/admin/about", data);
            console.log('Created About section successfully', response.data.data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || "Failed to create About section";
            console.error('Create About section failed', {
                error: axiosError,
                status: axiosError.response?.status,
                message: errorMessage
            });
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAbout = createAsyncThunk(
    "about/fetchAbout",
    async (token: string, { rejectWithValue }) => {
        console.log('Fetching all About sections');
        try {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axiosInstance.get("/admin/about");
            console.log('Fetched About sections successfully', response.data.data); // Directly log the data
            return response.data.data; // Return the data directly
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || "Failed to fetch About sections";
            console.error('Fetch About sections failed', {
                error: axiosError,
                status: axiosError.response?.status,
                message: errorMessage
            });
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateAbout = createAsyncThunk(
    "about/updateAbout",
    async ({ aboutId, data, token }: UpdateAboutPayload, { rejectWithValue }) => {
        console.log('Updating About section', { aboutId, data });
        try {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axiosInstance.patch(
                `/admin/about/${aboutId}`,
                data
            );
            console.log('Updated About section successfully', response.data.data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || `Failed to update About section with ID ${aboutId}`;
            console.error('Update About section failed', {
                error: axiosError,
                status: axiosError.response?.status,
                message: errorMessage,
                aboutId,
                attemptedData: data
            });
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteAbout = createAsyncThunk(
    "about/deleteAbout",
    async ({ aboutId, token }: DeleteAboutPayload, { rejectWithValue }) => {
        console.log('Deleting About section', { aboutId });
        try {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await axiosInstance.delete(`/admin/about/${aboutId}`);
            console.log('Deleted About section successfully', { aboutId });
            return aboutId;
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || `Failed to delete About section with ID ${aboutId}`;
            console.error('Delete About section failed', {
                error: axiosError,
                status: axiosError.response?.status,
                message: errorMessage,
                aboutId
            });
            return rejectWithValue(errorMessage);
        }
    }
);

// Slice
const aboutSlice = createSlice({
    name: "about",
    initialState,
    reducers: {
        setCurrentSection: (state, action: PayloadAction<AboutData | null>) => {
            console.log('Setting current section', action.payload);
            state.currentSection = action.payload;
        },
        addSectionToState: (state, action: PayloadAction<AboutData>) => {
            console.log('Adding section to state', action.payload);
            state.sections = action.payload; // Directly assign new AboutData to sections
        },
        updateSectionInState: (state, action: PayloadAction<AboutData>) => {
            console.log('Updating section in state', action.payload);
            if (state.sections._id === action.payload._id) {
                state.sections = action.payload; // Update the current section
            } else {
                console.log('Section not found in state', {
                    searchedId: action.payload._id,
                    availableId: state.sections._id
                });
            }
        },
        removeSectionFromState: (state) => {
            console.log('Removing section from state');
            state.sections = {} as AboutData; // Reset sections to empty object
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAbout.pending, (state) => {
                console.log('Create About pending');
                state.loading = true;
                state.error = null;
            })
            .addCase(createAbout.fulfilled, (state, action: PayloadAction<AboutData>) => {
                console.log('Create About fulfilled', action.payload);
                state.loading = false;
                state.sections = action.payload; // Update sections directly with new data
            })
            .addCase(createAbout.rejected, (state, action) => {
                console.log('Create About rejected', null, action.payload);
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAbout.pending, (state) => {
                console.log('Fetch About pending');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAbout.fulfilled, (state, action: PayloadAction<AboutData>) => {
                console.log('Fetch About fulfilled', action.payload);
                state.loading = false;
                state.sections = action.payload; // Assuming payload is a single AboutData object
            })
            .addCase(fetchAbout.rejected, (state, action) => {
                console.log('Fetch About rejected', null, action.payload);
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentSection, addSectionToState, updateSectionInState, removeSectionFromState } = aboutSlice.actions;
export default aboutSlice.reducer;
