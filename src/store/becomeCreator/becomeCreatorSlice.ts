import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CreatorFormState {
  profileInformation: object;
  paymentInformation: object;
  contentCreatorPreferences: object;
  socialMediaInformation: object;
  fullObject: object;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const becomeCreatorThunk = createAsyncThunk(
  'becomeCreator/becomeCreatorThunk',
  async (data: any, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const fullObject = state.becomeCreator.fullObject;
      console.log("FullObject: ", fullObject);

      const response = await fetch('http://localhost:3001/api/v1/become-creator/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(fullObject),
      });
      console.log(response)

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: CreatorFormState = {
  profileInformation: {},
  paymentInformation: {},
  contentCreatorPreferences: {},
  socialMediaInformation: {},
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
    setContentCreatorPreferences: (state, action: PayloadAction<object>) => {
      state.contentCreatorPreferences = action.payload;
      state.fullObject = { ...state.fullObject, ...action.payload };
    },
    setSocialMediaInformation: (state, action: PayloadAction<object>) => {
      state.socialMediaInformation = action.payload;
      state.fullObject = { ...state.fullObject, ...action.payload };
    },
    setFullObject: (state) => {
      state.fullObject = {
        ...state.profileInformation,
        ...state.paymentInformation,
        ...state.contentCreatorPreferences,
        ...state.socialMediaInformation,
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
  setContentCreatorPreferences,
  setSocialMediaInformation,
  setFullObject,
} = creatorFormSlice.actions;

export default creatorFormSlice.reducer;
