// src/store/profileSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';  // Import your custom axios instance
import { AxiosError } from 'axios';

// Define a type for the profile state
type ProfileState = {
    data: any;   // You can define this type more strictly depending on the shape of your profile data
    id: string | null;  // Store the user ID
    loading: boolean;
    error: string | null;
};

// Define the initial state
const initialState: ProfileState = {
    data: null,
    id: null,  // Initialize id as null
    loading: false,
    error: null,
};

// Async thunk for fetching profile data
export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (token: string) => {
        try {
            const response = await axiosInstance.get('/users/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return {
                id: response.data.data._id,  // Extract the ID from the response
                data: response.data.data,     // Return the entire data object
            };
        } catch (error) {
            throw Error('Failed to fetch profile data');
        }
    }
);

// Async thunk for updating profile data with added debugging
export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (
      { data, token, id }: { data: any; token: string; id: string },
      { rejectWithValue }
    ) => {
      console.log('updateProfile action called with parameters:', { data, token, id });
      
      try {
  
        // Make the API request
        const response = await axiosInstance.patch(`/users/update-me`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log('Profile update response:', response);
  
        // Verify the response format
        if (!response.data) {
          console.error('Unexpected response format:', response);
          return rejectWithValue('Unexpected response format');
        }
  
        console.log('Profile update successful:', response.data);
        return response.data; // Adjust this if your response structure varies
  
      } catch (error) {
        let errorMessage = 'Failed to update profile';
  
        // Check if error is an AxiosError to get additional info
        if ((error as AxiosError).isAxiosError && (error as AxiosError).response) {
          errorMessage = `Update failed: ${(error as AxiosError).response?.data || 'Unknown error'}`;
          console.error('Error response from API:', (error as AxiosError).response);
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
  
        console.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  );

// Create the slice
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<{ id: string; data: any }>) => {
                state.loading = false;
                state.data = action.payload.data;
                state.id = action.payload.id;  // Store the id in the state
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch profile data';
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.data = action.payload; // Optionally update profile data after update
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update profile';
            });
    },
});

export default profileSlice.reducer;
