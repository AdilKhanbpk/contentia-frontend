import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";
import { AxiosError } from "axios";

export interface Step {
  title: string;
  description: string;
}

export interface HowItWorks {
  _id: string;
  sectionTitle: string;
  sectionDescription: string;
  steps: Step[];
  createdAt?: string;
  updatedAt?: string;
}

export interface HowItWorksState {
  sections: HowItWorks[];
  currentSection: HowItWorks | null;
  loading: boolean;
  error: string | null;
}

interface CreateHowItWorksPayload {
  data: Omit<HowItWorks, "_id" | "createdAt" | "updatedAt">;
  token: string;
}

interface UpdateHowItWorksPayload {
  sectionId: string;
  data: Partial<HowItWorks>;
  token: string;
}

interface DeleteHowItWorksPayload {
  sectionId: string;
  token: string;
}

const initialState: HowItWorksState = {
  sections: [],
  currentSection: null,
  loading: false,
  error: null,
};

// Thunks
export const createHowItWorks = createAsyncThunk(
  "howItWorks/createHowItWorks",
  async ({ data, token }: CreateHowItWorksPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axiosInstance.post("/admin/howItWorks", data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data || "Failed to create How It Works section";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchHowItWorks = createAsyncThunk(
  "howItWorks/fetchHowItWorks",
  async (token: string, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axiosInstance.get("/admin/howItWorks");
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data || "Failed to fetch How It Works sections";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchHowItWorksById = createAsyncThunk(
  "howItWorks/fetchHowItWorksById",
  async (sectionId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/howItWorks/${sectionId}`);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data || `Failed to fetch section with ID ${sectionId}`;
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateHowItWorks = createAsyncThunk(
  "howItWorks/updateHowItWorks",
  async ({ sectionId, data, token }: UpdateHowItWorksPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axiosInstance.patch(
        `/admin/howItWorks/${sectionId}`,
        data
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data || `Failed to update How It Works section with ID ${sectionId}`;
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteHowItWorks = createAsyncThunk(
  "howItWorks/deleteHowItWorks",
  async ({ sectionId, token }: DeleteHowItWorksPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axiosInstance.delete(`/admin/howItWorks/${sectionId}`);
      return sectionId;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data || `Failed to delete How It Works section with ID ${sectionId}`;
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const howItWorksSlice = createSlice({
  name: "howItWorks",
  initialState,
  reducers: {
    setCurrentSection: (state, action: PayloadAction<HowItWorks | null>) => {
      state.currentSection = action.payload;
    },
    addSectionToState: (state, action: PayloadAction<HowItWorks>) => {
      state.sections.push(action.payload);
    },
    updateSectionInState: (state, action: PayloadAction<HowItWorks>) => {
      const index = state.sections.findIndex(
        (section) => section._id === action.payload._id
      );
      if (index !== -1) {
        state.sections[index] = action.payload;
      } else {
        console.log('Section not found in state', {
          searchedId: action.payload._id,
          availableIds: state.sections.map(s => s._id)
        });
      }
    },
    removeSectionFromState: (state, action: PayloadAction<string>) => {
      const initialLength = state.sections.length;
      state.sections = state.sections.filter(
        (section) => section._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHowItWorks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHowItWorks.fulfilled, (state, action: PayloadAction<HowItWorks>) => {
        state.loading = false;
        state.sections.push(action.payload);
      })
      .addCase(createHowItWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchHowItWorks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHowItWorks.fulfilled, (state, action: PayloadAction<HowItWorks[]>) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchHowItWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchHowItWorksById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHowItWorksById.fulfilled, (state, action: PayloadAction<HowItWorks>) => {
        state.loading = false;
        state.currentSection = action.payload;
      })
      .addCase(fetchHowItWorksById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateHowItWorks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHowItWorks.fulfilled, (state, action: PayloadAction<HowItWorks>) => {
        state.loading = false;
        const index = state.sections.findIndex(
          (section) => section._id === action.payload._id
        );
        if (index !== -1) {
          state.sections[index] = action.payload;
        } else {
          console.log('Updated section not found in state', {
            updatedId: action.payload._id,
            availableIds: state.sections.map(s => s._id)
          });
        }
      })
      .addCase(updateHowItWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteHowItWorks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHowItWorks.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        const initialLength = state.sections.length;
        state.sections = state.sections.filter(
          (section) => section._id !== action.payload
        );
        if (state.sections.length === initialLength) {
          console.log('Deleted section not found in state', {
            deletedId: action.payload,
            availableIds: state.sections.map(s => s._id)
          });
        }
      })
      .addCase(deleteHowItWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentSection,
  addSectionToState,
  updateSectionInState,
  removeSectionFromState,
} = howItWorksSlice.actions;

export default howItWorksSlice.reducer;