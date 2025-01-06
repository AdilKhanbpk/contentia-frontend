import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

type ProfileState = {
    data: any;
    loading: boolean;
    error: string | null;
};

const initialState: ProfileState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (token: string) => {
        try {
            const response = await axiosInstance.get('/users/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
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
      { data, token, }: { data: any; token: string; },
      { rejectWithValue }
    ) => {
      try {
        const response = await axiosInstance.patch(`/users/update-me`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    { currentPassword, newPassword, confirmNewPassword, token }: { currentPassword: string; newPassword: string; confirmNewPassword: string, token: string },
    { rejectWithValue }
  ) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axiosInstance.patch(
        '/users/change-password',
        { currentPassword, newPassword, confirmNewPassword },
        { headers }
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
      { file, token }: { file: File; token: string },
      { rejectWithValue }
  ) => {
      try {
          const formData = new FormData();
          formData.append('profilePic', file);

          const response = await axiosInstance.patch('/users/change-profilePic', formData, {
              headers: { 
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data'
              },
          });
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
                console.log(action.payload.data)
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

export default profileSlice.reducer;
