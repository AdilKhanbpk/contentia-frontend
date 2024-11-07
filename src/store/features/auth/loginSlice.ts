import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance'; // Import the axios instance you created

interface LoginData {
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
  async (loginData: LoginData) => {
    const response = await axiosInstance.post('/users/login', loginData);
    // Store the token
    localStorage.setItem('accessToken', response.data.data.accessToken);
    return response.data.token; // Assume the API returns the token on success
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
        state.token = action.payload; // Store the token in the state
        localStorage.setItem('your_token_key', action.payload); // Set token to localStorage here
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { resetLoginState } = loginSlice.actions;

export default loginSlice.reducer;
