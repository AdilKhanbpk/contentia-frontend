import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

type Video = string;

export interface LandingPage {
    _id: string;
    carouselHeroTitle: string;
    staticHeroTitle: string;
    heroSubTitle: string;
    videos: Video[];
  }

export interface LandingPageState {
  data: LandingPage | null;
  loading: boolean;
  error: string | null;
}

const initialState: LandingPageState = {
  data: null,
  loading: false,
  error: null,
};

// Create a new landing page
export const createLandingPage = createAsyncThunk(
  'landingPage/createLandingPage',
  async (
    { data, token }: { data: FormData; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/admin/landingPage', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data; // Assuming API response includes `data` field
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to create landing page'
      );
    }
  }
);

// Fetch the landing page
export const fetchLandingPage = createAsyncThunk(
  'landingPage/fetchLandingPage',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/landingPage', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data; // Assuming API response includes `data` field
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to fetch landing page'
      );
    }
  }
);

// Update the landing page
export const updateLandingPage = createAsyncThunk(
    'landingPage/updateLandingPage',
    async (
      { id, data, token }: { id: string; data: FormData; token: string },
      { rejectWithValue }
    ) => {
      console.log("[Debug] Sending request to update landing page");
      console.log("[Debug] ID:", id);
      console.log("[Debug] Payload (FormData):", data);
      console.log("[Debug] Token:", token);
  
      try {
        // Making the PATCH request
        const response = await axiosInstance.patch(
          `/admin/landingPage/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        // Log successful response
        console.log("[Debug] Response received from update API:", response.data);
  
        // Return the response data for further use in reducers
        return response.data.data;
      } catch (error) {
        // Log error response
        const axiosError = error as AxiosError;
        console.error("[Error] Failed to update landing page:", axiosError.response?.data || error);
  
        // Return the error message
        return rejectWithValue(
          axiosError.response?.data || 'Failed to update landing page'
        );
      }
    }
  );
  
const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create landing page
      .addCase(createLandingPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createLandingPage.fulfilled,
        (state, action: PayloadAction<LandingPage>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(createLandingPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch landing page
      .addCase(fetchLandingPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchLandingPage.fulfilled,
        (state, action: PayloadAction<LandingPage>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchLandingPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update landing page
      .addCase(updateLandingPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateLandingPage.fulfilled,
        (state, action: PayloadAction<LandingPage>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(updateLandingPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default landingPageSlice.reducer;
