import { configureStore } from '@reduxjs/toolkit';
import becomeCreatorReducer from './becomeCreator/becomeCreatorSlice';
import signupReducer from './features/auth/signupSlice'; // Import signup reducer
import loginReducer from './features/auth/loginSlice'; // Assuming this is the path to your slice
import profileReducer from './features/profile/profileSlice';
import adminCustomersReducer from './features/admin/customersSlice'
import adminCreatorsReducer from './features/admin/creatorsSlice'
import lanPageSlice from './features/admin/lanPageSlice'
import faqReducer from './features/admin/faqSlice'; // Import the faqSlice


const store = configureStore({
  reducer: {
    becomeCreator: becomeCreatorReducer,
    signup: signupReducer, // Add signup reducer here
    login: loginReducer,
    profile: profileReducer,
    adminCustomers: adminCustomersReducer,
    adminCreators: adminCreatorsReducer,
    landingPage: lanPageSlice, // Add landing page reducer
    faq: faqReducer, // Add the FAQ reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
