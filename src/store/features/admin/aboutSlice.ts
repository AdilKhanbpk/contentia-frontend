import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";
import { AxiosError } from "axios";

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
    sections: AboutData;
    currentSection: AboutData | null;
    loading: boolean;
    error: string | null;
}

interface CreateAboutPayload {
    data: Omit<AboutData, "_id" | "createdAt" | "updatedAt">;

}

interface UpdateAboutPayload {
    aboutId: string;
    data: Partial<AboutData>;

}

interface DeleteAboutPayload {
    aboutId: string;

}

interface UpdateAboutImagePayload {
    aboutId: string;
    imageFile: File;

}

const initialState: AboutState = {
    sections: {} as AboutData,
    currentSection: null,
    loading: false,
    error: null,
};

// Thunks
export const updateAboutImage = createAsyncThunk(
    "about/updateAboutImage",
    async ({ aboutId, imageFile }: UpdateAboutImagePayload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('aboutImage', imageFile);
            const response = await axiosInstance.patch(
                `/admin/about/${aboutId}/change-image`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || `Failed to update About Image for ID ${aboutId}`;
            return rejectWithValue(errorMessage);
        }
    }
);

export const createAbout = createAsyncThunk(
    "about/createAbout",
    async ({ data }: CreateAboutPayload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/admin/about", data);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || "Failed to create About section";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAbout = createAsyncThunk(
    "about/fetchAbout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/admin/about");
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || "Failed to fetch About sections";
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateAbout = createAsyncThunk(
    "about/updateAbout",
    async ({ aboutId, data }: UpdateAboutPayload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/admin/about/${aboutId}`,
                data
            );
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || `Failed to update About section with ID ${aboutId}`;
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteAbout = createAsyncThunk(
    "about/deleteAbout",
    async ({ aboutId }: DeleteAboutPayload, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/admin/about/${aboutId}`);
            return aboutId;
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data || `Failed to delete About section with ID ${aboutId}`;
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
            state.currentSection = action.payload;
        },
        addSectionToState: (state, action: PayloadAction<AboutData>) => {
            state.sections = action.payload;
        },
        updateSectionInState: (state, action: PayloadAction<AboutData>) => {
            state.sections = action.payload;

        },
        removeSectionFromState: (state) => {
            state.sections = {} as AboutData;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAbout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAbout.fulfilled, (state, action: PayloadAction<AboutData>) => {
                state.loading = false;
                state.sections = action.payload;
            })
            .addCase(createAbout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAbout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAbout.fulfilled, (state, action: PayloadAction<AboutData>) => {
                state.loading = false;
                state.sections = action.payload;
            })
            .addCase(fetchAbout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentSection, addSectionToState, updateSectionInState, removeSectionFromState } = aboutSlice.actions;
export default aboutSlice.reducer;
