import { configureStore } from '@reduxjs/toolkit';
import becomeCreatorReducer from './becomeCreator/becomeCreatorSlice';
import signupReducer from './features/auth/signupSlice'; // Import signup reducer
import loginReducer from './features/auth/loginSlice'; // Assuming this is the path to your slice
import profileReducer from './features/profile/profileSlice';
import adminCustomersReducer from './features/admin/customersSlice'
import adminCreatorsReducer from './features/admin/creatorsSlice'
import lanPageSlice from './features/admin/lanPageSlice'
import faqReducer from './features/admin/faqSlice'; // Import the faqSlice
import bannerSlice from './features/admin/bannerSlice';
import howWorkSlice from './features/admin/howWorkSlice';
import aboutSlice from './features/admin/aboutSlice';
import helpSlice from './features/admin/helpSlice';
import blogSlice from './features/admin/blogSlice';
import couponSlice from './features/admin/couponSlice';
import ordersSlice from './features/admin/ordersSlice';


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
    banner: bannerSlice,
    howWork: howWorkSlice,
    about: aboutSlice,
    help: helpSlice,
    blog: blogSlice,
    coupon: couponSlice,
    orders: ordersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
