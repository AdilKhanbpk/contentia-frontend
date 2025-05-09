import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { RootState } from '@/store/store';

// Define the state interface
interface ForgotPasswordState {
  loading: boolean;
  success: boolean;
  message: string | null;
  error: string | null;
}

// Initial state
const initialState: ForgotPasswordState = {
  loading: false,
  success: false,
  message: null,
  error: null,
};

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk<
  string,           // ✅ Return type (e.g. server response message)
  string,           // ✅ Argument type (email)
  {
    rejectValue: string; // ✅ Error message type
  }
>(
  'auth/forgotPassword',
  async (email, thunkAPI) => {
    try {
      const res = await axiosInstance.post('/users/forgot-password', { email });
      return res.data.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
    }
  }
);

// Create the slice
const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    resetForgotPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.message = null;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = null;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { resetForgotPasswordState } = forgotPasswordSlice.actions;

// Export selectors
export const selectForgotPasswordState = (state: RootState) => state.forgotPassword;

// Export reducer
export default forgotPasswordSlice.reducer;
