import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { RootState } from '@/store/store';

// Define the state interface
interface ResetPasswordState {
  loading: boolean;
  success: boolean;
  message: string | null;
  error: string | null;
}

// Initial state
const initialState: ResetPasswordState = {
  loading: false,
  success: false,
  message: null,
  error: null,
};

// Define the reset password payload interface
interface ResetPasswordPayload {
  token: string;
  password: string;
}

// In your resetPassword thunk action
export const resetPassword = createAsyncThunk<
  string,
  ResetPasswordPayload,
  {
    rejectValue: string;
  }
>(
  'auth/resetPassword',
  async ({ token, password }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/users/reset-password/${token}`, { password });
      return res.data.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
    }
  }
);

// Create the slice
const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    resetResetPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.message = null;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = null;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { resetResetPasswordState } = resetPasswordSlice.actions;

// Export selectors
export const selectResetPasswordState = (state: RootState) => state.resetPassword;

// Export reducer
export default resetPasswordSlice.reducer;