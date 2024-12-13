import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../axiosInstance';

interface CreatorFormState {
  profileInformation: object;
  paymentInformation: object;
  creatorInformation: object;
  fullObject: object;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const becomeCreatorThunk = createAsyncThunk(
  'becomeCreator/becomeCreatorThunk',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const fullObject = state.becomeCreator.fullObject;
      const accessToken = state.auth.accessToken;
      const response = await axiosInstance.post('/become-creator/create', fullObject);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState: CreatorFormState = {
  profileInformation: {},
  paymentInformation: {},
  creatorInformation: {},
  fullObject: {},
  status: 'idle',
  error: null,
}

const creatorFormSlice = createSlice({
  name: 'creatorForm',
  initialState,
  reducers: {
    setProfileInformation: (state, action: PayloadAction<object>) => {
      state.profileInformation = action.payload;
      state.fullObject = { ...state.fullObject, ...action.payload };
    },
    setPaymentInformation: (state, action: PayloadAction<object>) => {
      state.paymentInformation = action.payload;
      state.fullObject = { ...state.fullObject, ...action.payload };
    },
    setCreatorInformation: (state, action: PayloadAction<object>) => {
      state.creatorInformation = action.payload;
      state.fullObject = { ...state.fullObject, ...action.payload };
    },
    setFullObject: (state) => {
      state.fullObject = {
        ...state.profileInformation,
        ...state.paymentInformation,
        ...state.creatorInformation,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(becomeCreatorThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(becomeCreatorThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(becomeCreatorThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {
  setProfileInformation,
  setPaymentInformation,
  setCreatorInformation,
  setFullObject,
} = creatorFormSlice.actions;

export default creatorFormSlice.reducer;
