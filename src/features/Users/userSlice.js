import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    resetUser: () => initialState,
  },
});

export default userSlice.reducer;

export const { setUser, resetUser } = userSlice.actions;
export const currentUserSelector = (state) => state.userSlice.user;
