import { configureStore } from "@reduxjs/toolkit";
import authApi from "../api/userApiSlice";
import feedbackApi from "../api/feedbackApiSlice";
import userSlice from "./users/userSlice";
import flashSlice from "./modals/flashSlice";
import homeFeedConfigSlice from "./feedbacks/homeFeedConfigSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    user: userSlice,
    flash: flashSlice,
    homeFeed: homeFeedConfigSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, feedbackApi.middleware),
});

export default store;
