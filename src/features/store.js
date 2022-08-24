import { configureStore } from "@reduxjs/toolkit";
import AuthApi from "../api/userAuth";
import userSlice from "./Users/userSlice";

const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
});

export default store;
