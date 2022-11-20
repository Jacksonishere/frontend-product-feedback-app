import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loaded: false,
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setLoaded: (state) => {
      state.loaded = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export default UserSlice.reducer;

export const { setLoaded, setUser, resetUser } = UserSlice.actions;
export const currentUserSelector = (state) => state.user.user;
export const loadedSelector = (state) => state.user.loaded;
