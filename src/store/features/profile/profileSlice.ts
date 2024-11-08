// src/store/profileSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

type ProfileState = {
    data: any;
    id: string | null;
    loading: boolean;
    error: string | null;
};

const initialState: ProfileState = {
    data: null,
    id: null,
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
                id: response.data.data._id,
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
      { data, token, id }: { data: any; token: string; id: string },
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
      { oldPassword, newPassword, token }: { oldPassword: string; newPassword: string; token: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await axiosInstance.post('/users/change-password', {
          oldPassword,
          newPassword,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        let errorMessage = 'Failed to change password';
        if ((error as AxiosError).isAxiosError && (error as AxiosError).response) {
          errorMessage = `Password change failed: ${(error as AxiosError).response?.data || 'Unknown error'}`;
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
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<{ id: string; data: any }>) => {
                state.loading = false;
                state.data = action.payload.data;
                state.id = action.payload.id;
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
            });
    },
});

export default profileSlice.reducer;
