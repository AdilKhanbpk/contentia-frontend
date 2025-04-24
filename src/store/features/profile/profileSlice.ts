import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';
import { RootState } from '@/store/store';

type ProfileState = {
  data: any;
  user: any;
  loading: boolean;
  error: string | null;
};

const initialState: ProfileState = {
  data: null,
  user: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/users/me');
      return {
        data: response.data.data,
      };
    } catch (error) {
      throw Error('Failed to fetch profile data');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (
    { data }: { data: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/users/update-me`, data);
      return response.data;
    } catch (error) {
      let errorMessage = 'Failed to update profile';
      if ((error as AxiosError).isAxiosError && (error as AxiosError).response) {
        errorMessage = `Update failed: ${(error as AxiosError).response?.data || 'Unknown error'}`;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const changePassword = createAsyncThunk(
  'profile/changePassword',
  async (
    { currentPassword, newPassword, confirmNewPassword }: { currentPassword: string; newPassword: string; confirmNewPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        '/users/change-password',
        { currentPassword, newPassword, confirmNewPassword },
      );
      return response.data;
    } catch (error) {
      let errorMessage = 'Failed to change password';
      if ((error as AxiosError).isAxiosError && (error as AxiosError).response) {
        errorMessage = `Password change failed: ${(error as AxiosError).response?.data || 'Unknown error'}`;
      } else {
        console.log('Non-Axios Error:', error);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const changeProfilePicture = createAsyncThunk(
  'profile/changeProfilePicture',
  async (
    { file }: { file: File; },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append('profilePic', file);

      const response = await axiosInstance.patch('/users/change-profilePic', formData);
      return response.data;
    } catch (error) {
      let errorMessage = 'Failed to update profile picture';
      if ((error as AxiosError).isAxiosError && (error as AxiosError).response) {
        errorMessage = `Profile picture update failed: ${(error as AxiosError).response?.data || 'Unknown error'}`;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

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
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<{ data: any }>) => {
        state.loading = false;
        state.data = action.payload.data;
        state.user = action.payload.data
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
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update profile';
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ... (keeping existing reducer cases)
      .addCase(changeProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeProfilePicture.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(changeProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectProfileUser = (state: RootState) => state.profile.user;

export default profileSlice.reducer;
