import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";
import { AxiosError } from "axios";

// Types
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

// Debug logger function
const logDebug = (action: string, data?: any, error?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔍 HowItWorks Debug - ${action}`);
    console.log('Timestamp:', new Date().toISOString());
    if (data) console.log('Data:', data);
    if (error) console.error('Error:', error);
    console.groupEnd();
  }
};

// Thunks
export const createHowItWorks = createAsyncThunk(
  "howItWorks/createHowItWorks",
  async ({ data, token }: CreateHowItWorksPayload, { rejectWithValue }) => {
    logDebug('Creating HowItWorks section', { data });
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axiosInstance.post("/admin/howItWorks", data);
      logDebug('Created HowItWorks section successfully', response.data.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data || "Failed to create How It Works section";
      logDebug('Create HowItWorks section failed', null, {
        error: axiosError,
        status: axiosError.response?.status,
        message: errorMessage
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchHowItWorks = createAsyncThunk(
  "howItWorks/fetchHowItWorks",
  async (token: string, { rejectWithValue }) => {
    logDebug('Fetching all HowItWorks sections');
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axiosInstance.get("/admin/howItWorks");
      logDebug('Fetched HowItWorks sections successfully', {
        count: response.data.data.length,
        sections: response.data.data
      });
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data || "Failed to fetch How It Works sections";
      logDebug('Fetch HowItWorks sections failed', null, {
        error: axiosError,
        status: axiosError.response?.status,
        message: errorMessage
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchHowItWorksById = createAsyncThunk(
  "howItWorks/fetchHowItWorksById",
  async (sectionId: string, { rejectWithValue }) => {
    logDebug('Fetching HowItWorks section by ID', { sectionId });
    try {
      const response = await axiosInstance.get(`/admin/howItWorks/${sectionId}`);
      logDebug('Fetched HowItWorks section successfully', response.data.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data || `Failed to fetch section with ID ${sectionId}`;
      logDebug('Fetch HowItWorks section failed', null, {
        error: axiosError,
        status: axiosError.response?.status,
        message: errorMessage,
        sectionId
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateHowItWorks = createAsyncThunk(
  "howItWorks/updateHowItWorks",
  async ({ sectionId, data, token }: UpdateHowItWorksPayload, { rejectWithValue }) => {
    logDebug('Updating HowItWorks section', { sectionId, data });
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axiosInstance.patch(
        `/admin/howItWorks/${sectionId}`,
        data
      );
      logDebug('Updated HowItWorks section successfully', response.data.data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data || `Failed to update How It Works section with ID ${sectionId}`;
      logDebug('Update HowItWorks section failed', null, {
        error: axiosError,
        status: axiosError.response?.status,
        message: errorMessage,
        sectionId,
        attemptedData: data
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteHowItWorks = createAsyncThunk(
  "howItWorks/deleteHowItWorks",
  async ({ sectionId, token }: DeleteHowItWorksPayload, { rejectWithValue }) => {
    logDebug('Deleting HowItWorks section', { sectionId });
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axiosInstance.delete(`/admin/howItWorks/${sectionId}`);
      logDebug('Deleted HowItWorks section successfully', { sectionId });
      return sectionId;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data || `Failed to delete How It Works section with ID ${sectionId}`;
      logDebug('Delete HowItWorks section failed', null, {
        error: axiosError,
        status: axiosError.response?.status,
        message: errorMessage,
        sectionId
      });
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
      logDebug('Setting current section', action.payload);
      state.currentSection = action.payload;
    },
    addSectionToState: (state, action: PayloadAction<HowItWorks>) => {
      logDebug('Adding section to state', action.payload);
      state.sections.push(action.payload);
    },
    updateSectionInState: (state, action: PayloadAction<HowItWorks>) => {
      logDebug('Updating section in state', action.payload);
      const index = state.sections.findIndex(
        (section) => section._id === action.payload._id
      );
      if (index !== -1) {
        state.sections[index] = action.payload;
      } else {
        logDebug('Section not found in state', {
          searchedId: action.payload._id,
          availableIds: state.sections.map(s => s._id)
        });
      }
    },
    removeSectionFromState: (state, action: PayloadAction<string>) => {
      logDebug('Removing section from state', { sectionId: action.payload });
      const initialLength = state.sections.length;
      state.sections = state.sections.filter(
        (section) => section._id !== action.payload
      );
      if (state.sections.length === initialLength) {
        logDebug('No section was removed', {
          searchedId: action.payload,
          availableIds: state.sections.map(s => s._id)
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHowItWorks.pending, (state) => {
        logDebug('Create HowItWorks pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(createHowItWorks.fulfilled, (state, action: PayloadAction<HowItWorks>) => {
        logDebug('Create HowItWorks fulfilled', action.payload);
        state.loading = false;
        state.sections.push(action.payload);
      })
      .addCase(createHowItWorks.rejected, (state, action) => {
        logDebug('Create HowItWorks rejected', null, action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchHowItWorks.pending, (state) => {
        logDebug('Fetch HowItWorks pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHowItWorks.fulfilled, (state, action: PayloadAction<HowItWorks[]>) => {
        logDebug('Fetch HowItWorks fulfilled', {
          count: action.payload.length,
          sections: action.payload
        });
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchHowItWorks.rejected, (state, action) => {
        logDebug('Fetch HowItWorks rejected', null, action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchHowItWorksById.pending, (state) => {
        logDebug('Fetch HowItWorks by ID pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHowItWorksById.fulfilled, (state, action: PayloadAction<HowItWorks>) => {
        logDebug('Fetch HowItWorks by ID fulfilled', action.payload);
        state.loading = false;
        state.currentSection = action.payload;
      })
      .addCase(fetchHowItWorksById.rejected, (state, action) => {
        logDebug('Fetch HowItWorks by ID rejected', null, action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateHowItWorks.pending, (state) => {
        logDebug('Update HowItWorks pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHowItWorks.fulfilled, (state, action: PayloadAction<HowItWorks>) => {
        logDebug('Update HowItWorks fulfilled', action.payload);
        state.loading = false;
        const index = state.sections.findIndex(
          (section) => section._id === action.payload._id
        );
        if (index !== -1) {
          state.sections[index] = action.payload;
        } else {
          logDebug('Updated section not found in state', {
            updatedId: action.payload._id,
            availableIds: state.sections.map(s => s._id)
          });
        }
      })
      .addCase(updateHowItWorks.rejected, (state, action) => {
        logDebug('Update HowItWorks rejected', null, action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteHowItWorks.pending, (state) => {
        logDebug('Delete HowItWorks pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHowItWorks.fulfilled, (state, action: PayloadAction<string>) => {
        logDebug('Delete HowItWorks fulfilled', { deletedId: action.payload });
        state.loading = false;
        const initialLength = state.sections.length;
        state.sections = state.sections.filter(
          (section) => section._id !== action.payload
        );
        if (state.sections.length === initialLength) {
          logDebug('Deleted section not found in state', {
            deletedId: action.payload,
            availableIds: state.sections.map(s => s._id)
          });
        }
      })
      .addCase(deleteHowItWorks.rejected, (state, action) => {
        logDebug('Delete HowItWorks rejected', null, action.payload);
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