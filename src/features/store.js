import { configureStore } from "@reduxjs/toolkit";
import authApi from "../api/userApiSlice";
import feedbackApi from "../api/feedbackApiSlice";
import userSlice from "./users/userSlice";
import flashSlice from "./modals/flashSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    userSlice: userSlice,
    flash: flashSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, feedbackApi.middleware),
});

export default store;
