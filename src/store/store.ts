import { configureStore } from '@reduxjs/toolkit';
import becomeCreatorReducer from './becomeCreator/becomeCreatorSlice';
import signupReducer from './features/auth/signupSlice';
import loginReducer from './features/auth/loginSlice';
import profileReducer from './features/profile/profileSlice';
import adminCustomersReducer from './features/admin/customersSlice'
import adminCreatorsReducer from './features/admin/creatorsSlice'
import lanPageSlice from './features/admin/lanPageSlice'
import faqReducer from './features/admin/faqSlice';
import bannerSlice from './features/admin/bannerSlice';
import howWorkSlice from './features/admin/howWorkSlice';
import aboutSlice from './features/admin/aboutSlice';
import helpSlice from './features/admin/helpSlice';
import blogSlice from './features/admin/blogSlice';
import couponSlice from './features/admin/couponSlice';
import ordersSlice from './features/admin/ordersSlice';
import pricingSlice from './features/admin/pricingSlice';
import addPriceSlice from './features/admin/addPriceSlice';
import claimSlice from './features/admin/claimSlice';
import socketSlice from './socket/socketSlice';

const store = configureStore({
  reducer: {
    becomeCreator: becomeCreatorReducer,
    signup: signupReducer,
    login: loginReducer,
    profile: profileReducer,
    adminCustomers: adminCustomersReducer,
    adminCreators: adminCreatorsReducer,
    landingPage: lanPageSlice,
    faq: faqReducer,
    banner: bannerSlice,
    howWork: howWorkSlice,
    about: aboutSlice,
    help: helpSlice,
    blog: blogSlice,
    coupon: couponSlice,
    orders: ordersSlice,
    pricing: pricingSlice,
    addPrice: addPriceSlice,
    claim: claimSlice,
    socket: socketSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
