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
    imageFile?: File;
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
    async ({ aboutId, imageFile }: UpdateAboutImagePayload, { rejectWithValue, dispatch }) => {
        try {
            // Validate inputs
            if (!aboutId) {
                return rejectWithValue({ message: "About ID is required" });
            }

            if (!imageFile) {
                return rejectWithValue({ message: "Image file is required" });
            }

            const formData = new FormData();
            formData.append('aboutImage', imageFile);

            console.log("Uploading image for about ID:", aboutId);

            const response = await axiosInstance.patch(
                `/admin/about/${aboutId}/change-image`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            console.log("Image upload response:", response.data);

            // Refresh the about data after successful image upload
            dispatch(fetchAbout());

            return response.data.data;
        } catch (error) {
            console.error("Image upload error:", error);
            const axiosError = error as AxiosError;
            let errorMessage = `Failed to update About Image for ID ${aboutId}`;

            if (axiosError.response?.data) {
                const responseData = axiosError.response.data as any;
                errorMessage = responseData.message || errorMessage;
            }

            return rejectWithValue({ message: errorMessage });
        }
    }
);

export const createAbout = createAsyncThunk(
    "about/createAbout",
    async ({ data, imageFile }: CreateAboutPayload, { rejectWithValue }) => {
        try {
            if (!imageFile) {
                return rejectWithValue({ message: "Image file is required to create an About section" });
            }

            // Create FormData and append all fields
            const formData = new FormData();

            // Append all data fields
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value as string);
            });

            // Append the image file
            formData.append('aboutImage', imageFile);

            console.log("Creating about section with image");

            const response = await axiosInstance.post("/admin/about", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data.data;
        } catch (error) {
            console.error("Create about error:", error);
            const axiosError = error as AxiosError;
            let errorMessage = "Failed to create About section";

            if (axiosError.response?.data) {
                const responseData = axiosError.response.data as any;
                errorMessage = responseData.message || errorMessage;
            }

            return rejectWithValue({ message: errorMessage });
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
            // Create About
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

            // Fetch About
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
            })

            // Update About
            .addCase(updateAbout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAbout.fulfilled, (state, action: PayloadAction<AboutData>) => {
                state.loading = false;
                state.sections = action.payload;
            })
            .addCase(updateAbout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update About Image
            .addCase(updateAboutImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAboutImage.fulfilled, (state, action: PayloadAction<AboutData>) => {
                state.loading = false;
                if (action.payload) {
                    state.sections = {
                        ...state.sections,
                        aboutImage: action.payload.aboutImage
                    };
                }
            })
            .addCase(updateAboutImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?
                    (typeof action.payload === 'string' ? action.payload : JSON.stringify(action.payload))
                    : 'Failed to update image';
            });
    },
});

export const { setCurrentSection, addSectionToState, updateSectionInState, removeSectionFromState } = aboutSlice.actions;
export default aboutSlice.reducer;
