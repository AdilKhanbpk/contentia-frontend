import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CreatorFormState {
  profileInformation: object;
  paymentInformation: object;
  contentCreatorPreferences: object;
  socialMediaInformation: object;
  fullObject: object;
}

const initialState: CreatorFormState = {
  profileInformation: {},
  paymentInformation: {},
  contentCreatorPreferences: {},
  socialMediaInformation: {},
  fullObject: {},
};

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
});

export const {
  setProfileInformation,
  setPaymentInformation,
  setContentCreatorPreferences,
  setSocialMediaInformation,
  setFullObject,
} = creatorFormSlice.actions;

export default creatorFormSlice.reducer;
