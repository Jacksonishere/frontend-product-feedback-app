import { configureStore } from "@reduxjs/toolkit";
import authApi from "../api/userApiSlice";
import feedbackApi from "../api/feedbackApiSlice";
import UserSlice from "./users/UserSlice";
import FlashSlice from "./modals/FlashSlice";
import HomeFeedConfigSlice from "./feedbacks/HomeFeedConfigSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    user: UserSlice,
    flash: FlashSlice,
    homeFeed: HomeFeedConfigSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, feedbackApi.middleware),
});

export default store;
