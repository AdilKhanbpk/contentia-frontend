import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Use localStorage
import { persistReducer, persistStore } from "redux-persist";
import becomeCreatorReducer from "./becomeCreator/becomeCreatorSlice";
import signupReducer from "./features/auth/signupSlice";
import loginReducer from "./features/auth/loginSlice";
import forgotPasswordReducer from "./features/auth/ForgotPasswordSlice";
import resetPasswordReducer from "./features/auth/ResetPasswordToBAckend";
import profileReducer from "./features/profile/profileSlice";
import brandReducer from "./features/profile/brandSlice";
import orderReducer from "./features/profile/orderSlice";
import adminCustomersReducer from "./features/admin/customersSlice";
import adminCreatorsReducer from "./features/admin/creatorsSlice";
import lanPageSlice from "./features/admin/lanPageSlice";
import faqReducer from "./features/admin/faqSlice";
import bannerSlice from "./features/admin/bannerSlice";
import howWorkSlice from "./features/admin/howWorkSlice";
import aboutSlice from "./features/admin/aboutSlice";
import helpSlice from "./features/admin/helpSlice";
import blogSlice from "./features/admin/blogSlice"; 
import couponSlice from "./features/admin/couponSlice";
import ordersSlice from "./features/admin/ordersSlice";
import pricingSlice from "./features/admin/pricingSlice";
import addPriceSlice from "./features/admin/addPriceSlice";
import claimSlice from "./features/admin/claimSlice";
import notificationSlice from "./features/admin/notificationSlice";
import emailNotificationSlice from "./features/admin/emailNotificationSlice";
import socketSlice from "./socket/socketSlice";
import packageSlice from "./features/admin/packageSlice";
import customPackageSlice from "./features/admin/customPackageSlice";
import dashboardReducer from "./features/admin/dashboardSlice";
import incomingPaymentSlice from "./features/admin/incomingPaymentSlice";
import termSlice from "./features/admin/termsSlice";
import helpSupportSlice from "./features/admin/helpSlice";
import fileSlice from "./features/admin/fileSlice";
import googleAnalyticsSlice from "./features/admin/googleAnalyticsSlice";

// 🔹 Configure redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"], // Persist only login state
};
// const createNoopStorage = () => {
//   return {
//     getItem() {
//       return Promise.resolve(null);
//     },
//     setItem() {
//       return Promise.resolve();
//     },
//     removeItem() {
//       return Promise.resolve();
//     }
//   };
// };

// 🔹 Combine reducers
const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  becomeCreator: becomeCreatorReducer,
  signup: signupReducer,
  login: loginReducer, // Persist this reducer
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
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
  customPackages: customPackageSlice,
  emailNotification: emailNotificationSlice,
  incomingPayment: incomingPaymentSlice,
  terms: termSlice,
  helpSupport: helpSupportSlice,
  files: fileSlice,
  gAnalytics: googleAnalyticsSlice,
});

// 🔹 Apply persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),

});

// 🔹 Persistor
export const persistor = persistStore(store);

// 🔹 Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
