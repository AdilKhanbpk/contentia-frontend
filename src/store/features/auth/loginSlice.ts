import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";

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
  "login/loginUser",
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/login", loginData);
      const user = response.data.data.userWithoutPassword;
      const token = response.data.data.accessToken;

      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);


// Async thunk to handle signup
export const signupUser = createAsyncThunk(
  "login/signupUser",
  async (signupData: SignupData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/signup", signupData);
      const user = response.data.data.userWithoutPassword;
      const token = response.data.data.accessToken;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", token);

      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

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
      localStorage.removeItem('user');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLoginState(state) {
      state.success = false;
      state.error = null;
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: any; token: string }>) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
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
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<{ user: any; token: string }>) => {
          state.loading = false;
          state.success = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.token = null;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});


export const { resetLoginState } = loginSlice.actions;

// Corrected selector to get the user instead of token
export const selectUser = (state: any) => state.login.user;

export default loginSlice.reducer;
