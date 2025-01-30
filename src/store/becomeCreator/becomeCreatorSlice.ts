import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../axiosInstance';

interface CreatorFormState {
  creatorFormData: object;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const becomeCreatorThunk = createAsyncThunk(
  'becomeCreator/becomeCreatorThunk',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const creatorFormData = state.becomeCreator.creatorFormData;
      console.log("🚀 ~ creatorFormData:", creatorFormData)
      const response = await axiosInstance.post('/creators/create', creatorFormData);
      return response.data;
    } catch (error: any) {
      console.error('Error in becomeCreatorThunk:', error);
      if (error.response && error.response.data) {
        console.error('API Error Response:', error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        console.error('Error Message:', error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState: CreatorFormState = {
  creatorFormData: {},
  status: 'idle',
  error: null,
}

const creatorFormSlice = createSlice({
  name: 'creatorForm',
  initialState,
  reducers: {
    setCreatorFormData: (state, action) => {
      state.creatorFormData = { ...state.creatorFormData, ...action.payload }
    },
    resetCreatorFormData: (state) => {
      state.creatorFormData = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(becomeCreatorThunk.pending, (state) => {
        console.log('Thunk Status: Pending');
        state.status = 'loading';
        state.error = null;
      })
      .addCase(becomeCreatorThunk.fulfilled, (state, action) => {
        console.log('Thunk Status: Fulfilled', action.payload);
        state.status = 'succeeded';
      })
      .addCase(becomeCreatorThunk.rejected, (state, action) => {
        console.log('Thunk Status: Rejected', action.payload);
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {
  setCreatorFormData
} = creatorFormSlice.actions;

export default creatorFormSlice.reducer;