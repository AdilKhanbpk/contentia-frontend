import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance'; // Import the axios instance you created

// Define the type for the user data expected in the thunk
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
    // Use axiosInstance instead of default axios
    const response = await axiosInstance.post('/users/signup', userData); 
    return response.data;
  }
);

// Define the type for the slice state
interface SignupState {
  loading: boolean;
  success: boolean;
  error: string | null; // Allow error to be either a string or null
}

// Define your slice
const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    loading: false,
    success: false,
    error: null, // Initialize error as null
  } as SignupState, // Type the initial state to match the SignupState interface
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
        // Ensure state.error can be a string or null
        state.error = action.error.message || 'Signup failed';
      });
  },
});

export const { resetSignupState } = signupSlice.actions;
export default signupSlice.reducer;
