import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';

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
  user: any;
  loading: boolean;
  success: boolean;
  error: string | null;
  token: string | null;
}

const initialState: LoginState = {
  user: null,
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
      const user = response.data.data.userWithoutPassword;
      console.log("🚀 ~ user:", user)

      const token = response.data.data.accessToken;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', token);
      return token;
    } catch (error: any) {
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
      const token = response.data.data.accessToken;
      localStorage.setItem('accessToken', token);
      return token;
    } catch (error: any) {
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      });
  },
});

export const { resetLoginState } = loginSlice.actions;

export const selectUser = (state: any) => state.login.token

export default loginSlice.reducer;
