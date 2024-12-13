import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';

interface UserData {
  email: string;
  password: string;
  rememberMe: boolean;
  termsAndConditionsApproved: boolean;
}

// Define the async thunk
export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async (userData: UserData) => {
    const response = await axiosInstance.post('/users/signup', userData); 
    return response.data;
  }
);

interface SignupState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    loading: false,
    success: false,
    error: null,
  } as SignupState,
  reducers: {
    resetSignupState(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Signup failed';
      });
  },
});

export const { resetSignupState } = signupSlice.actions;
export default signupSlice.reducer;
