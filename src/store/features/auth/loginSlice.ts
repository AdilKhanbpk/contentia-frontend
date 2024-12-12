import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance'; // Import the axios instance you created

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignupData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginState {
  loading: boolean;
  success: boolean;
  error: string | null;
  token: string | null;
}

const initialState: LoginState = {
  loading: false,
  success: false,
  error: null,
  token: null,
};

// Async thunk to handle login
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/login', loginData);
      const token = response.data.data.accessToken; // Adjust this according to your API's response structure
      localStorage.setItem('accessToken', token); // Store token under a consistent key
      return token; // Return the token to the fulfilled action
    } catch (error: any) {
      // If the login fails, use rejectWithValue to pass the error message
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk to handle signup
export const signupUser = createAsyncThunk(
  'login/signupUser',
  async (signupData: SignupData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/signup', signupData);
      const token = response.data.data.accessToken; // Adjust this according to your API's response structure
      localStorage.setItem('accessToken', token); // Store token under a consistent key
      return token; // Return the token to the fulfilled action
    } catch (error: any) {
      // If the signup fails, use rejectWithValue to pass the error message
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetLoginState(state) {
      state.success = false;
      state.error = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string; // Access the error message from rejectedWithValue
      })
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string; // Access the error message from rejectedWithValue
      });
  },
});

export const { resetLoginState } = loginSlice.actions;

export default loginSlice.reducer;
