import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loaded: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLoaded: (state) => {
      state.loaded = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState;
    },
  },
});

export default userSlice.reducer;

export const { setLoaded, setUser, resetUser } = userSlice.actions;
export const currentUserSelector = (state) => state.userSlice.user;
export const loadedSelector = (state) => state.userSlice.loaded;
