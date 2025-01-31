import { configureStore } from '@reduxjs/toolkit';
import becomeCreatorReducer from './becomeCreator/becomeCreatorSlice';
import signupReducer from './features/auth/signupSlice';
import loginReducer from './features/auth/loginSlice';
import logoutReducer from './features/auth/logoutSlice';
import profileReducer from './features/profile/profileSlice';
import brandReducer from './features/profile/brandSlice';
import orderReducer from './features/profile/orderSlice';
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
import notificationSlice from './features/admin/notificationSlice';
import socketSlice from './socket/socketSlice';
import packageSlice from './features/admin/packageSlice';
import dashboardReducer from './features/admin/dashboardSlice';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    becomeCreator: becomeCreatorReducer,
    signup: signupReducer,
    login: loginReducer,
    logout: logoutReducer,
    profile: profileReducer,
    brand: brandReducer,
    order: orderReducer,
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
    notification: notificationSlice,
    socket: socketSlice,
    package: packageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
