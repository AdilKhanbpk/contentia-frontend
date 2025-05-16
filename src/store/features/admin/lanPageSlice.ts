import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance, patchForm } from '@/store/axiosInstance';
import { AxiosError } from 'axios';
import { mockLandingPageData } from '@/mock/landingPageData';

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
    { data }: { data: FormData; },
    { rejectWithValue }
  ) => {
    try {
      console.log('Creating new landing page');

      // Validate required fields
      const carouselHeroTitle = data.get('carouselHeroTitle');
      const staticHeroTitle = data.get('staticHeroTitle');
      const heroSubTitle = data.get('heroSubTitle');

      if (!carouselHeroTitle || !staticHeroTitle || !heroSubTitle) {
        return rejectWithValue({
          message: 'Please fill in all required fields (Carousel Hero Title, Static Hero Title, and Hero Subtitle)'
        });
      }

      const response = await axiosInstance.post('/admin/landingPage', data);
      console.log('Landing page created successfully:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error creating landing page:', error);

      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data || { message: 'Failed to create landing page' };

      // Log detailed error information
      if (process.env.NODE_ENV !== 'production') {
        console.error('Create landing page error details:', {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
          message: axiosError.message
        });
      }

      return rejectWithValue(errorData);
    }
  }
);

// Fetch the landing page
export const fetchLandingPage = createAsyncThunk(
  'landingPage/fetchLandingPage',
  async (_) => {
    try {
      const response = await axiosInstance.get('/admin/landingPage');
      return response.data.data;
    } catch (error) {
      console.warn('API call failed, attempting to use fallback data for landing page');

      // In production, try to use the mock data but also log the error
      if (process.env.NODE_ENV === 'production') {
        console.error('Production landing page fetch error:', error);

        // Return mock data in production too, to prevent app from breaking
        return mockLandingPageData;
      }

      // In development, just use the mock data
      return mockLandingPageData;
    }
  }
);

// Update the landing page
export const updateLandingPage = createAsyncThunk(
  'landingPage/updateLandingPage',
  async (
    { id, data }: { id: string; data: FormData; },
    { rejectWithValue }
  ) => {
    try {
      // Validate ID
      if (!id || id === 'undefined' || id === 'null') {
        console.error('Invalid landing page ID:', id);
        return rejectWithValue({ message: 'Invalid landing page ID. Please create a new landing page first.' });
      }

      console.log('Updating landing page with ID:', id);

      const response = await patchForm(
        `/admin/landingPage/${id}`,
        data
      );

      return response.data.data;
    } catch (error) {
      console.error('Error updating landing page:', error);

      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data || { message: 'Failed to update landing page' };

      // Log detailed error information
      if (process.env.NODE_ENV !== 'production') {
        console.error('Update landing page error details:', {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
          message: axiosError.message
        });
      }

      return rejectWithValue(errorData);
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
