import { configureStore } from "@reduxjs/toolkit";
import authApi from "../api/userAuth";
import userSlice from "./users/userSlice";
import flashSlice from "./modals/flashSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    userSlice: userSlice,
    flash: flashSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
