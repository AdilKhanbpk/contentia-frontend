import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';

interface LogoutState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: LogoutState = {
  loading: false,
  success: false,
  error: null,
};

export const logoutUser = createAsyncThunk(
  'logout/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
      await axiosInstance.get('/users/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('accessToken');
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    resetLogoutState(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetLogoutState } = logoutSlice.actions;

export default logoutSlice.reducer;
